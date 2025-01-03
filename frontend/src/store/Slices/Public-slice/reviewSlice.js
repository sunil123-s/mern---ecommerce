import { AddReview, fetchReview } from "@/store/Thunk/Publics/ReviewThunk"
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoading: false,
    productReview : []
}
const ReviewSlice = createSlice({
    name:"review",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(AddReview.pending,(state) => {
            state.isLoading = true
        })
        .addCase(AddReview.fulfilled,(state,action) => {
            state.isLoading = false
            state.productReview = action.payload.data
        })
        .addCase(AddReview.rejected,(state) => {
            state.isLoading = false
        })
        builder
          .addCase(fetchReview.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(fetchReview.fulfilled, (state, action) => {
            state.isLoading = false;
            state.productReview = action.payload.data;
          })
          .addCase(fetchReview.rejected, (state) => {
            state.isLoading = false;
          });
    }
})

export default ReviewSlice.reducer;