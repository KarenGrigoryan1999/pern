import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';

import api from '../../utils/api';
import { IState } from '..';
import { saveNotes, setNotesStatus } from '../actions/notes';
import { INote, LOADING_STATUS } from '../types';

export const getPaginatedNotes = (
    page: number,
    limit: number,
  ): ThunkAction<void, IState, unknown, AnyAction> =>
  async (dispatch) => {
    dispatch(setNotesStatus(LOADING_STATUS.LOADING));
    const notes = await api.get(`notes/list?page=${page}&limit=${limit}`);
    dispatch(saveNotes(notes.data));
    dispatch(setNotesStatus(LOADING_STATUS.SUCCESS));
  };

export const createNote = (note: INote): ThunkAction<void, IState, unknown, AnyAction> =>
  async (dispatch, getState) => {
    try {
      dispatch(setNotesStatus(LOADING_STATUS.LOADING));
      await api.post('notes', note);
      const { page, limit } = getState().notesReducer;
      dispatch(getPaginatedNotes(page, limit));
      dispatch(setNotesStatus(LOADING_STATUS.SUCCESS));
    } catch (e) {
      dispatch(setNotesStatus(LOADING_STATUS.ERROR));
    }
  };

export const removeNote = (noteId: number): ThunkAction<void, IState, unknown, AnyAction> =>
  async (dispatch, getState) => {
    try {
      dispatch(setNotesStatus(LOADING_STATUS.LOADING));
      await api.delete(`notes/${noteId}`);
      const { page, limit } = getState().notesReducer;
      dispatch(getPaginatedNotes(page, limit));
      dispatch(setNotesStatus(LOADING_STATUS.SUCCESS));
    } catch (e) {
      dispatch(setNotesStatus(LOADING_STATUS.ERROR));
    }
  };
