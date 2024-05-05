import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";

export const store = configureStore({ reducer: {
    product: productSlice
} });

export type RootState = ReturnType<typeof store.getState>;
export type AppDistpatch = typeof store.dispatch;
