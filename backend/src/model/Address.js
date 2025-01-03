import mongoose from "mongoose";

const AddressSchema = mongoose.Schema({
    userId :String,
    address:String,
    city: String,
    phone:String,
    pincode:String
},{
    timestamps: true
})

const Address = mongoose.model("Address", AddressSchema)
export default Address