import { render, screen } from '@testing-library/react';
import ThemeModal from './ThemeModal';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store/store';
import userEvent from '@testing-library/user-event';

describe("ThemeModal tests", () => {
    const themeSetter = jest.fn()
    const showThemeModalSetter = jest.fn()
    let theme = ''
    const storyGenerator = jest.fn()

    test('These elements are initially rendered', () => {

        render(<BrowserRouter> <Provider store={store}><ThemeModal themeSetter={themeSetter} showThemeModalSetter={showThemeModalSetter} theme={theme} storyGenerator={storyGenerator} /></Provider></BrowserRouter>);
        const paragraphElement = screen.getByText(/select a theme for the story/i)
        expect(paragraphElement).toBeInTheDocument()

        const radioInputElementHumor = screen.getByRole('radio', { name: /humor/i })
        expect(radioInputElementHumor).toBeInTheDocument()

        const radioInputElementThriller = screen.getByRole('radio', { name: /thriller/i })
        expect(radioInputElementThriller).toBeInTheDocument()

        const radioInputElementDrama = screen.getByRole('radio', { name: /drama/i })
        expect(radioInputElementDrama).toBeInTheDocument()

        const radioInputElementSuspense = screen.getByRole('radio', { name: /suspense/i })
        expect(radioInputElementSuspense).toBeInTheDocument()

        const radioInputElementRomantic = screen.getByRole('radio', { name: /romantic/i })
        expect(radioInputElementRomantic).toBeInTheDocument()

        const radioInputElementNone = screen.getByRole('radio', { name: /none/i })
        expect(radioInputElementNone).toBeInTheDocument()

        const buttonElement = screen.getByRole('button', { name: /search/i })
        expect(buttonElement).toBeInTheDocument()

        const paragrahElement1 = screen.getByText(/click here/i)
        expect(paragrahElement1).toBeInTheDocument()

        const paragrahElement2 = screen.getByText(/to add a custom theme/i)
        expect(paragrahElement2).toBeInTheDocument()
    })

    test('These elements are not initially rendered', () => {
        render(<BrowserRouter> <Provider store={store}><ThemeModal themeSetter={themeSetter} showThemeModalSetter={showThemeModalSetter} theme={theme} storyGenerator={storyGenerator} /></Provider></BrowserRouter>);
        const inputElement = screen.queryByRole('textbox', { name: /add your own theme/i })
        expect(inputElement).not.toBeInTheDocument()
    })

    test('When the form is rendered', async () => {
        userEvent.setup()
        render(<BrowserRouter> <Provider store={store}><ThemeModal themeSetter={themeSetter} showThemeModalSetter={showThemeModalSetter} theme={theme} storyGenerator={storyGenerator} /></Provider></BrowserRouter>);

        const paragrahElement1 = screen.getByText(/click here/i)
        expect(paragrahElement1).toBeInTheDocument()
        await userEvent.click(paragrahElement1)

        const inputElement = screen.getByRole('textbox', { name: /add your own theme/i })
        expect(inputElement).toBeInTheDocument()
    })

    test('When the form is rendered, these elements are not rendered', async () => {
        userEvent.setup()
        render(<BrowserRouter> <Provider store={store}><ThemeModal themeSetter={themeSetter} showThemeModalSetter={showThemeModalSetter} theme={theme} storyGenerator={storyGenerator} /></Provider></BrowserRouter>);

        const paragrahElementForm = screen.getByText(/click here/i)
        expect(paragrahElementForm).toBeInTheDocument()
        await userEvent.click(paragrahElementForm)

        const paragraphElement = screen.queryByText(/select a theme for the story/i)
        expect(paragraphElement).not.toBeInTheDocument()

        const radioInputElementHumor = screen.queryByRole('radio', { name: /humor/i })
        expect(radioInputElementHumor).not.toBeInTheDocument()

        const radioInputElementThriller = screen.queryByRole('radio', { name: /thriller/i })
        expect(radioInputElementThriller).not.toBeInTheDocument()

        const radioInputElementDrama = screen.queryByRole('radio', { name: /drama/i })
        expect(radioInputElementDrama).not.toBeInTheDocument()

        const radioInputElementSuspense = screen.queryByRole('radio', { name: /suspense/i })
        expect(radioInputElementSuspense).not.toBeInTheDocument()

        const radioInputElementRomantic = screen.queryByRole('radio', { name: /romantic/i })
        expect(radioInputElementRomantic).not.toBeInTheDocument()

        const radioInputElementNone = screen.queryByRole('radio', { name: /none/i })
        expect(radioInputElementNone).not.toBeInTheDocument()

        const paragrahElement1 = screen.queryByText(/click here/i)
        expect(paragrahElement1).not.toBeInTheDocument()

        const paragrahElement2 = screen.queryByText(/to add a custom theme/i)
        expect(paragrahElement2).not.toBeInTheDocument()
    })


})
