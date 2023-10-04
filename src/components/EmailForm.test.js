import { render, screen, fireEvent } from '@testing-library/react';
import EmailForm from './EmailForm';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils';

describe("EmailForm tests", () => {
    test('These elements are rendered initially', () => {
        render(<BrowserRouter><EmailForm /></BrowserRouter>);
        const inputElement = screen.getByRole('textbox', { name: /email/i })
        expect(inputElement).toBeInTheDocument()

        const buttonElement = screen.getByRole('button', { name: /login/i })
        expect(buttonElement).toBeInTheDocument()
    })

    test('When the user enters an invalid email', () => {
        userEvent.setup()
        render(<BrowserRouter><EmailForm /></BrowserRouter>);

        const inputElement = screen.getByRole('textbox', { name: /email/i })
        expect(inputElement).toBeInTheDocument()

        fireEvent.change(inputElement, { target: { value: '23' } })
        expect(inputElement.value).toBe('23')

        const buttonElement = screen.getByRole('button', { name: /login/i })
        expect(buttonElement).toBeInTheDocument()

        act(() => {
            userEvent.click(buttonElement)
                .then(() => {
                    const paragraphElement = screen.getByText(/enter a valid email/i)
                    expect(paragraphElement).toBeInTheDocument()
                })
        })
    })

    test('When the user enters a valid email', () => {
        userEvent.setup()
        render(<BrowserRouter><EmailForm /></BrowserRouter>);

        const inputElement = screen.getByRole('textbox', { name: /email/i })
        expect(inputElement).toBeInTheDocument()

        fireEvent.change(inputElement, { target: { value: 'demo@gmail.com' } })
        expect(inputElement.value).toBe('demo@gmail.com')

        const buttonElement = screen.getByRole('button', { name: /login/i })
        expect(buttonElement).toBeInTheDocument()

        act(() => {
            userEvent.click(buttonElement)
                .then(() => {
                    const paragraphElement = screen.queryByText(/enter a valid email/i)
                    expect(paragraphElement).not.toBeInTheDocument()
                })
        })
    })
})


