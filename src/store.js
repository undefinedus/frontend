import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slices/loginSlice";
import myPageRefreshSlice from "./slices/myPageRefreshSlice";

export default configureStore({
  reducer: {
    loginSlice: loginSlice,
    refresh: myPageRefreshSlice,
  },
});
