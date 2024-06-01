import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  data: {},
};

const profile_data = createSlice({
  name: "liked",
  initialState,
  reducers: {
    add_profile_data: (state, action) => {
      const data = action.payload;
      state.liked = data;
    },
  },
});

export const { add_profile_data } = profile_data.actions;
export default profile_data.reducer;
