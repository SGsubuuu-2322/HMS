import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../config";

export const registerAPI = createAsyncThunk(
  "user/registration",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post("/user/register", body);
      if (!response) throw new Error("Failed to fetch");
      return response?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const mailerAPI = createAsyncThunk(
  "register/mail",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post("/registerMail", body);
      return response?.data;
      // console.log(body);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const registeredUserOtpVerificationAPI = createAsyncThunk(
  "otp/verification",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post("/user/register/otp/verify", body);
      if (!response) throw new Error("Failed to fetch");
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
