import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    removeFeed: (state) => {
      if (!state || !Array.isArray(state)) {
        return state;
      }
      return state.slice(1);
    },
    clearFeed: () => {
      return null;
    },
  },
});

export default feedSlice.reducer;
export const { addFeed, removeFeed, clearFeed } = feedSlice.actions;
