// import React from 'react'

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Login_Form = () => {
  const Dispatch = useDispatch();
  const Navigate = useNavigate();
  const { allUsers } = useSelector((state) => state.user);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const imageUrl =
    "https://img.freepik.com/premium-photo/hospital-hallway-unfocused-background_786878-6945.jpg?size=626&ext=jpg&ga=GA1.1.1289161518.1725302723&semt=ais_hybrid";

  const inputChangeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(allUsers);
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (allUsers.length != 0) {
      const validUser = allUsers.filter((u) => u.email == user.username)[0];
      if (validUser) {
        if (validUser.password == user.password) {
          if (loggedInUser) {
            localStorage.removeItem("loggedInUser");
            localStorage.setItem("loggedInUser", JSON.stringify(validUser));
            Dispatch(refreshLoggedInUser());
          } else {
            localStorage.setItem("loggedInUser", JSON.stringify(validUser));
            Dispatch(refreshLoggedInUser());
          }
          Navigate("/");
        } else {
          alert("Please enter a valid username and password1");
          return;
        }
      } else {
        alert("Please enter a valid username and password2");
        return;
      }
    } else {
      alert("Please register yourself first...");
      Navigate("/register");
    }
  };

  return (
    <div
      className="relative w-full h-[88%] flex flex-col items-center justify-center"
      // style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 shadow-lg shadow-[#005CC8] w-1/4 border-[#005CC8] border-4 rounded-md mx-auto px-2 py-5 "
      >
        <div className="w-full flex justify-center">
          <h1 className="shadow-lg shadow-[#005CC8] text-xl font-bold text-black underline border-4 border-[#3c97ff] bg-[#005CC8] px-2 py-1 rounded-full text-white hover:text-black">
            Login-Form
          </h1>
        </div>
        <div className="input-container flex flex-col">
          <label htmlFor="name" className="text-xl font-bold text-black">
            Username:{" "}
          </label>
          <input
            type="email"
            placeholder="Enter your email..."
            name="username"
            value={user.username}
            onChange={inputChangeHandler}
            className="bg-[#0077ff94] px-2 font-semibold placeholder-[#005CC8] text-white focus:outline-none"
          />
        </div>
        <div className="input-container flex flex-col">
          <label htmlFor="name" className="text-xl font-bold text-black">
            Password:{" "}
          </label>
          <div className="relative flex">
            <input
              type="password"
              placeholder="Enter your password..."
              name="password"
              value={user.password}
              onChange={inputChangeHandler}
              className="w-full bg-[#0077ff94] px-2 font-semibold placeholder-[#005CC8] text-white focus:outline-none"
            />
            <div
              className="absolute right-0 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? "🤨" : "😎"}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center mt-4">
          {/* <button className="hover:bg-white hover:border-secondary active:scale-110 hover:text-black rounded-3xl px-5 py-1 border-2 bg-secondary text-white text-xl font-bold">
            Login
          </button> */}
          <Button>Login</Button>
        </div>
      </form>
      <Link
        to="/register"
        className="relative z-10 text-primary text-sm font-semibold hover:text-black hover:underline hover"
      >
        Not have an account ? Register then...
      </Link>
    </div>
  );
};

export default Login_Form;
