import { AddtoCart,updateCart,deleteCart,fetchCartItems } from "@/store/Thunk/Publics/CartThunk";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems : [],
    isLoading: false
}

const CartSlice = createSlice({
    name:"Cart",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder
          .addCase(AddtoCart.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(AddtoCart.fulfilled, (state, action) => {
            (state.isLoading = false), (state.cartItems = action.payload.data);
          })
          .addCase(AddtoCart.rejected, (state) => {
            state.isLoading = false;
          })
          .addCase(fetchCartItems.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(fetchCartItems.fulfilled, (state, action) => {
            (state.isLoading = false), (state.cartItems = action.payload.data);
          })
          .addCase(fetchCartItems.rejected, (state) => {
            state.isLoading = false;
          })
          .addCase(updateCart.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(updateCart.fulfilled, (state, action) => {
            (state.isLoading = false), (state.cartItems = action.payload.data);
          })
          .addCase(updateCart.rejected, (state) => {
            state.isLoading = false;
          })
          .addCase(deleteCart.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(deleteCart.fulfilled, (state, action) => {
            (state.isLoading = false), (state.cartItems = action.payload.data);
          })
          .addCase(deleteCart.rejected, (state) => {
            state.isLoading = false;
          });
    }
})

export default CartSlice.reducer