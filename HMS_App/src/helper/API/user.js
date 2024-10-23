import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../config";

export const registerAPI = createAsyncThunk(
  "user/registration",
  async (body) => {
    try {
      const response = await axios.post("/user/register", body);
      console.log(response);
      if (!response) throw new Error("Failed to fetch");
      return response?.data;
    } catch (error) {
      console.log(error);
      throw new error(error?.message);
    }
  }
);

export const mailerAPI = createAsyncThunk("register/mail", async (body) => {
  try {
    const response = await axios.post("/registerMail", body);
    return response?.data;
    // console.log(body);
  } catch (error) {
    throw new error(error?.response?.data);
  }
});
export const otpVerificationAPI = createAsyncThunk(
  "otp/verification",
  async (body) => {
    try {
      console.log(body);
    } catch (error) {
      throw new error(error?.response?.data);
    }
  }
);
