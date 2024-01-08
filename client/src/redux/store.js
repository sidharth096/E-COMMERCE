
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice.js'
import modalReducer from './slices/modalSlice.js'
import wishlistReducer from './slices/wishlistSlice.js'
import productsReducer from './slices/productSlice.js';

const store = configureStore({
  reducer:{
    user:userReducer,
    modal: modalReducer,
    wishlist:wishlistReducer,
    products:productsReducer
  }
});

export default store;
