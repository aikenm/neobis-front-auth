import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: !!localStorage.getItem('authToken'),
    passwordVisible: true,
    buttonText: "Войти",
    showTooltip: false,
    loginFailed: false,
    authToken: localStorage.getItem('authToken') || null,
    showLogoutModal: false
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setPasswordVisibility: (state, action) => {
            state.passwordVisible = action.payload;
        },
        setButtonText: (state, action) => {
            state.buttonText = action.payload;
        },
        setShowTooltip: (state, action) => {
            state.showTooltip = action.payload;
        },
        setLoginFailed: (state, action) => {
            state.loginFailed = action.payload;
        },
        setAuthToken: (state, action) => {
            state.authToken = action.payload;
            if (action.payload) {
                localStorage.setItem('authToken', action.payload);
                state.isAuthenticated = true;
            }
        },
        showLogoutModal: (state) => {
            state.showLogoutModal = true;
        },
        hideLogoutModal: (state) => {
            state.showLogoutModal = false;
        },
        logout: (state) => {
            localStorage.removeItem('authToken');
            state.isAuthenticated = false;
            state.authToken = null;
        }
    }
});

export const {
    setPasswordVisibility,
    setButtonText,
    setShowTooltip,
    setLoginFailed,
    setAuthToken,
    showLogoutModal,
    hideLogoutModal,
    logout
} = userSlice.actions;

export default userSlice.reducer;
