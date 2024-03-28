import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        currentUser: null,
        isLogging: false,
        error: false
    },
    reducers: {
        login: (state) => {
            state.isLogging = true;
        },
        loginSuccess: (state, action) => {
            state.isLoggedIn = true;
            state.isLogging = false;
            state.error = false;
            // state.currentUser = action.payload.username;
        },
        loginFailed: (state) => {
            state.isLoggedIn = false;
            state.isLogging = false;
            state.error = true;
        },
        logout: (state) => {
            state.isLogging = true;
        },
        logoutSuccess: (state) => {
            state.isLoggedIn = false;
            state.isLogging = false;
            state.currentUser = null;
            state.error = false;
        },
        logoutFailed: (state) => {
            state.isLoggedIn = false;
            state.isLogging = false;
            state.error = true;
        }
    }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
