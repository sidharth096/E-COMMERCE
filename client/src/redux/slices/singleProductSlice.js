import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  singleproduct:null
};
  

const singleproductSlice = createSlice({
  name: 'singleproduct',
  initialState,
  reducers: {
    setSingleProduct: (state, action) => {
      state.singleproduct = action.payload;
    },
    clearSingleProduct: (state, action) => {
      state.singleproduct = null
    },
  },
});

export const { setSingleProduct,clearSingleProduct} = singleproductSlice.actions;
export default singleproductSlice.reducer;
