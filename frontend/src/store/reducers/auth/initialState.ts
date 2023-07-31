import { LOADING_STATUS } from "../../constants";

export const defaultState = {
    token: null,
    loadingStatus: LOADING_STATUS.LOADING
}

export interface IAuthState {
    token: string;
    loadingStatus: LOADING_STATUS
}