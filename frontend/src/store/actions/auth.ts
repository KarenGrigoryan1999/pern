import { LOADING_STATUS } from '../constants';
import { AUTH_LOADING_STATUS } from '../types/auth';

export const setAuthStatus = (payload: LOADING_STATUS): {
    type: typeof AUTH_LOADING_STATUS,
    payload: LOADING_STATUS,
} => ({
    type: AUTH_LOADING_STATUS,
    payload,
});
