import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import * as React from 'react';
import { Provider } from 'react-redux';
import ErrorSlice from '../store/slices/errorSlice';

export const renderWithStateMgmt = (ui, { actions = [] } = {}) => {
    const store = configureStore({
        reducer: {
            Error: ErrorSlice.reducer
          }
    });
    actions.forEach((action) => store.dispatch(action)); 
    const renderResult = render(<Provider store={store}>{ui}</Provider>);
    return {
        ...renderResult,
        store,
    };
};