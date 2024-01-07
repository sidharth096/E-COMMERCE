
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModalCategoryOpen: false,
  isModalSubCategoryOpen: false,
  isModalProductOpen: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModalCategory: (state) => {
      state.isModalCategoryOpen = true;
    },
    closeModalCategory: (state) => {
      state.isModalCategoryOpen = false;
    },
    openModalSubCategory: (state) => {
      state.isModalSubCategoryOpen = true;
    },
    closeModalSubCategory: (state) => {
      state.isModalSubCategoryOpen = false;
    },
    openModalProduct: (state) => {
      state.isModalProductOpen = true;
    },
    closeModalProduct: (state) => {
      state.isModalProductOpen = false;
    },
  },
});

export const {
    openModalCategory,
    closeModalCategory,
    openModalSubCategory,
    closeModalSubCategory,
    openModalProduct,
    closeModalProduct   ,
} = modalSlice.actions;

export default modalSlice.reducer;
