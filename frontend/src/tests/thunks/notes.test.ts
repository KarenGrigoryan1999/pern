import thunk, { ThunkDispatch } from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { getPaginatedNotes } from '../../store/thunks/notes';
import { mockLocalStorage } from '../../mocks/localStorage';
import api from '../../api';
import { ITEM_PRIORITY } from '../../components/CreateNoteForm/types';


describe('Запросы на получение заметок пользователя', () => {
    const middlewares = [thunk];

    interface AppState { }
    const mockStore = configureMockStore<AppState, ThunkDispatch<AppState, any, any>>(middlewares);
    let succesfullyAns;
    let rejectAns;

    beforeAll(() => {
        store = mockStore({});
        succesfullyAns =
            [{
                title: 'test note',
                text: 'some text',
                priority: ITEM_PRIORITY.LOW,
            }, 1];
        rejectAns = {
            message: 'Notes were not dound'
        }
        global.localStorage = mockLocalStorage;
    });

    test('Получение первых десяти заметок', async () => {
        jest.spyOn(api, 'post').mockResolvedValue({ data: [succesfullyAns] });

        await store.dispatch(getPaginatedNotes(1, 10));
        const actions = store.getActions();

        expect(actions[0]).toEqual({ type: "notes_LOADING_STATUS", payload: "loading" });
        expect((actions[1]).type).toBe("SET_ALL_notes");
        expect(actions[2]).toEqual({ type: "notes_LOADING_STATUS", payload: "success" });
    });
    
    test('Неудачное получение записи с первой страницы', async () => {
        jest.spyOn(api, 'post').mockRejectedValue(rejectAns);

        await store.dispatch(getPaginatedNotes(1, 10));
        const actions = store.getActions();

        expect(actions[0]).toEqual({ type: "notes_LOADING_STATUS", payload: "loading" });
        expect((actions[1]).type).toBe("SET_ALL_notes");
        expect(actions[2]).toEqual({ type: "notes_LOADING_STATUS", payload: "error" });
    });
});