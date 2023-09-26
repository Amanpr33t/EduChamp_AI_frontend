import { render, screen } from '@testing-library/react';
import ThemeModal from './ThemeModal';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store/store';

describe("ThemeModal tests", () => {
    test('renders correctly', () => {
        render(<BrowserRouter> <Provider store={store}><ThemeModal /></Provider></BrowserRouter>);
        const paragraphElement = screen.getByText(/select a theme for the story/i)
        expect(paragraphElement).toBeInTheDocument()

        const radioInputElementHumor = screen.getByRole('radio', {  name: /humor/i})
        expect(radioInputElementHumor).toBeInTheDocument()

        const radioInputElementThriller = screen.getByRole('radio', {  name: /thriller/i})
        expect(radioInputElementThriller).toBeInTheDocument()

        const radioInputElementDrama = screen.getByRole('radio', {  name: /drama/i})
        expect(radioInputElementDrama).toBeInTheDocument()

        const radioInputElementSuspense = screen.getByRole('radio', {  name: /suspense/i})
        expect(radioInputElementSuspense).toBeInTheDocument()

        const radioInputElementRomantic = screen.getByRole('radio', {  name: /romantic/i})
        expect(radioInputElementRomantic).toBeInTheDocument()

        const radioInputElementNone = screen.getByRole('radio', {  name: /none/i})
        expect(radioInputElementNone).toBeInTheDocument()

        const buttonElement = screen.getByRole('button')
        expect(buttonElement).toBeInTheDocument()
    })
    
})
