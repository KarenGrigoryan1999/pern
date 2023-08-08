import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import api from '../../api';
import { setAuthStatus } from '../actions/auth';
import { LOADING_STATUS } from '../constants';
import { IAuth } from '../reducers/auth/types';
import { IState } from '../store';

export const userAuth = (authData: IAuth) => async (dispatch: ThunkDispatch<IState, void, Action>) => {
    try {
        dispatch(setAuthStatus(LOADING_STATUS.LOADING));
        const authUser = await api.post('auth/login', authData);
        localStorage.setItem('token', authUser.data.token);
        dispatch(setAuthStatus(LOADING_STATUS.SUCCESS));
    } catch(e) {
        dispatch(setAuthStatus(LOADING_STATUS.ERROR));
    }
};

export const whoAmI = () => async (dispatch: ThunkDispatch<IState, void, Action>) => {
    try {
        dispatch(setAuthStatus(LOADING_STATUS.LOADING));
        const authUser = await api.get('auth/whoami');
        localStorage.setItem('token', authUser.data.token);
        dispatch(setAuthStatus(LOADING_STATUS.SUCCESS));
    } catch(e) {
        dispatch(setAuthStatus(LOADING_STATUS.FAIL));
    }
};
