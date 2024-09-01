import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userType: "B",
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    refreshUserType: (state, action) => {
      state.userType = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(registerAPI.fulfilled, (state, action) => {
  //     action.payload.id = nanoid();
  //     action.payload.profileImg =
  //       "https://cdn3d.iconscout.com/3d/premium/thumb/user-6332708-5209354.png";
  //     state.allUsers = [...state.allUsers, action.payload];
  //     localStorage.setItem("allUsers", JSON.stringify(state.allUsers));
  //   });
  // },
});

export default userSlice.reducer;
export const {
  refreshLoggedInUser,
  refreshAllUsers,
  refreshUserType,
  deleteUser,
  updateUser,
} = userSlice.actions;
