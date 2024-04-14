import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchProducts } from "./fetchProduct.thunk";

const initialState = {
  products: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        // console.log("Payload", action.payload);
        state.products = [...state.products, ...action.payload];
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        console.log(action.error.message);
      });
  },
});

export const { loadProducts } = productSlice.actions;
export default productSlice.reducer;
