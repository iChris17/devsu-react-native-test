import { Product } from "@/hooks/useGetFinancialProducts";
import { createSlice } from "@reduxjs/toolkit";

export const initialState: Product = {
  date_release: "",
  date_revision: "",
  description: "",
  id: "",
  logo: "image.png",
  name: "",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (_state, action) => {
      return action.payload;
    },
    resetProduct: () => {
      return initialState;
    },
  },
});

export const { setProduct, resetProduct } = productSlice.actions;

export default productSlice.reducer;
