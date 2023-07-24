import { SET_PAGE_NUMBER } from './../types/items';
import { LOADING_STATUS } from "../constants";
import { IItem, IRequestItem } from "../reducers/items/types";
import { SET_ALL_ITEMS, ITEMS_LOADING_STATUS } from "../types/items";

export const saveItems = (payload: [IRequestItem[], number]): {
    type: typeof SET_ALL_ITEMS,
    payload: [IItem[], number]
} => ({
    type: SET_ALL_ITEMS,
    payload
})

export const setItemsStatus = (payload: LOADING_STATUS): {
    type: typeof ITEMS_LOADING_STATUS,
    payload: LOADING_STATUS,
} => ({
    type: ITEMS_LOADING_STATUS,
    payload
})

export const setItemsPage = (payload: number): {
    type: typeof SET_PAGE_NUMBER,
    payload: number,
} => ({
    type: SET_PAGE_NUMBER,
    payload
})
