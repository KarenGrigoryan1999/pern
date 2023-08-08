import React from 'react';
import { Provider } from 'react-redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { fireEvent, render, screen } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import CreateNoteForm from '../../components/CreateNoteForm/CreateNoteForm';
import { IState } from '../../store/store';

describe('Тестирование компонента формы добавления записки', () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore<IState, ThunkDispatch<IState, any, any>>(middlewares);

    let testStore;

    beforeAll(() => {
        testStore = mockStore({});
        global.React = React;
    });

    test('Ввод заголовка менее пяти символов, а также ввод пустого текста в текстовую часть. Ожидается ошибка валидации', async () => {
        const { container } = render(
            <Provider store={testStore}>
                <CreateNoteForm />
            </Provider>,
        );

        const titleTextField = container.querySelector('#title');
        const textTextField = container.querySelector('#text');
        fireEvent.focus(textTextField);
        fireEvent.change(textTextField, { target: { value: 'test' } });
        fireEvent.blur(textTextField);

        fireEvent.focus(titleTextField);
        fireEvent.change(titleTextField, { target: { value: '' } });
        fireEvent.blur(titleTextField);

        const helperTitleText = screen.getByText(/Это поле обязательно/i);
        const helperContentText = screen.getByText(/Минимальный размер текста 5 символов/i);
        expect(helperContentText).toBeInTheDocument();
        expect(helperTitleText).toBeInTheDocument();
    });

    test('Ввод заголовка более пяти символов, а также ввод непустого текста в текстовую часть.  Ожидается отсутствие ошибки валидации', async () => {
        const { container } = render(
            <Provider store={testStore}>
                <CreateNoteForm />
            </Provider>,
        );

        const titleTextField = container.querySelector('#title');
        const textTextField = container.querySelector('#text');
        fireEvent.focus(textTextField);
        fireEvent.change(textTextField, { target: { value: 'Test text' } });
        fireEvent.blur(textTextField);

        fireEvent.focus(titleTextField);
        fireEvent.change(titleTextField, { target: { value: 'Note name' } });
        fireEvent.blur(titleTextField);

        expect(titleTextField).toHaveValue('');
        expect(textTextField).toHaveValue('');
    });
});
