import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    isError: false
}

export const ErrorSlice = createSlice({
    name: 'Error',
    initialState: initialState,
    reducers: {
        //The following is a reducer function used to store a boolean which tell us whether an error has occured while fetching stories
        setError(state, action) {
            state.isError = action.payload
        }
    }
})

export default ErrorSlice
export const ErrorActions = ErrorSlice.actions