import thunk, { ThunkDispatch } from 'redux-thunk';
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import { userAuth } from '../../store/thunks/auth';
import { mockLocalStorage } from '../../mocks/localStorage';
import { IAuth } from '../../store/reducers/auth/types';
import api from '../../api';

interface AppState { }

describe('Авторизация пользователя', () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore<AppState, ThunkDispatch<AppState, any, any>>(middlewares);
    let testUser: IAuth;
    let succesfullyAns;
    let rejectAns;
    let store: MockStoreEnhanced<AppState, ThunkDispatch<AppState, any, any>>;
    beforeAll(() => {
        store = mockStore({});
        testUser = {
            email: 'random@mail.ru',
            password: '11111111'
        };
        succesfullyAns = {
            email: 'random@mail.ru',
            password: '11111111',
            token: 'user-token',
        };
        rejectAns = { status: 401 };
        global.localStorage = mockLocalStorage;
    })
    test('Удачный вход пользователя', async () => {
        jest.spyOn(api, 'post').mockResolvedValue({ data: [succesfullyAns] });
        await store.dispatch(userAuth(testUser));
        const actions = store.getActions();

        expect(actions[0]).toEqual({ type: "AUTH_LOADING_STATUS", payload: "loading" });
        expect(actions[1]).toEqual({ type: "AUTH_LOADING_STATUS", payload: "success" });
    });
    test('Неудачный вход пользователя', async () => {
        jest.spyOn(api, 'post').mockRejectedValue(rejectAns);
        await store.dispatch(userAuth(testUser));
        const actions = store.getActions();

        expect(actions[0]).toEqual({ type: "AUTH_LOADING_STATUS", payload: "loading" });
        expect(actions[1]).toEqual({ type: "AUTH_LOADING_STATUS", payload: "error" });
    });
});