import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nav: [],
};

const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setNav: (state, action) => {
      state.nav.push(action.payload);
    },
    removeNav: (state, action) => {
      state.nav.pop();
    },
  },
});

export const { setNav, removeNav } = navSlice.actions;
export default navSlice.reducer;
