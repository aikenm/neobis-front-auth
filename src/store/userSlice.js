import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: !!localStorage.getItem('authToken'),
    passwordVisible: true,
    passwordRepeatFocused: false,
    criteria: {
        length: false,
        hasUppercase: false,
        hasNumber: false,
        hasSpecialChar: false
    },
    buttonText: "Войти",
    showTooltip: false,
    loginFailed: false,
    authToken: localStorage.getItem('authToken') || null,
    showModal: false,
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
        setCriteria: (state, action) => {
            state.criteria = action.payload;
        },
        togglePasswordRepeatFocused: (state) => {
            state.passwordRepeatFocused = !state.passwordRepeatFocused;
        },
        resetUserState: (state) => initialState,
        showEmailResendModal: (state) => {
            state.showModal = true;
        },
        hideEmailResendModal: (state) => {
            state.showModal = false;
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
    setCriteria,
    resetUserState,
    togglePasswordRepeatFocused,
    showEmailResendModal,
    hideEmailResendModal,
    showLogoutModal,
    hideLogoutModal,
    logout
} = userSlice.actions;

export default userSlice.reducer;
