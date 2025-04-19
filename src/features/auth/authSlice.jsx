import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from './AuthService';

const user = JSON.parse(localStorage.getItem('user'));

export const login = createAsyncThunk('auth/login', AuthService.login);
export const register = createAsyncThunk('auth/register', AuthService.register);
export const logout = createAsyncThunk('auth/logout', AuthService.logout);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: user || null,
    loading: false,
    error: null
  },
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(logout.fulfilled, state => {
        state.user = null;
      });
  }
});

export default authSlice.reducer;
