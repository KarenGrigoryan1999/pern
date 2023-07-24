import React from 'react'
import { Provider } from 'react-redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { render, screen } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import CardList from '../../components/CardList/CardList';
import { LOADING_STATUS } from '../../store/constants';

describe('Компонент списка заметок', () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore<AppState, ThunkDispatch<AppState, any, any>>(middlewares);

    beforeAll(() => {
        global.React = React;
    });

    test('Загрузка заметок из стора', async () => {
        let testStore = mockStore({
            itemsReducer: {
                items: [],
                loadingStatus: LOADING_STATUS.SUCCESS
            }
        });
        render(
            <Provider store={testStore}>
                <CardList />
            </Provider>
        );
        const notesLoadedText = await screen.findByText(/Все заметки загружены!/i);
        expect(notesLoadedText).toBeInTheDocument();
    });
    
    test('Неудачная загрузка заметок из стора', async () => {
        let testStore = mockStore({
            itemsReducer: {
                items: null,
                loadingStatus: LOADING_STATUS.ERROR
            }
        });
        render(
            <Provider store={testStore}>
                <CardList />
            </Provider>
        );
        const loader = await screen.findByRole(/progressbar/i);
        expect(loader).toBeInTheDocument();
    });
})
