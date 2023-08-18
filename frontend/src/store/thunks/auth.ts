import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';

import api from '../../utils/api';
import { IState } from '../../store';
import { setAuthStatus } from '../actions/auth';
import { LOADING_STATUS, IAuth } from '../types';

export const userAuth = (authData: IAuth): ThunkAction<void, IState, unknown, AnyAction> =>
  async (dispatch) => {
    try {
      dispatch(setAuthStatus(LOADING_STATUS.LOADING));
      const authUser = await api.post('auth/login', authData);
      localStorage.setItem('token', authUser.data.token);
      dispatch(setAuthStatus(LOADING_STATUS.SUCCESS));
    } catch (e) {
      dispatch(setAuthStatus(LOADING_STATUS.ERROR));
    }
  };

export const whoAmI = (): ThunkAction<void, IState, unknown, AnyAction> => async (dispatch) => {
    try {
      dispatch(setAuthStatus(LOADING_STATUS.LOADING));
      const authUser = await api.get('auth/whoami');
      localStorage.setItem('token', authUser.data.token);
      dispatch(setAuthStatus(LOADING_STATUS.SUCCESS));
    } catch (e) {
      dispatch(setAuthStatus(LOADING_STATUS.FAIL));
    }
  };
