import thunk, { ThunkDispatch } from 'redux-thunk';
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import { userAuth } from '../../store/thunks/auth';
import { mockLocalStorage } from '../../mocks/localStorage';
import { IAuth } from '../../store/reducers/auth/types';
import api from '../../api';
import { IState } from '../../store/store';

describe('Тестирование thunk для отправки запросов на авторизацию пользователя', () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore<IState, ThunkDispatch<IState, any, any>>(middlewares);
    let testUser: IAuth;
    let succesfullyAns;
    let rejectAns;
    let store: MockStoreEnhanced<IState, ThunkDispatch<IState, any, any>>;

    beforeAll(() => {
        store = mockStore({});
        testUser = {
            email: 'random@mail.ru',
            password: '11111111',
        };
        succesfullyAns = {
            email: 'random@mail.ru',
            password: '11111111',
            token: 'user-token',
        };
        rejectAns = {
            status: 401,
            response: 'Unauthorized',
        };
        global.localStorage = mockLocalStorage;
    });
    test('Запрос с верными логином и паролем должен завершиться удачно', async () => {
        jest.spyOn(api, 'post').mockResolvedValue({ data: [succesfullyAns] });
        await store.dispatch(userAuth(testUser));
        const actions = store.getActions();

        expect(actions[0]).toEqual({ type: 'AUTH_LOADING_STATUS', payload: 'loading' });
        expect(actions[1]).toEqual({ type: 'AUTH_LOADING_STATUS', payload: 'success' });
    });
    test('Запрос с неверным логином или паролем должен завершиться с ошибкой', async () => {
        jest.spyOn(api, 'post').mockRejectedValue(rejectAns);
        await store.dispatch(userAuth(testUser));
        const actions = store.getActions();

        expect(actions[0]).toEqual({ type: 'AUTH_LOADING_STATUS', payload: 'loading' });
        expect(actions[1]).toEqual({ type: 'AUTH_LOADING_STATUS', payload: 'error' });
    });
});
