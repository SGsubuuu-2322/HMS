import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../config";

export const registerAPI = createAsyncThunk(
  "user/registration",
  async (body) => {
    try {
      const response = await axios.post("/user/register", body);
      return response?.data;
    } catch (error) {
      throw new error(error?.response?.data);
    }
  }
);
