import { render, screen } from '@testing-library/react';
import EmailForm from './EmailForm';
import { BrowserRouter } from 'react-router-dom';

describe("EmailForm tests", () => {
    test('These elements are rendered initially', () => {
        render(<BrowserRouter><EmailForm /></BrowserRouter>);
        const inputElement = screen.getByRole('textbox', { name: /email/i })
        expect(inputElement).toBeInTheDocument()

        const labelElement = screen.getByText(/email/i)
        expect(labelElement).toBeInTheDocument()

        const buttonElement = screen.getByRole('button', { name: /login/i })
        expect(buttonElement).toBeInTheDocument()

        const paragraphElement = screen.queryByText(/enter a valid email/i)
        expect(paragraphElement).not.toBeInTheDocument()
    })
})


