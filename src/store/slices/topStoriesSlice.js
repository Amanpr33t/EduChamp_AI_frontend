import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    topStories: null
}

const TopStoriesSlice = createSlice({
    name: 'TopStories',
    initialState: initialState,
    reducers: {
        //The following is a reducer function used to update the stories stored inside the redux store
        setTopStories(state, action) {
            state.topStories = action.payload
        }
    }
})

export default TopStoriesSlice
export const TopStoriesActions = TopStoriesSlice.actions