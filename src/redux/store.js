import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/productSlice";
import scrollSlice from "./slices/scrollSlice";
import likedSlice from "./slices/liked";
import navSlice from "./slices/nav";
import inputSlice from "./slices/input_data";
import profile_data from "./slices/profile_data";
import orderDetails from "./slices/orderDetails";

const store = configureStore({
  reducer: {
    products: productSlice,
    scroll: scrollSlice,
    liked: likedSlice,
    nav: navSlice,
    input_data: inputSlice,
    profile_data: profile_data,
    orderDetails: orderDetails,
  },
});

export default store;
