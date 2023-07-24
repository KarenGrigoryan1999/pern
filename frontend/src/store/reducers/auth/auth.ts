import { AUTH_LOADING_STATUS } from "../../types/auth"
import { defaultState } from "./initialState"

export function authReducer(state = defaultState, action: any) {
    switch (action.type) {
        case AUTH_LOADING_STATUS:
            return {
                ...state,
                loadingStatus: action.payload,
            }
        default:
            return state
    }
}