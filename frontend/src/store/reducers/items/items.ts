import { LOADING_STATUS } from "../../constants"
import { ITEMS_LOADING_STATUS, SET_ALL_ITEMS, SET_PAGE_NUMBER } from "../../types/items"
import { defaultState } from "./initialState"
import { IRequestItem } from "./types"

export function itemsReducer(state = defaultState, action: ItemsAction) {
    switch (action.type) {
      case SET_ALL_ITEMS:
        return {
            ...state,
            items: action.payload[0],
            count: action.payload[1],
        }
      case ITEMS_LOADING_STATUS:
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
    type: typeof SET_ALL_ITEMS;
    payload: IRequestItem[]
}

interface itemsLoadingStatusAction {
  type: typeof ITEMS_LOADING_STATUS;
  payload: LOADING_STATUS
}

interface setPageNumberAction {
  type: typeof SET_PAGE_NUMBER;
  payload: number
}

type ItemsAction = setAllStatusAction | itemsLoadingStatusAction | setPageNumberAction;