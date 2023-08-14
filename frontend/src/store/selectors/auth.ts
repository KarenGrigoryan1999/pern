import { IState } from '../store';

export const authSelector = (state: IState) => state.authReducer;

export const authLoadingStatus = (state: IState) =>
  state.authReducer.loadingStatus;
