import { LOADING_STATUS, INoteWithId } from '../../types';

export const defaultState = {
  notes: [],
  page: 1,
  limit: 10,
  count: 0,
  loadingStatus: LOADING_STATUS.LOADING,
};

export interface INotesState {
  notes: INoteWithId[];
  page: number;
  limit: number;
  count: number;
  loadingStatus: LOADING_STATUS;
}
