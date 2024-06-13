import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: {},
};

const orderDetails = createSlice({
  name: "orderDetails",
  initialState,
  reducers: {
    addOrderProduct: (state, action) => {
      state.products = action.payload;
    },
    clearOrderProduct: (state, action) => {
      state.products = {};
    },
  },
});

export const { addOrderProduct, clearOrderProduct } = orderDetails.actions;
export default orderDetails.reducer;
