import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from "react";
import store from '../store/store';


describe("Navbar tests", () => {


    test('renders correctly', () => {
        render(<BrowserRouter><Provider store={store}><Navbar/></Provider></BrowserRouter>)

        const linkElement = screen.getByRole('link', { name: /story sculptor/i })
        expect(linkElement).toBeInTheDocument()

        const SVGElement = screen.getByRole('svg')
        expect(SVGElement).toBeInTheDocument()

        const buttonElement = screen.queryByRole('button', { name: /logout/i })
        expect(buttonElement).not.toBeInTheDocument()
    })
})


