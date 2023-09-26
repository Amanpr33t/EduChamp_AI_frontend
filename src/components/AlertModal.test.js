import { render, screen } from '@testing-library/react';
import AlertModal from './AlertModal';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store/store';

describe("AlertModal tests", () => {
    let message='Some error occured'
    let type='warning'
    const alertModalRemover=jest.fn()
    
    test('renders HTML', () => {
        render(<BrowserRouter> <Provider store={store}><AlertModal message={message} type={type} alertModalRemover={alertModalRemover}/></Provider></BrowserRouter>);

        const buttonElementWithSVG = screen.getByRole('button', {  name: /close modal/i})
        expect(buttonElementWithSVG).toBeInTheDocument()

        const headingElement = screen.getByRole('heading', {  name: "Some error occured"})
        expect (headingElement).toBeInTheDocument()
    })

    
    test('Button element has a text of cancel when type is warning', () => {
        type='warning'
        render(<BrowserRouter> <Provider store={store}><AlertModal message={message} type={type} alertModalRemover={alertModalRemover}/></Provider></BrowserRouter>);

        const buttonElementCancel = screen.getByRole('button', {  name: /cancel/i})
        expect (buttonElementCancel).toBeInTheDocument()
    })

    
    test('Button element has a text of ok when type is success', () => {
        type='success'
        render(<BrowserRouter> <Provider store={store}><AlertModal message={message} type={type} alertModalRemover={alertModalRemover}/></Provider></BrowserRouter>);

        const buttonElementCancel = screen.getByRole('button', {  name: /ok/i})
        expect (buttonElementCancel).toBeInTheDocument()
    })
})


