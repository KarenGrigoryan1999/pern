import { LOADING_STATUS } from '../../constants';
import { NOTES_LOADING_STATUS, SET_ALL_NOTES, SET_PAGE_NUMBER } from '../../types/notes';
import { defaultState } from './initialState';
import { INoteWithId } from './types';

export default function notesReducer(state = defaultState, action: NotesAction) {
    switch (action.type) {
      case SET_ALL_NOTES:
        return {
            ...state,
            notes: action.payload[0],
            count: action.payload[1],
        };
      case NOTES_LOADING_STATUS:
        return {
          ...state,
          loadingStatus: action.payload,
        };
      case SET_PAGE_NUMBER:
        return {
          ...state,
          page: action.payload,
        };
      default:
        return state;
    }
  }

interface ISetAllStatusAction {
    type: typeof SET_ALL_NOTES;
    payload: INoteWithId[]
}

interface INotesLoadingStatusAction {
  type: typeof NOTES_LOADING_STATUS;
  payload: LOADING_STATUS
}

interface ISetPageNumberAction {
  type: typeof SET_PAGE_NUMBER;
  payload: number
}

type NotesAction = ISetAllStatusAction | INotesLoadingStatusAction | ISetPageNumberAction;
