// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"
import shopReducer from "./slices/shopSlice";
import locationReducer from "./slices/locationSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    shop: shopReducer,
    location: locationReducer
  }
});
