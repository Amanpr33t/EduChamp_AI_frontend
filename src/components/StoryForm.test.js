import { render, screen } from '@testing-library/react';
import StoryForm from './StoryForm';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from "react";
import store from '../store/store';
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils';

describe("StoryForm elements", () => {
    test('Initially rendered elements', () => {
        render(<BrowserRouter> <Provider store={store}><StoryForm /></Provider></BrowserRouter>)
        const homeButton = screen.getByRole('button', { name: /home/i })
        expect(homeButton).toBeInTheDocument()

        const inputElement = screen.getByRole('textbox')
        expect(inputElement).toBeInTheDocument()

        const hintParagraphElement = screen.getByText(/hint:/i)
        expect(hintParagraphElement).toBeInTheDocument()

        const hintExampleParagraphElement = screen.getByText(/once upon a time in a digital world\.\.\./i)
        expect(hintExampleParagraphElement).toBeInTheDocument()

        const messageParagraphElement = screen.getByText(/enter a prompt to get exciting stories\./i)
        expect(messageParagraphElement).toBeInTheDocument()
    })
})

//When the search font in clicked
describe("search click", () => {

    

        

    test('prompt shorter than 150 characters', async () => {
        userEvent.setup()
        render(<BrowserRouter> <Provider store={store}><StoryForm /></Provider></BrowserRouter>)

        const inputElement = screen.getByRole('textbox')
        inputElement.setAttribute('value', 'In a world of tangible dreams.')

        const searchButton = screen.getByRole('searchButton')
        expect(searchButton).toBeInTheDocument()

        act(() => {
            userEvent.click(searchButton).then(() => {
                const errorMessageParagraphElement = screen.queryByText(/warning: prompt cannot be longer than 150 characters\./i)
                expect(errorMessageParagraphElement).not.toBeInTheDocument()

                const themeModalHeading = screen.getByText(/select a theme for the story/i)
                expect(themeModalHeading).toBeInTheDocument()

                const radioButtons1 = screen.getByRole('radio', { name: /humor thriller drama/i })
                expect(radioButtons1).toBeInTheDocument()

                const radioButtons2 = screen.getByRole('radio', { name: /suspense romantic none/i })
                expect(radioButtons2).toBeInTheDocument()

                const searchButtonModal = screen.getByRole('button', { name: /search/i })
                expect(searchButtonModal).toBeInTheDocument()

                const clickHereParagraphLink = screen.getByText(/click here/i)
                expect(clickHereParagraphLink).toBeInTheDocument()

                const customThemeParagraph = screen.getByText(/to add a custom theme/i)
                expect(customThemeParagraph).toBeInTheDocument()

                const humorRadioButton = screen.getByRole('radio', { name: /humor/i })
                expect(humorRadioButton).toBeInTheDocument()

                if (userEvent.click(clickHereParagraphLink)) { //click on the button with text click here
                    userEvent.click(clickHereParagraphLink).then(() => {
                        const customThemeInput = screen.getByRole('textbox', { name: /add your own theme/i })
                        expect(customThemeInput).toBeInTheDocument()

                        const customThemeButton = screen.getByRole('button', { name: /search/i })
                        expect(customThemeButton).toBeInTheDocument()

                        userEvent.click(customThemeButton).then(() => {
                            const AIGeneratedStoryParagraphElement = screen.getByText(/a story/i)
                            expect(AIGeneratedStoryParagraphElement).toBeInTheDocument()
                        })
                    })
                }

                if (userEvent.click(humorRadioButton)) {
                    userEvent.click(humorRadioButton).then(() => { //we click the radio button
                        userEvent.click(searchButtonModal).then(() => { //we click the search button on ThemeModal
                            const AIGeneratedStoryParagraphElement = screen.getByText(/a story/i)
                            expect(AIGeneratedStoryParagraphElement).toBeInTheDocument()

                            const inputElement = screen.getByRole('textbox')
                            inputElement.setAttribute('value', 'In a world of tangible dreams.')

                            const searchButton = screen.getByRole('searchButton')
                            expect(searchButton).toBeInTheDocument()

                            userEvent.click(searchButton).then(() => {//We again click on the search font
                                userEvent.click(humorRadioButton).then(() => {//We click on the radio button
                                    userEvent.click(searchButtonModal).then(() => {
                                        const AIGeneratedStoryParagraphElement = screen.getByText(/a story/i)
                                        expect(AIGeneratedStoryParagraphElement).toBeInTheDocument()

                                        const saveButton = screen.getByRole('button', { name: /save story/i })
                                        expect(saveButton).toBeInTheDocument()

                                        userEvent.click(saveButton).then(() => {//We click on the save button to save story
                                            const alertModalButton = screen.getByRole('button', { name: /ok/i })
                                            expect(alertModalButton).toBeInTheDocument()
                                        })
                                    })
                                })
                            })
                        })
                    })
                }
            })
        })
    })

    test('prompt longer than 150 characters', async () => {
        userEvent.setup()
        render(<BrowserRouter> <Provider store={store}><StoryForm /></Provider></BrowserRouter>)

        const inputElement = screen.getByRole('textbox')
        inputElement.setAttribute('value', 'In a world of tangible dreams, an artist discovers her crystal unlocks others potential. A Dream Nexus guardian, a conflict unfolds. She must navigate the dreamscape, forming alliances, to unravel secrets and preserve the delicate balance between reality and the ethereal.')

        const searchButton = screen.getByRole('searchButton')
        expect(searchButton).toBeInTheDocument()

        act(() => {
            userEvent.click(searchButton) //here we click the search font
                .then(() => {
                    const errorMessageParagraphElement = screen.getByText(/warning: prompt cannot be longer than 150 characters\./i)
                    expect(errorMessageParagraphElement).toBeInTheDocument()
                })
        })
    })
})
