import { render, screen } from '@testing-library/react'
import Navbar from './Navbar'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import React from "react"
import store from '../store/store'
import { renderWithStateMgmt } from '../lib/test-util'
import { ErrorActions } from '../store/slices/errorSlice'

describe("Navbar tests", () => {

    test('These elements are always rendered ', () => {

        renderWithStateMgmt(<BrowserRouter> <Navbar /></BrowserRouter>);

        const linkElement = screen.getByRole('link', { name: /story sculptor/i })
        expect(linkElement).toBeInTheDocument()

        const SVGElement = screen.getByRole('svg')
        expect(SVGElement).toBeInTheDocument()
    })

    test('When the isError redux state is true', () => {

        renderWithStateMgmt(<BrowserRouter> <Navbar /></BrowserRouter>, {
            actions: [
                ErrorActions.setError(true)
            ],
        })

        const buttonElement = screen.queryByRole('button', { name: /logout/i })
        expect(buttonElement).not.toBeInTheDocument()
    })

    test('When the isError redux state is false', async () => {

        //We set the localStorage
        const setLocalStorage = (id, data) => {
            window.localStorage.setItem(id, data);
        };
        setLocalStorage("email_AI_story", 'demo@gmail.com');
        expect(localStorage.getItem("email_AI_story")).toEqual('demo@gmail.com')

        //We set the location.pathname property
        Object.defineProperty(window, 'location', {
            value: {
                pathname: '/',
            }
        });
        expect(window.location.pathname).toEqual('/');

        renderWithStateMgmt(<BrowserRouter> <Navbar /></BrowserRouter>, {
            actions: [
                ErrorActions.setError(false)
            ],
        });
        const buttonElement = screen.getByRole('button', { name: /logout/i })
        expect(buttonElement).toBeInTheDocument()
    })
})


