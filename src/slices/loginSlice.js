import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCookie, removeCookie, setCookie } from "../util/cookieUtil";

const initState = {
  email: "",
};

const loadMemberCookie = () => {
  return getCookie("member");
};

export const loginPostAsync = createAsyncThunk("loginPostAsync", (param) =>
  loginPostAsync(param)
);

const loginSlice = createSlice({
  name: "loginSlice",
  initialState: loadMemberCookie() || initState,
  reducers: {
    login: (state, action) => {
      console.log("login......", action);
      console.log(action.payload);

      setCookie("member", JSON.stringify(action.payload), 1);

      return action.payload;
    },
    logout: (state, action) => {
      console.log("logout......");

      removeCookie("member");

      return { ...initState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginPostAsync.fulfilled, (state, action) => {
        console.log("fulfilled.....");
        const payload = action.payload;
        if (!payload.error) {
          setCookie("member", JSON.stringify(payload));
        }
        return payload;
      })
      .addCase(loginPostAsync.pending, (state, action) => {
        console.log("pending.....");
      })
      .addCase(loginPostAsync.rejected, (state, action) => {
        console.log("rejected.....");
      });
  },
});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
