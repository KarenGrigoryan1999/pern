import { defaultState } from './initialState';
import { AUTH_LOADING_STATUS } from '../../constants';

export default function authReducer(state = defaultState, action: AuthAction) {
  switch (action.type) {
    case AUTH_LOADING_STATUS:
      return {
        ...state,
        loadingStatus: action.payload,
      };
    default:
      return state;
  }
}

interface AuthLoadingStatus {
  type: typeof AUTH_LOADING_STATUS;
  payload: string;
}

type AuthAction = AuthLoadingStatus;
