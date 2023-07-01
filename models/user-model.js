import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  socketID: { type: String, default: null },
  username: { type: String, required: [true, "name is required"], trim: true },
  email: {
    type: String,
    required: [true, "email is required"],
    trim: true,
    unique: [true, "user already exists"],
  },
  password: { type: String, required: [true, "password is required"] },
  otp: { type: Number },
  verified: { type: Boolean, default: false },
  timestamp: { type: Number, default: new Date().getTime() },
});

const User = mongoose.model("users", userSchema);
export default User;
