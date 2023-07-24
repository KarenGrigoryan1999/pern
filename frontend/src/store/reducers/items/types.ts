import { ITEM_PRIORITY } from "../../../components/CreateItemForm/types";

export interface IItem {
    title: string;
    text: string;
    priority: ITEM_PRIORITY;
}

export interface IRequestItem extends IItem {
    id: number;
}