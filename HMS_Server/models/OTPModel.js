import mongoose from "mongoose";

const OTPSchema = new mongoose.Schema(
  {
    otp: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    usertype: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: "10m",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("OTP", OTPSchema);
