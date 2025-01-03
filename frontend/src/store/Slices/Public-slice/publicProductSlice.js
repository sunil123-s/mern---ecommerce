import { createSlice } from "@reduxjs/toolkit"
import { fetchProductDetails, fetchPublicProduct } from "@/store/Thunk/Publics/PublicProduct"
const initialState = {
  products:[],
  productDetails:null,
  isLoading:false
}

const publicProductSlice = createSlice({
  name:"publicProducts",
  initialState,
  reducers:{
    setproductDetails : (state) => {
     state.productDetails = null
    }
  },
  extraReducers:(builders) => {
    builders
      .addCase(fetchPublicProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPublicProduct.fulfilled, (state, action) => {
        state.products = action.payload.data;
        state.isLoading = false;
      })
      .addCase(fetchPublicProduct.rejected, (state) => {
        state.isLoading = false;
        state.products = [];
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.productDetails = action.payload.data;
        state.isLoading = false;
      })
      .addCase(fetchProductDetails.rejected, (state) => {
        state.isLoading = false;
        state.productDetails = null;
      });
  }
})

export const {setproductDetails} = publicProductSlice.actions
export default publicProductSlice.reducer;