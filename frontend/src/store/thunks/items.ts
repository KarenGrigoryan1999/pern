import api from "../../api";
import { saveItems, setItemsStatus } from "../actions/items";
import { LOADING_STATUS } from "../constants";
import { IItem } from "../reducers/items/types";

export const getPaginatedItems = (page: number, limit: number) => async (dispatch) => {
    dispatch(setItemsStatus(LOADING_STATUS.LOADING));
    const items = await api.get(`note/list?page=${page}&limit=${limit}`);
    dispatch(saveItems(items.data));
    dispatch(setItemsStatus(LOADING_STATUS.SUCCESS));
}

export const createItem = (item: IItem) => async (dispatch, getState) => {
    try {
        dispatch(setItemsStatus(LOADING_STATUS.LOADING));
        await api.post('note', item);
        const { page, limit } = getState().itemsReducer;
        dispatch(getPaginatedItems(page, limit));
        dispatch(setItemsStatus(LOADING_STATUS.SUCCESS));
    } catch(e) {
        console.log('error');
        dispatch(setItemsStatus(LOADING_STATUS.ERROR));
    }
}

export const removeItem = (noteId: number) => async (dispatch, getState) => {
    try{
        dispatch(setItemsStatus(LOADING_STATUS.LOADING));
        await api.delete(`note/${noteId}`);
        const { page, limit } = getState().itemsReducer;
        dispatch(getPaginatedItems(page, limit));
        dispatch(setItemsStatus(LOADING_STATUS.SUCCESS));
    } catch(e) {
        console.log('error');
        dispatch(setItemsStatus(LOADING_STATUS.ERROR));
    }
}