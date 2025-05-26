import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: null,
  username: null,
  isAuthenticated: false,
  loginFailCount: 0,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveUser: (state, action) => {
      const { email, username } = action.payload;
      state.email = email;
      state.username = username;
      state.isAuthenticated = true;
    },
    logOut: (state) => {
      state.email = null;
      state.username = null;
      state.isAuthenticated = false;
    },
    incrementLoginFailCount: (state) => {
      state.loginFailCount = state.loginFailCount+1;
    }
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
