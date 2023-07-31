import api from "../../api";
import { saveNotes, setnotesStatus } from "../actions/notes";
import { LOADING_STATUS } from "../constants";
import { INote } from "../reducers/notes/types";

export const getPaginatedNotes = (page: number, limit: number) => async (dispatch) => {
    dispatch(setnotesStatus(LOADING_STATUS.LOADING));
    const notes = await api.get(`note/list?page=${page}&limit=${limit}`);
    dispatch(saveNotes(notes.data));
    dispatch(setnotesStatus(LOADING_STATUS.SUCCESS));
}

export const createNote = (note: INote) => async (dispatch, getState) => {
    try {
        dispatch(setnotesStatus(LOADING_STATUS.LOADING));
        await api.post('note', note);
        const { page, limit } = getState().notesReducer;
        dispatch(getPaginatedNotes(page, limit));
        dispatch(setnotesStatus(LOADING_STATUS.SUCCESS));
    } catch(e) {
        console.log('error');
        dispatch(setnotesStatus(LOADING_STATUS.ERROR));
    }
}

export const removeNote = (noteId: number) => async (dispatch, getState) => {
    try{
        dispatch(setnotesStatus(LOADING_STATUS.LOADING));
        await api.delete(`note/${noteId}`);
        const { page, limit } = getState().notesReducer;
        dispatch(getPaginatedNotes(page, limit));
        dispatch(setnotesStatus(LOADING_STATUS.SUCCESS));
    } catch(e) {
        console.log('error');
        dispatch(setnotesStatus(LOADING_STATUS.ERROR));
    }
}