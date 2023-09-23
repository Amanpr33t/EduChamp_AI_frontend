import { configureStore } from "@reduxjs/toolkit";
import TopStoriesSlice from "./slices/topStoriesSlice";

const store = configureStore({
  reducer: {
    TopStories: TopStoriesSlice.reducer
  }
})

export default store