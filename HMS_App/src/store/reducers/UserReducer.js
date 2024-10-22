import { registerAPI } from "@/helper/API/user";
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
        localStorage.setItem("token", token);
      })
      .addCase(registerAPI.rejected, (state, action) => {
        console.log(action.error.message);
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
