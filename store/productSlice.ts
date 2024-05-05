import { Product } from "@/hooks/useGetFinancialProducts";
import { createSlice } from "@reduxjs/toolkit";

const initialState: Product = {
  date_release: "",
  date_revision: "",
  description: "",
  id: "",
  logo: "",
  name: "",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state = action.payload;
    },
    resetProduct: (state) => {
      state = initialState;
    },
  },
});

export const { setProduct, resetProduct } = productSlice.actions;

export default productSlice.reducer;
