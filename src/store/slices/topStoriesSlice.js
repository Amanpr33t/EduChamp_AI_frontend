import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    topStories: null
}

const TopStoriesSlice = createSlice({
    name: 'TopStories',
    initialState: initialState,
    reducers: {
        setTopStories(state, action) {
            state.topStories = action.payload
        }
    }
})

export default TopStoriesSlice
export const TopStoriesActions = TopStoriesSlice.actions