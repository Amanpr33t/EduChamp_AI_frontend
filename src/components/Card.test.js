import { render, screen } from '@testing-library/react';
import Card from './Card';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store/store';

describe("AlertModal tests", () => {
    const story={
        _id:'1',
        theme:'theme',
        prompt:'prompt',
        story:'story',
        upVotes:['abc@gmail.com']

    }
    const blurSetter=()=>{}
    const singleStorySetter=()=>{ }
    const alertSetter=()=>{}
    const fetchTopStories=()=>{}
    const errorLoadingSetter=()=>{}

    test('renders correctly', () => {
        render(<BrowserRouter> <Provider store={store}><Card story={story} blurSetter={blurSetter} singleStorySetter={singleStorySetter} alertSetter={alertSetter} fetchTopStories={fetchTopStories} errorLoadingSetter={errorLoadingSetter}/></Provider></BrowserRouter>);

        const paragraphElementTheme = screen.getByText(/Theme/i)
        expect(paragraphElementTheme).toBeInTheDocument()

        const paragraphElementStory = screen.getByText(/story/i)
        expect(paragraphElementStory).toBeInTheDocument()

        const headingElement = screen.getByRole("heading",{level:5})
        expect(headingElement).toBeInTheDocument()

        const svgElement = screen.getByText(/story/i)
        expect(svgElement).toBeInTheDocument()

        const buttonElement = screen.getByRole('button')
        expect(buttonElement).toBeInTheDocument()
    })
    
})


