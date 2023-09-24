import { configureStore } from "@reduxjs/toolkit";
import TopStoriesSlice from "./slices/topStoriesSlice";
import ErrorSlice from "./slices/errorSlice";

//The store stores all the data we want manage using react-redux
const store = configureStore({
  reducer: {
    TopStories: TopStoriesSlice.reducer,
    Error: ErrorSlice.reducer
  }
})

export default store