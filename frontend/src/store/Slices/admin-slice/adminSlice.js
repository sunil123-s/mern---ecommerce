import { fetchAllProducts } from "@/store/Thunk/admin/Product";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  editProduct: {},
  isLoading: false,
  error: null,
};

const ProductSlice = createSlice({
  name: "adminProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.data;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isLoading = true;
        state.error = action.payload;
      });
  },
});

export const { editPro } = ProductSlice.actions;
export default ProductSlice.reducer;
