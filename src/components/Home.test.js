import { render, screen } from '@testing-library/react';
import Home from './Home';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from "react";
import store from '../store/store';
import userEvent from '@testing-library/user-event'
import { server } from '../mocks/server'
import { rest } from 'msw';


describe("Home tests", () => {

    test('fetch data', async () => {
        render(<BrowserRouter> <Provider store={store}><Home /></Provider></BrowserRouter>)

        const storyElement = await screen.findByText(/a story/i)
        expect(storyElement).toBeInTheDocument();

        const leaderboardTableElement = await screen.findByRole('row', { name: /a prompt 1/i })
        expect(leaderboardTableElement).toBeInTheDocument();
    })

    test('error handling', async () => {
        server.use(
            rest.get(`${process.env.REACT_APP_BACKEND_URL}/story/get_stories`, (req, res, ctx) => {
                return res(
                    ctx.status(500)
                )
            })
        )
        render(<BrowserRouter> <Provider store={store}><Home /></Provider></BrowserRouter>)

        const errorElement = await screen.findByText(/Some error occured./i)
        expect(errorElement).toBeInTheDocument();
    })
})
