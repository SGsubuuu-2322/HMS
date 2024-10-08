// import React from 'react'

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useSelector } from "react-redux";
// import { registerAPI } from "../Api/Auth";
import { Link, useNavigate } from "react-router-dom";

const Register_Form = () => {
  const { userType } = useSelector((state) => state.user);
  const Navigate = useNavigate();
  // const Dispatch = useDispatch();
  const [user, setUser] = useState({
    name: "",
    email: "",
    pin: "",
    password1: "",
    password2: "",
  });

  const imageUrl =
    "https://img.freepik.com/premium-photo/hospital-hallway-unfocused-background_786878-6945.jpg?size=626&ext=jpg&ga=GA1.1.1289161518.1725302723&semt=ais_hybrid";

  const inputChangeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(user);

    if (userType === "A") {
      if (
        user.name === "" ||
        user.email === "" ||
        user.pin === "" ||
        user.password1 === "" ||
        user.password2 === ""
      ) {
        alert("Please enter all the fields...");
        return;
      }

      if (user.pin !== "200114") {
        alert("Please enter your correct admin pin...");
        return;
      }
    } else {
      if (
        user.name === "" ||
        user.email === "" ||
        user.password1 === "" ||
        user.password2 === ""
      ) {
        alert("Please enter all the fields...");
        return;
      }
    }

    if (
      !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/.test(
        user.password1
      )
    ) {
      alert(
        "Please enter a valid password with minimum 8 to 10 characters with minimum 1 uppercase, lowercase, digit, and special character in it..."
      );
      return;
    }

    // if (allUsers.filter((u) => u.email == user.email).length > 0) {
    //   alert("This email is already registered, Try with the new one...");
    //   return;
    // }

    if (user.password1 !== user.password2) {
      alert("Passwords aren't matching, Please enter again...");
      return;
    }

    if (!/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/.test(user.email)) {
      alert("Please enter a valid email address...");
      return;
    }

    // Dispatch(
    //   registerAPI({
    //     name: user.name,
    //     email: user.email,
    //     password: user.password1,
    //     userType: userType,
    //   })
    // );
    Navigate("/login");
  };

  return (
    <div
      className="relative w-full h-[88%] flex flex-col items-center justify-center  bg-no-repeat bg-cover bg-center"
      // style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <form
        onSubmit={handleSubmit}
        className="relative z-10 shadow-lg shadow-[#005CC8] w-1/4 border-[#005CC8] border-4 rounded-md mx-auto  px-2 py-5  "
      >
        <div className="w-full flex justify-center">
          <h1 className="shadow-lg shadow-[#005CC8] text-xl font-bold text-black underline border-4 border-[#3c97ff] bg-[#005CC8] px-2 py-1 rounded-full text-white hover:text-black">
            {userType === "A"
              ? "Admin-"
              : userType === "D"
              ? "Doctor-"
              : "Patient-"}
            Register-Form
          </h1>
        </div>
        <div className="input-container flex flex-col">
          <label htmlFor="name" className="text-xl font-bold text-black">
            Name:{" "}
          </label>
          <input
            type="text"
            placeholder="Enter your name..."
            name="name"
            value={user.name}
            onChange={inputChangeHandler}
            className="bg-[#0077ff94] font-semibold px-2 placeholder-[#005CC8] text-white focus:outline-none"
          />
        </div>
        <div className="input-container flex flex-col">
          <label htmlFor="name" className="text-xl font-bold text-black">
            Email:{" "}
          </label>
          <input
            type="email"
            placeholder="Enter your email..."
            name="email"
            value={user.email}
            onChange={inputChangeHandler}
            className="bg-[#0077ff94] px-2 font-semibold placeholder-[#005CC8] text-white focus:outline-none"
          />
        </div>
        {userType === "A" ? (
          <div className="input-container flex flex-col">
            <label htmlFor="name" className="text-xl font-bold text-black">
              Admin-Pin:{" "}
            </label>
            <input
              type="number"
              placeholder="Enter your admin pin..."
              name="pin"
              value={user.pin}
              onChange={inputChangeHandler}
              className="bg-[#0077ff94] px-2 font-semibold placeholder-[#005CC8] text-white focus:outline-none"
            />
          </div>
        ) : (
          ""
        )}

        <div className="input-container flex flex-col">
          <label htmlFor="name" className="text-xl font-bold text-black">
            Password:{" "}
          </label>
          <input
            type="password"
            placeholder="Enter your password..."
            name="password1"
            value={user.password1}
            onChange={inputChangeHandler}
            className="bg-[#0077ff94] px-2 font-semibold placeholder-[#005CC8] text-white focus:outline-none"
          />
        </div>
        <div className="input-container flex flex-col">
          <label htmlFor="name" className="text-xl font-bold text-black">
            Re-Enter Password:{" "}
          </label>
          <input
            type="password"
            placeholder="Re-enter your password..."
            name="password2"
            value={user.password2}
            onChange={inputChangeHandler}
            className="bg-[#0077ff94] px-2 font-semibold placeholder-[#005CC8] text-white focus:outline-none"
          />
        </div>
        <div className="input-container flex flex-col">
          <label htmlFor="name" className="text-xl font-bold text-black">
            User-Type:{" "}
          </label>
          <input
            type="text"
            placeholder="Re-enter your password..."
            name="userType"
            value={
              userType === "A"
                ? "Admin"
                : userType === "D"
                ? "Doctor"
                : "Patient"
            }
            readOnly
            disabled
            onChange={inputChangeHandler}
            className="bg-[#0077ff94] px-2 font-semibold placeholder-[#005CC8] text-white focus:outline-none"
          />
        </div>

        <div className="flex items-center justify-center mt-4">
          {/* <button className="bg-secondary text-white active:scale-110 rounded-3xl hover:bg-white hover:text-black px-3 py-2 border-2 border-secondary text-xl font-bold">
            Register
          </button> */}
          <Button>Register</Button>
        </div>
      </form>
      <Link
        to="/login"
        className="relative z-10 text-primary text-sm font-semibold hover:text-black hover:underline hover"
      >
        Already have an account ? Login then...
      </Link>
    </div>
  );
};

export default Register_Form;
