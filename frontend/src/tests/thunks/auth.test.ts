import thunk, { ThunkDispatch } from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { userAuth } from '../../store/thunks/auth';
import { mockLocalStorage } from '../../mocks/localStorage';
import { IAuth } from '../../store/reducers/auth/types';

interface AppState {}

const middlewares = [thunk];
const mockStore = configureMockStore<AppState, ThunkDispatch<AppState, any, any>>(middlewares);

describe('Авторизация пользователя', () => {
    let testUser: IAuth;
    beforeAll(() => {
        testUser = {
            email: 'random@mail.ru',
            password: '11111111'
        };        
        global.localStorage = mockLocalStorage;
    })
    test('Вход пользователя', async() => {
        const store = mockStore({});

        await store.dispatch(userAuth(testUser));
        const actions = store.getActions();

        expect(actions[0]).toEqual({type: "AUTH_LOADING_STATUS", payload: "loading"});
        expect(actions[1]).toEqual({type: "AUTH_LOADING_STATUS", payload: "error"});
    });
});