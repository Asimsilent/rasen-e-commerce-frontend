import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice";
import modalReducer from "./modalSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    modal: modalReducer,
  },
});
