import { ITEMS_LOADING_STATUS, SET_ALL_ITEMS, SET_PAGE_NUMBER } from "../../types/items"
import { defaultState } from "./initialState"

export function itemsReducer(state = defaultState, action: any) {
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