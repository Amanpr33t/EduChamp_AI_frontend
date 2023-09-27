import { render, screen } from '@testing-library/react';
import Leaderboard from './Leaderboard';
import { BrowserRouter } from 'react-router-dom';
import React from "react";

describe("Leaderboard tests", () => {
    const blurSetter = jest.fn()
    const singleStorySetter = jest.fn()
    const setLeaderBoardOnFullScreen = jest.fn()
    let isLeaderBoardOnFullScreen
    let isBlur
    let topStories = [{
        _id: '1',
        prompt: 'a prompt',
        story: 'story',
        theme: 'theme',
        upVotes: ['abc@gmail.com']
    }]

    test('Home button is rendered', () => {
        isLeaderBoardOnFullScreen = true
        render(<BrowserRouter><Leaderboard blurSetter={blurSetter} singleStorySetter={singleStorySetter} topStories={topStories} isBlur={isBlur} isLeaderBoardOnFullScreen={isLeaderBoardOnFullScreen} setLeaderBoardOnFullScreen={setLeaderBoardOnFullScreen} /></BrowserRouter>)

        const buttonHome = screen.getByRole('button', { name: /home/i })
        expect(buttonHome).toBeInTheDocument()
    })

    test('Home button is not rendered', () => {
        isLeaderBoardOnFullScreen = false
        render(<BrowserRouter><Leaderboard blurSetter={blurSetter} singleStorySetter={singleStorySetter} topStories={topStories} isBlur={isBlur} isLeaderBoardOnFullScreen={isLeaderBoardOnFullScreen} setLeaderBoardOnFullScreen={setLeaderBoardOnFullScreen} /></BrowserRouter>)

        const buttonHome = screen.queryByRole('button', { name: /home/i })
        expect(buttonHome).not.toBeInTheDocument()
    })
    test('Add Story button is rendered', () => {
        isLeaderBoardOnFullScreen = false
        render(<BrowserRouter><Leaderboard blurSetter={blurSetter} singleStorySetter={singleStorySetter} topStories={topStories} isBlur={isBlur} isLeaderBoardOnFullScreen={isLeaderBoardOnFullScreen} setLeaderBoardOnFullScreen={setLeaderBoardOnFullScreen} /></BrowserRouter>)

        const buttonHome = screen.getByRole('button', { name: /add story/i })
        expect(buttonHome).toBeInTheDocument()
    })

    test('Add Story button is not rendered', () => {
        isLeaderBoardOnFullScreen = true
        render(<BrowserRouter><Leaderboard blurSetter={blurSetter} singleStorySetter={singleStorySetter} topStories={topStories} isBlur={isBlur} isLeaderBoardOnFullScreen={isLeaderBoardOnFullScreen} setLeaderBoardOnFullScreen={setLeaderBoardOnFullScreen} /></BrowserRouter>)

        const buttonHome = screen.queryByRole('button', { name: /add story/i })
        expect(buttonHome).not.toBeInTheDocument()
    })

    test('Table body row is not rendered', () => {
        topStories = []
        render(<BrowserRouter><Leaderboard blurSetter={blurSetter} singleStorySetter={singleStorySetter} topStories={topStories} isBlur={isBlur} isLeaderBoardOnFullScreen={isLeaderBoardOnFullScreen} setLeaderBoardOnFullScreen={setLeaderBoardOnFullScreen} /></BrowserRouter>)

        const tableBodyRowElement = screen.queryByRole('row', { name: /a prompt/i })
        expect(tableBodyRowElement).not.toBeInTheDocument()
    })
    test('Table body row is rendered', () => {
        topStories = [{
            _id: '1',
            prompt: 'a prompt',
            story: 'story',
            theme: 'theme',
            upVotes: ['abc@gmail.com']
        }]
        render(<BrowserRouter><Leaderboard blurSetter={blurSetter} singleStorySetter={singleStorySetter} topStories={topStories} isBlur={isBlur} isLeaderBoardOnFullScreen={isLeaderBoardOnFullScreen} setLeaderBoardOnFullScreen={setLeaderBoardOnFullScreen} /></BrowserRouter>)

        const tableBodyRowElement = screen.getByRole('row', { name: /a prompt/i })
        expect(tableBodyRowElement).toBeInTheDocument()
    })

    test('Elements that are always rendered', () => {
        render(<BrowserRouter><Leaderboard blurSetter={blurSetter} singleStorySetter={singleStorySetter} topStories={topStories} isBlur={isBlur} isLeaderBoardOnFullScreen={isLeaderBoardOnFullScreen} setLeaderBoardOnFullScreen={setLeaderBoardOnFullScreen} /></BrowserRouter>)

        const headingElement = screen.getByRole('heading', { name: /top 10 stories/i })
        expect(headingElement).toBeInTheDocument()

        const tableHeadElement = screen.getByRole('row', { name: /story prompt likes/i })
        expect(tableHeadElement).toBeInTheDocument()
    })

})
