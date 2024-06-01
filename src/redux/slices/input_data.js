import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  input_data: "",
};

const inputSlice = createSlice({
  name: "input_data",
  initialState,
  reducers: {
    addInput_data: (state, action) => {
      const data = action.payload;
      state.input_data = data;
    },
  },
});

export const { addInput_data } = inputSlice.actions;
export default inputSlice.reducer;
