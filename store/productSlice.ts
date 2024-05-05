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
