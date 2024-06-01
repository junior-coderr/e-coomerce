import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts", // unique identifier for the thunk action
  async (page, thunkAPI) => {
    // thunk function
    try {
      const response = await fetch("/api/all-products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ page }),
      });

      // console.log("pager", page);
      const data = await response.json();
      return data.products; // Assuming data.products contains the products
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
