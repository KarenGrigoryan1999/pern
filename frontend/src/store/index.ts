import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { itemsReducer } from "./reducers/items/items";
import { IItemsState } from "./reducers/items/initialState";
import { authReducer } from "./reducers/auth/auth";
import { IAuthState } from "./reducers/auth/initialState";

export default createStore(combineReducers({ itemsReducer, authReducer }), composeWithDevTools(applyMiddleware(thunk)));

export interface IState {
    itemsReducer: IItemsState,
    authReducer: IAuthState
}