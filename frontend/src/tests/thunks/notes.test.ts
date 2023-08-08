import thunk, { ThunkDispatch } from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { getPaginatedNotes } from '../../store/thunks/notes';
import { mockLocalStorage } from '../../mocks/localStorage';
import api from '../../api';
import { NOTE_PRIORITY } from '../../components/CreateNoteForm/types';
import { IState } from '../../store/store';

describe('Тестирование Thunk для запросов на получение заметок пользователя', () => {
    const middlewares = [thunk];

    const mockStore = configureMockStore<IState, ThunkDispatch<IState, any, any>>(middlewares);
    let succesfullyAns;
    let rejectAns;
    let store;
    beforeAll(() => {
        store = mockStore({});
        succesfullyAns = [
            {
                title: 'test note',
                text: 'some text',
                priority: NOTE_PRIORITY.LOW,
            },
            1
        ];
        rejectAns = {
            message: 'Notes were not dound',
        };
        global.localStorage = mockLocalStorage;
    });
    test('Получение первых десяти заметок должно вернуть массив из 10 заметок и количество заметок в БД всего', async () => {
        jest.spyOn(api, 'post').mockResolvedValue({ data: [succesfullyAns] });

        await store.dispatch(getPaginatedNotes(1, 10));
        const actions = store.getActions();

        expect(actions[0]).toEqual({ type: 'NOTES_LOADING_STATUS', payload: 'loading' });
        expect((actions[1]).type).toBe('SET_ALL_NOTES');
        expect(actions[2]).toEqual({ type: 'NOTES_LOADING_STATUS', payload: 'success' });
    });    
    test('Неудачное получение записи с первой страницы должно вернуть ошибку', async () => {
        jest.spyOn(api, 'post').mockRejectedValue(rejectAns);

        await store.dispatch(getPaginatedNotes(1, 10));
        const actions = store.getActions();

        expect(actions[0]).toEqual({ type: 'NOTES_LOADING_STATUS', payload: 'loading' });
        expect((actions[1]).type).toBe('SET_ALL_NOTES');
        expect(actions[2]).toEqual({ type: 'NOTES_LOADING_STATUS', payload: 'error' });
    });
});
