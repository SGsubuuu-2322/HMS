// import React from 'react'
import { ImEye } from "react-icons/im";
import { RiEyeCloseFill } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const PasswordChange = () => {
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword1: "",
    newPassword2: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const inputChangeHandler = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    // try {
    //   if (isFormValid()) {
    //     const response = await dispatch(addOutbreak(outbreak)).unwrap();

    //     if (response) {
    //       navigate("/user/dashboard", {
    //         state: {
    //           message: "Outbreak added successfully...",
    //         },
    //       });
    //     }
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const imageUrl =
    "https://plus.unsplash.com/premium_photo-1681843126728-04eab730febe?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return (
    <div className="w-full h-screen bg p-10 flex items-center justify-center">
      <ToastContainer />
      <div className="relative w-[60%] p-5 mt-16 shadow-lg shadow-black">
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-[3px]"
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
        <form
          onSubmit={submitHandler}
          className="relative z-10 w-full border-[3px] border-[#0077ff94] bg-[#ffffff88] rounded-md p-2 px-6"
        >
          <div className="relative w-full h-10 flex items-center justify-between py-1">
            <label className="text-lg font-alice font-bold">Old Password</label>
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter old password here..."
              name="oldPassword"
              value={password?.oldPassword}
              onChange={inputChangeHandler}
              className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm"
            />

            <div
              className="absolute right-0 cursor-pointer m-2 text-xl"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? <ImEye /> : <RiEyeCloseFill />}
            </div>
          </div>
          <div className="relative w-full h-10 flex items-center justify-between py-1">
            <label className="text-lg font-alice font-bold">New Password</label>
            <input
              type="password"
              name="newPassword1"
              placeholder="Enter new password here..."
              value={password?.newPassword1}
              onChange={inputChangeHandler}
              className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm"
            />
            <div
              className="absolute right-0 cursor-pointer m-2 text-xl"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? <ImEye /> : <RiEyeCloseFill />}
            </div>
          </div>
          <div className="relative w-full h-10 flex items-center justify-between py-1">
            <label className="text-lg font-alice font-bold">New Password</label>
            <input
              type="password"
              placeholder="Enter again new password here..."
              name="newPassword2"
              value={password?.newPassword2}
              onChange={inputChangeHandler}
              className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm"
            />
            <div
              className="absolute right-0 cursor-pointer m-2 text-xl"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? <ImEye /> : <RiEyeCloseFill />}
            </div>
          </div>

          <div className="w-full h-10 flex items-center justify-center py-1 mt-2">
            <Button>Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordChange;
