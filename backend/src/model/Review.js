import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
     productId : String,
     userId : String,
     name : String,
     reviewMessage : String,
},{
    timestamps : true
})

const Review = mongoose.model("Review", ReviewSchema)
export default Review