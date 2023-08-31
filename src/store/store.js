import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Import your auth reducer
// Other imports...

const store = configureStore({
  reducer: {
    auth: authReducer,
    // Other reducers...
  },
  // Other configuration options...
});

export default store;
