import { createSlice } from "@reduxjs/toolkit";

//Redux slice which holds all logic of login reducer
export const loginSlice = createSlice({
  name: "auth",
  initialState: {
    users: [
      {
        id: 1,
        username: "test01",
        password: "test1234",
      },
    ],
    loggedInUser: null,
  },
  reducers: {
    login: (state, action) => {
      state.loggedInUser = action.payload;
    },
    logout: (state) => {
      state.loggedInUser = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
