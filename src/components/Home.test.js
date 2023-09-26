import { render, screen } from '@testing-library/react';
import Home from './Home';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from "react";
import store from '../store/store';


describe("Navbar tests", () => {


    test('renders correctly', () => {
        render(<BrowserRouter><Provider store={store}><Home /></Provider></BrowserRouter>)

        const linkElement = screen.getByRole('link', { name: /story sculptor/i })
        expect(linkElement).toBeInTheDocument()
    })
})
