import { LOADING_STATUS } from "../../constants"
import { IRequestItem } from "./types"

export const defaultState = {
    items: [],
    page: 1,
    limit: 10,
    count: 0,
    loadingStatus: LOADING_STATUS.LOADING,
}

export interface IItemsState {
    items: IRequestItem[],
    page: number,
    limit: number,
    count: number,
    loadingStatus: LOADING_STATUS
}