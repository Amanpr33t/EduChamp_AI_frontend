import { render, screen } from '@testing-library/react';
import Home from './Home';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from "react";
import store from '../store/store';
import userEvent from '@testing-library/user-event'

describe("Navbar tests", () => {

    test('if data is fetched correctly', async() => {
        render(<BrowserRouter><Provider store={store}><Home /></Provider></BrowserRouter>)
        const buttonElement = screen.getByRole('button', { name: /add story/i })
        expect(buttonElement).toBeInTheDocument()
    })
})
