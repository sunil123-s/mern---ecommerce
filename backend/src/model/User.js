import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    requires: true,
    unique: true,
  },
  email: {
    type: String,
    requires: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    requires: true,
    trim: true,
  },
  role: {
    type: String,
    default: "user",
  },
});

const User = mongoose.model("User", UserSchema)
export default User