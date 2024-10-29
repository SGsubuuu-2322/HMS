import {
  getUserDetails,
  logInUserAPI,
  mailerAPI,
  registerAPI,
  registeredUserOtpVerificationAPI,
} from "@/helper/API/user";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userType: "A",
  user: {
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    role: "",
    email: "",
    phone: "",
    address: "",
  },
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    refreshUserType: (state, action) => {
      state.userType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerAPI.fulfilled, (state, action) => {
        const token = action?.payload?.token;
        localStorage.setItem("token", JSON.stringify(token));
      })
      .addCase(registerAPI.rejected, (state, action) => {
        console.log(action.error.message);
      })
      .addCase(mailerAPI.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(mailerAPI.rejected, (state, action) => {
        console.log(action.error.message);
      })
      .addCase(registeredUserOtpVerificationAPI.fulfilled, (state, action) => {
        localStorage.removeItem("token");
      })
      .addCase(registeredUserOtpVerificationAPI.rejected, (state, action) => {
        console.log(action.error);
      })
      .addCase(logInUserAPI.fulfilled, (state, action) => {
        console.log(action.payload.user.username.split(" "));
        const token = action?.payload?.token;
        if (token) {
          localStorage.setItem("token", JSON.stringify(token));
        }
        state.user = {
          ...state.user,
          firstName: action.payload.user?.username.split(" ")[0],
          middleName:
            action.payload.user?.username.split(" ").length == 2
              ? ""
              : action.payload.user?.username.split(" ")[1],
          lastName:
            action.payload.user?.username.split(" ").length == 3
              ? action.payload.user?.username.split(" ")[2]
              : action.payload.user?.username.split(" ")[1],
          gender: action.payload.user?.gender,
          role: action.payload.user?.usertype == "A" ? "Admin" : "Doctor",
          email: action.payload.user?.email,
          phone: action.payload.user?.phone,
          address: action.payload.user?.address,
        };
      })
      .addCase(logInUserAPI.rejected, (state, action) => {
        console.log(action.error);
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.user = {
          ...state.user,
          firstName: action.payload.user?.username.split(" ")[0],
          middleName:
            action.payload.user?.username.split(" ").length == 2
              ? ""
              : action.payload.user?.username.split(" ")[1],
          lastName:
            action.payload.user?.username.split(" ").length == 3
              ? action.payload.user?.username.split(" ")[2]
              : action.payload.user?.username.split(" ")[1],
          gender: action.payload.user?.gender,
          role: action.payload.user?.usertype == "A" ? "Admin" : "Doctor",
          email: action.payload.user?.email,
          phone: action.payload.user?.phone,
          address: action.payload.user?.address,
        };
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        console.log(action.error);
      });
  },
});

export default userSlice.reducer;
export const {
  refreshLoggedInUser,
  refreshAllUsers,
  refreshUserType,
  deleteUser,
  updateUser,
} = userSlice.actions;
