import { LOADING_STATUS } from "../../constants"
import { IRequestNote } from "./types"

export const defaultState = {
    notes: [],
    page: 1,
    limit: 10,
    count: 0,
    loadingStatus: LOADING_STATUS.LOADING,
}

export interface INotesState {
    notes: IRequestNote[],
    page: number,
    limit: number,
    count: number,
    loadingStatus: LOADING_STATUS
}