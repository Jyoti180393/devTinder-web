import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice = createSlice({
  name: "Connections",
  initialState: null,
  reducers: {
    addConnections: (state, action) => {
      return action.payload;
    },
    removeConnections: () => {
      return null;
    },
    clearConnections: () => {
      return null;
    },
  },
});

export const { addConnections, removeConnections, clearConnections } = connectionsSlice.actions;
export default connectionsSlice.reducer;
