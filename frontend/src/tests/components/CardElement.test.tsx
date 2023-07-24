import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import CardElement from '../../components/CardElement/CardElement';
import { ITEM_PRIORITY } from '../../components/CreateItemForm/types';

import React from 'react'
global.React = React

test('Рендер одной заметки', () => {
    render(
        <CardElement
            item={
                {
                    id: 1,
                    title: 'my note',
                    text: 'some text',
                    priority: ITEM_PRIORITY.LOW
                }
            }
            onRemove={() => {}}
        />
    );
    const title = screen.getByText(/my note/i);
    const text = screen.getByText(/some text/i);
    const priority = screen.getByText(/LOW/i);

    expect(title).toBeInTheDocument();
    expect(text).toBeInTheDocument();
    expect(priority).toBeInTheDocument();
})
