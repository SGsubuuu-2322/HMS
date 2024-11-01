import {
  addDoctor,
  addOutbreak,
  getUserDetails,
  loggedOutUserOtpVerification,
  logInUserAPI,
  mailerAPI,
  registerAPI,
  registeredUserOtpVerificationAPI,
  searchUsername,
  updateUserDetails,
  updateUserPassword,
} from "@/helper/API/user";
import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

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
        // localStorage.removeItem("token");
        console.log(action.payload);
      })
      .addCase(registeredUserOtpVerificationAPI.rejected, (state, action) => {
        console.log(action.error);
      })
      .addCase(logInUserAPI.fulfilled, (state, action) => {
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
          profilePicture: action.payload.user?.profilePicture,
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
          profilePicture: action.payload.user?.profilePicture,
        };
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        console.log(action.error);
      })
      .addCase(updateUserDetails.fulfilled, (state, action) => {
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
          profilePicture: action.payload.user?.profilePicture,
        };
      })
      .addCase(updateUserDetails.rejected, (state, action) => {
        console.log(action.error);
      })
      .addCase(searchUsername.fulfilled, (state, action) => {
        localStorage.setItem("token", JSON.stringify(action.payload.token));
        // console.log(action.payload);
      })
      .addCase(searchUsername.rejected, (state, action) => {
        console.log(action.error);
      })
      .addCase(loggedOutUserOtpVerification.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(loggedOutUserOtpVerification.rejected, (state, action) => {
        console.log(action.error);
      })
      .addCase(updateUserPassword.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(updateUserPassword.rejected, (state, action) => {
        console.log(action.error);
      })
      .addCase(addDoctor.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(addDoctor.rejected, (state, action) => {
        console.log(action.error);
      })
      .addCase(addOutbreak.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(addOutbreak.rejected, (state, action) => {
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
