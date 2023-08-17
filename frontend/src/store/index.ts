import {
  AnyAction,
  Dispatch,
  applyMiddleware,
  combineReducers,
  createStore,
} from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import notesReducer from './reducers/notes/notes';
import authReducer from './reducers/auth/auth';
import { INotesState } from './reducers/notes/initialState';
import { IAuthState } from './reducers/auth/initialState';

export const store = createStore(
  combineReducers({ notesReducer, authReducer }),
  composeWithDevTools(applyMiddleware(thunk)),
);

export interface IState {
  notesReducer: INotesState;
  authReducer: IAuthState;
}

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = Dispatch<AnyAction> &
  ThunkDispatch<RootState, unknown, AnyAction>;
