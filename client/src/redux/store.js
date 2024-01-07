
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice.js'
import modalReducer from './slices/modalSlice.js'

const store = configureStore({
  reducer:{
    user:userReducer,
    modal: modalReducer
  }
});

export default store;
