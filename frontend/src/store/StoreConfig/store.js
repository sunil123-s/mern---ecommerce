  import { configureStore } from "@reduxjs/toolkit"
  import adminProductReducer from "./../Slices/admin-slice/adminSlice.js"
  import publicProductReducer from "./../Slices/Public-slice/publicProductSlice.js"
  import CartItemsReducer from "./../Slices/Public-slice/cartSlice.js"
  import AddressReducer from "./../Slices/Public-slice/addressSlice.js"
  import ReviewReducer from "./../Slices/Public-slice/reviewSlice.js"

  const appstore = configureStore({
    reducer: {
      adminProduct: adminProductReducer,
      publicProducts: publicProductReducer,
      Cart: CartItemsReducer,
      Address:AddressReducer,
      review: ReviewReducer
    },
  }); 

  export default appstore