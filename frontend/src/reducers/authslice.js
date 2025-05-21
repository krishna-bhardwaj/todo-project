import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: null,
  username: null,
  isAuthenticated: false,
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
    logout: (state) => {
      state.email = null;
      state.username = null;
      state.isAuthenticated = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
