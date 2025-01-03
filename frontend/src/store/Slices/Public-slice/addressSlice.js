import { AddNewAddress, fetchAddress } from "@/store/Thunk/Publics/AddressThunk";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addressList: [],
  isLoading: false,
  selectedAddress: null,
};

const AddressSlice = createSlice({
  name: "Address",
  initialState,
  reducers: {
    setselectedAddress: (state, action) => {
        state.selectedAddress = action.payload;
    }
  },
  extraReducers: (builders) => {
    builders
      .addCase(AddNewAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AddNewAddress.fulfilled, (state, action) => {
        state.addressList = action.payload.data;
        state.isLoading = false;
      })
      .addCase(AddNewAddress.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.addressList = action.payload.data;
        state.isLoading = false;
      })
      .addCase(fetchAddress.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      });
  },
});

export const { setselectedAddress } = AddressSlice.actions;
export default AddressSlice.reducer