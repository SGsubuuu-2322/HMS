import {
  mailerAPI,
  registerAPI,
  registeredUserOtpVerificationAPI,
} from "@/helper/API/user";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userType: "A",
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
        console.log(action.payload);
      })
      .addCase(registeredUserOtpVerificationAPI.rejected, (state, action) => {
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
