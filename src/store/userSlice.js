import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUser: (state, action) => {
      return action.payload;
    },
    updateUser: (state, action) => {
      return { ...state, ...action.payload };
    },
    removeUser: () => {
      return null;
    },
    resetUser: () => {
      return null;
    },
  },
});

export default userSlice.reducer;
export const { addUser, updateUser, removeUser, resetUser } = userSlice.actions;
