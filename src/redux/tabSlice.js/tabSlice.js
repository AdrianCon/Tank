import { createSlice } from "@reduxjs/toolkit";

const tabSlice = createSlice({
  name: "tab",
  initialState: 0,
  reducers: {
    setTab: (state, action) => {
      return (state = action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTab } = tabSlice.actions;

export default tabSlice.reducer;
