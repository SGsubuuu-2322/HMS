import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../config";
import { jwtDecode } from "jwt-decode";

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
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await axios.post("/registerMail", body, {
        headers: {
          Authorization: `Bearer ${token}`, // Set the authorization bearer token
        },
      });
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
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await axios.post("/user/register/otp/verify", body, {
        headers: {
          Authorization: `Bearer ${token}`, // Set the authorization bearer token
        },
      });
      if (!response) throw new Error("Failed to fetch");
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const logInUserAPI = createAsyncThunk(
  "user/login",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post("/user/login", body);
      if (!response) throw new Error("Failed to fetch");
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserDetails = createAsyncThunk(
  "get/user",
  async (body, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const { id } = jwtDecode(token);
      const response = await axios.get(`/user/details/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Set the authorization bearer token
        },
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUserDetails = createAsyncThunk(
  "update/user",
  async (body, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const { id } = jwtDecode(token);
      const response = await axios.put(`/user/profile/update/${id}`, body, {
        headers: {
          Authorization: `Bearer ${token}`, // Set the authorization bearer token
        },
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
