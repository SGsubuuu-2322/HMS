// import React from 'react'
import { useEffect, useState } from "react";
import avatar from "../../assets/profile.png";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserDetails, updateUserDetails } from "@/helper/API/user";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import convertToBase64 from "@/helper/convert";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [file, setFile] = useState();

  const [userDetails, setuserDetails] = useState({
    firstName: user?.firstName || "",
    middleName: user?.middleName || "",
    lastName: user?.lastName || "",
    gender: user?.gender || "",
    role: user?.role || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    profilePicture: user?.profilePicture || "",
  });

  useEffect(() => {
    async function fetchDetails() {
      if (!user.firstName) {
        await dispatch(getUserDetails());
      }
    }
    fetchDetails();
  }, [dispatch, user]);

  // Separate effect to set userDetails after user is updated
  useEffect(() => {
    if (user.firstName) {
      setuserDetails({
        firstName: user?.firstName || "",
        middleName: user?.middleName || "",
        lastName: user?.lastName || "",
        gender: user?.gender || "",
        role: user?.role || "",
        email: user?.email || "",
        phone: user?.phone || "",
        address: user?.address || "",
        profilePicture: user?.profilePicture || "",
      });
    }
  }, [user]);

  /** formik doensn't support file upload so we need to create this handler */
  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  const inputChangeHandler = (e) => {
    setuserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };
  const selectChangeHandler = (e) => {
    setuserDetails({ ...userDetails, gender: e });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      let username =
        userDetails.firstName +
        " " +
        userDetails.middleName +
        " " +
        userDetails.lastName;

      await dispatch(
        updateUserDetails({
          username,
          email: userDetails.email,
          phone: userDetails.phone,
          address: userDetails.address,
          gender: userDetails.gender,
          profilePicture: file || userDetails?.profilePicture || "",
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  const imageUrl =
    "https://plus.unsplash.com/premium_photo-1681843126728-04eab730febe?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return (
    <div className="w-full h-screen bg p-10 flex items-center justify-center">
      <div className="relative w-[60%] p-5 mt-16">
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-[3px]"
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
        <form
          onSubmit={submitHandler}
          className="relative z-10 w-full border-[3px] border-[#0077ff94] bg-[#ffffff88] rounded-md p-2 px-6"
        >
          <div className="w-full h-20 flex justify-center items-center">
            <div>
              <label htmlFor="profile">
                <img
                  src={userDetails?.profilePicture || file || avatar}
                  className="border-2 border-gray-100 w-[66px] h-[66px] object-cover rounded-full shadow-lg cursor-pointer"
                  alt="avatar"
                />
              </label>

              <input
                className="hidden"
                onChange={onUpload}
                type="file"
                id="profile"
                name="profile"
              />
            </div>
          </div>
          <div className="w-full h-10 flex items-center justify-between py-1">
            <label className="text-lg font-alice font-bold">First Name</label>
            <input
              type="text"
              placeholder="Enter your first name..."
              name="firstName"
              value={userDetails?.firstName}
              onChange={inputChangeHandler}
              className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm"
            />
          </div>
          <div className="w-full h-10 flex items-center justify-between py-1">
            <label className="text-lg font-alice font-bold">Middle Name</label>
            <input
              type="text"
              placeholder="Enter your middle name..."
              name="middleName"
              value={userDetails?.middleName}
              onChange={inputChangeHandler}
              className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm"
            />
          </div>
          <div className="w-full h-10 flex items-center justify-between py-1">
            <label className="text-lg font-alice font-bold">Last Name</label>
            <input
              type="text"
              placeholder="Enter your last name..."
              name="lastName"
              value={userDetails?.lastName}
              onChange={inputChangeHandler}
              className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm"
            />
          </div>
          <div className="w-full h-10 flex items-center justify-between py-1">
            <label className="text-lg font-alice font-bold">Gender</label>
            <div className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm overflow-hidden">
              <Select
                onValueChange={selectChangeHandler}
                defaultValue={userDetails?.gender || ""}
              >
                <SelectTrigger className="pl-0 text-base h-full rounded-none border-none bg-[#d0cdcdb6]">
                  <SelectValue placeholder="Select your gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Others">Others</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="w-full h-10 flex items-center justify-between py-1">
            <label className="text-lg font-alice font-bold">Role</label>
            <input
              readOnly
              type="text"
              placeholder="Enter your role..."
              name="role"
              value={userDetails?.role}
              onChange={inputChangeHandler}
              className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm"
            />
          </div>
          <div className="w-full h-10 flex items-center justify-between py-1">
            <label className="text-lg font-alice font-bold">Email</label>
            <input
              type="email"
              placeholder="Enter your email..."
              name="email"
              value={userDetails?.email}
              onChange={inputChangeHandler}
              className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm"
            />
          </div>
          <div className="w-full h-10 flex items-center justify-between py-1">
            <label className="text-lg font-alice font-bold">Phone</label>
            <input
              type="text"
              placeholder="Enter your phone number..."
              name="phone"
              value={userDetails?.phone}
              onChange={inputChangeHandler}
              className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm"
            />
          </div>
          <div className="w-full h-10 flex items-center justify-between py-1">
            <label className="text-lg font-alice font-bold">Address</label>
            <input
              type="text"
              placeholder="Enter your address..."
              name="address"
              value={userDetails?.address}
              onChange={inputChangeHandler}
              className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm"
            />
          </div>
          <div className="w-full h-10 flex items-center justify-center py-1 mt-2">
            <Button>Update</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
