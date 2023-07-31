import { LOADING_STATUS } from "../../constants"
import { notes_LOADING_STATUS, SET_ALL_notes, SET_PAGE_NUMBER } from "../../types/notes"
import { defaultState } from "./initialState"
import { IRequestNote } from "./types"

export function notesReducer(state = defaultState, action: notesAction) {
    switch (action.type) {
      case SET_ALL_notes:
        return {
            ...state,
            notes: action.payload[0],
            count: action.payload[1],
        }
      case notes_LOADING_STATUS:
        return {
          ...state,
          loadingStatus: action.payload,
        }
      case SET_PAGE_NUMBER:
        return {
          ...state,
          page: action.payload,
        }
      default:
        return state
    }
  }

interface setAllStatusAction {
    type: typeof SET_ALL_notes;
    payload: IRequestNote[]
}

interface notesLoadingStatusAction {
  type: typeof notes_LOADING_STATUS;
  payload: LOADING_STATUS
}

interface setPageNumberAction {
  type: typeof SET_PAGE_NUMBER;
  payload: number
}

type notesAction = setAllStatusAction | notesLoadingStatusAction | setPageNumberAction;