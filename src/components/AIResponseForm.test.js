import { render, screen } from '@testing-library/react';
import AIResponseForm from './AIResponseForm';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store/store';

describe("AIResponseForm tests", () => {
    const item = {
        prompt: 'a prompt',
        fullStory: 'a story'
    }

    test('Elements that are rendered initiallyL', () => {
        render(<BrowserRouter> <Provider store={store}><AIResponseForm item={item} /></Provider></BrowserRouter>);

        const paragraphElementYou = screen.getByText(/You/i)
        expect(paragraphElementYou).toBeInTheDocument()

        const paragraphElementAI = screen.getByText(/AI/i)
        expect(paragraphElementAI).toBeInTheDocument()

        const paragraphElementPrompt = screen.getByText(/a prompt/i)
        expect(paragraphElementPrompt).toBeInTheDocument()
    })

    test('Paragrah element that shows the story is rendered only when fullStory is present in props', () => {
        render(<BrowserRouter> <Provider store={store}><AIResponseForm item={item} /></Provider></BrowserRouter>);

        const paragraphElementStory = screen.getByText(/a story/i)
        expect(paragraphElementStory).toBeInTheDocument()
    })

    test('Paragrah element that shows the story is not rendered when fullStory is not present in props', () => {
        item.fullStory=''
        render(<BrowserRouter> <Provider store={store}><AIResponseForm item={item} /></Provider></BrowserRouter>);

        const paragraphElementStory = screen.queryByText(/a story/i)
        expect(paragraphElementStory).not.toBeInTheDocument()
    })
    
    test('Div element with svg spinner is rendered when fullStory is not present in props', () => {
        item.fullStory=''
        render(<BrowserRouter> <Provider store={store}><AIResponseForm item={item} /></Provider></BrowserRouter>);

        const paragraphElementStory = screen.getByRole('status')
        expect(paragraphElementStory).toBeInTheDocument()
    })

    test('Div element with svg spinner is not rendered when fullStory is present in props', () => {
        item.fullStory='a story'
        render(<BrowserRouter> <Provider store={store}><AIResponseForm item={item} /></Provider></BrowserRouter>);

        const paragraphElementStory = screen.queryByRole('status')
        expect(paragraphElementStory).not.toBeInTheDocument()
    })

})


