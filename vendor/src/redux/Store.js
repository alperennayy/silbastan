// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "./slices/shopSlice";
import locationReducer from "./slices/locationSlice";

export const store = configureStore({
  reducer: {
    shop: shopReducer,
    location: locationReducer
  }

});
