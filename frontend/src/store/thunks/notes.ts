import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import api from '../../api';
import { saveNotes, setnotesStatus } from '../actions/notes';
import { LOADING_STATUS } from '../constants';
import { INote } from '../reducers/notes/types';
import { IState } from '../store';

export const getPaginatedNotes = (page: number, limit: number) => async (dispatch: ThunkDispatch<IState, void, Action>) => {
    dispatch(setnotesStatus(LOADING_STATUS.LOADING));
    const notes = await api.get(`notes/list?page=${page}&limit=${limit}`);
    dispatch(saveNotes(notes.data));
    dispatch(setnotesStatus(LOADING_STATUS.SUCCESS));
};

export const createNote = (note: INote) => async (dispatch: ThunkDispatch<IState, void, Action>, getState: () => IState) => {
    try {
        dispatch(setnotesStatus(LOADING_STATUS.LOADING));
        await api.post('notes', note);
        const { page, limit } = getState().notesReducer;
        dispatch(getPaginatedNotes(page, limit));
        dispatch(setnotesStatus(LOADING_STATUS.SUCCESS));
    } catch(e) {
        dispatch(setnotesStatus(LOADING_STATUS.ERROR));
    }
};

export const removeNote = (noteId: number) => async (dispatch: ThunkDispatch<IState, void, Action>, getState: () => IState) => {
    try {
        dispatch(setnotesStatus(LOADING_STATUS.LOADING));
        await api.delete(`notes/${noteId}`);
        const { page, limit } = getState().notesReducer;
        dispatch(getPaginatedNotes(page, limit));
        dispatch(setnotesStatus(LOADING_STATUS.SUCCESS));
    } catch(e) {
        dispatch(setnotesStatus(LOADING_STATUS.ERROR));
    }
};
