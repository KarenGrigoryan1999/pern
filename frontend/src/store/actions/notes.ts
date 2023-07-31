import { LOADING_STATUS } from "../constants";
import { INote, IRequestNote } from "../reducers/notes/types";
import { SET_ALL_NOTES, NOTES_LOADING_STATUS } from "../types/notes";

export const saveNotes = (payload: [IRequestNote[], number]): {
    type: typeof SET_ALL_NOTES,
    payload: [INote[], number]
} => ({
    type: SET_ALL_NOTES,
    payload
})

export const setnotesStatus = (payload: LOADING_STATUS): {
    type: typeof NOTES_LOADING_STATUS,
    payload: LOADING_STATUS,
} => ({
    type: NOTES_LOADING_STATUS,
    payload
})
