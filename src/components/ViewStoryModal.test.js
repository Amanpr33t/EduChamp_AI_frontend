import { render, screen } from '@testing-library/react';
import ViewStoryModal from './ViewStoryModal';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store/store';

describe("ViewStoryModal tests", () => {
    const story = 'story'
    const prompt = 'prompt'
    const blurFunction = jest.fn()
    let theme

    test('test when theme is not none', () => {
        theme = 'theme'
        render(<BrowserRouter> <Provider store={store}><ViewStoryModal blurFunction={blurFunction} prompt={prompt} story={story} theme={theme} /></Provider></BrowserRouter>)

        const paragraphElementTheme = screen.getByText('Theme')
        expect(paragraphElementTheme).toBeInTheDocument()

        const paragraphElementPrompt = screen.getByText('prompt')
        expect(paragraphElementPrompt).toBeInTheDocument()

        const buttonElement = screen.getByRole('button')
        expect(buttonElement).toBeInTheDocument()
    })

    test('test when theme is none', () => {
        theme = 'none'
        render(<BrowserRouter> <Provider store={store}><ViewStoryModal blurFunction={blurFunction} prompt={prompt} story={story} theme={theme} /></Provider></BrowserRouter>)
        const paragraphElementTheme = screen.queryByText('Theme')
        expect(paragraphElementTheme).not.toBeInTheDocument()
    })
})
