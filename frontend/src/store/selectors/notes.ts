import { IState } from '../store';

export const notesCountSelector = (state: IState) => state.notesReducer.count;

export const notesLimitSelector = (state: IState) => state.notesReducer.limit;

export const notesPagesSelector = (state: IState) => state.notesReducer.page;

export const notesSelector = (state: IState) => state.notesReducer.notes;

export const notesLoadingStatus = (state: IState) =>
  state.notesReducer.loadingStatus;
