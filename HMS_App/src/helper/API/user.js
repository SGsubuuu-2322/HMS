import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../config";

export const registerAPI = createAsyncThunk(
  "user/registration",
  async (body) => {
    try {
      const response = await axios.post("/user/register", body);
      return response.message;
    } catch (error) {
      throw new error(error?.response?.data);
    }
  }
);
