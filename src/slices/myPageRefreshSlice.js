import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  refresh: false,
};

const myPageRefreshSlice = createSlice({
  name: "refresh",
  initialState,
  reducers: {
    triggerRefresh: (state) => {
      state.refresh = !state.refresh;
    },
  },
});

export const { triggerRefresh } = myPageRefreshSlice.actions;
export default myPageRefreshSlice.reducer;
