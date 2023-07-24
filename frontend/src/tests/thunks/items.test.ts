import thunk, { ThunkDispatch } from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { getPaginatedItems } from '../../store/thunks/items';
import { mockLocalStorage } from '../../mocks/localStorage';

interface AppState {}

const middlewares = [thunk];
const mockStore = configureMockStore<AppState, ThunkDispatch<AppState, any, any>>(middlewares);

describe('Загрузка заметок с сервера', () => {
    beforeAll(() => {        
        global.localStorage = mockLocalStorage;
    })
    test('Получение записи с первой страницы', async() => {
        const store = mockStore({});

        await store.dispatch(getPaginatedItems(1, 10));
        const actions = store.getActions();

        expect(actions[0]).toEqual({type: "ITEMS_LOADING_STATUS", payload: "loading"});
        expect((actions[1]).type).toBe("SET_ALL_ITEMS");
        expect(actions[2]).toEqual({type: "ITEMS_LOADING_STATUS", payload: "success"});
    });
});