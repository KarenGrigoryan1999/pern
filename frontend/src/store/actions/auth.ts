import { LOADING_STATUS } from '../types';
import { AUTH_LOADING_STATUS } from '../constants';

export const setAuthStatus = (
  payload: LOADING_STATUS,
): {
  type: typeof AUTH_LOADING_STATUS;
  payload: LOADING_STATUS;
} => ({
  type: AUTH_LOADING_STATUS,
  payload,
});
