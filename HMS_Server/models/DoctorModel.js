import mongoose, { mongo } from "mongoose";

const DoctorSchema = new mongoose.Schema(
  {
    username: {
      type: String,
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
      required: true,
    },
    role: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      required: true,
    },
    gender: {
      type: String,
    },
    phone: {
      type: Number,
    },
    profilePicture: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Doctor", DoctorSchema);