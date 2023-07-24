import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';

import React from 'react'
import CardList from '../../components/CardList/CardList';
import store from '../../store';
global.React = React

describe('Компонент списка заметок', () => {
    test('Проверка прогрессбара в момент загрузки', () => {
        render(
            <Provider store={store}>
                <CardList />
            </Provider>
        );
        const loader = screen.getByRole('progressbar');
        expect(loader).toBeInTheDocument();
    });
    test('Проверка заметок после полной прогрузки', async () => {
        render(
            <Provider store={store}>
                <CardList />
            </Provider>
        );
        const loader = await screen.findByText(/Все заметки загружены!/i);
        expect(loader).toBeInTheDocument();
    });
})
