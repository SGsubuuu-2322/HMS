// import React from 'react'

import { refreshUserType } from "@/store/reducers/UserReducer";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";

const PublicNav = () => {
  const Dispatch = useDispatch();
  const { userType } = useSelector((state) => state.user);
  const { pathname } = useLocation();
  // console.log(userType);
  const handleOptionChange = (e) => {
    Dispatch(refreshUserType(e.target.value));
  };
  return (
    <nav className="w-full h-20 bg-[#65adff] flex justify-between items-center px-5">
      <div className="image-container hover:scale-110 w-40 h-20 rounded-md overflow-hidden">
        <img
          src="https://hcmsllc.com/wp-content/uploads/2022/11/HMS-Logo-copy.png"
          alt="logo"
          className="w-full h-full object-contain"
        />
      </div>

      {pathname === "/register" ? (
        <div className="button-holder h-[90%] w-40 bg-secondarylite rounded-md flex justify-around items-center  border-2 overflow-hidden">
          <div className="admin-container h-20 w-10 flex flex-col justify-center gap-1">
            <div className="image h-10 w-10 overflow-hidden rounded-md">
              <img
                src="https://uxwing.com/wp-content/themes/uxwing/download/editing-user-action/user-preferences-icon.png"
                alt="admin-image"
                className="object-cover bg-white"
              />
            </div>
            {/* This radio input is checked after changing of state value from central redux store */}
            <input
              type="radio"
              name="admin"
              value="A"
              onChange={handleOptionChange}
              checked={userType === "A"}
            />
          </div>
          <div className="admin-container h-20 w-10 flex flex-col justify-center gap-1">
            <div className="image h-10 w-10 overflow-hidden rounded-md">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnRq8BM8VIsSVPCy3ragERgTK892-oYfhx_Q&s"
                alt="admin-image"
                className="object-cover "
              />
            </div>
            <input
              type="radio"
              name="doctor"
              value="D"
              onChange={handleOptionChange}
              checked={userType === "D"}
            />
          </div>
          <div className="admin-container h-20 w-10 flex flex-col justify-center gap-1">
            <div className="image h-10 w-10 overflow-hidden rounded-md">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx4WPMRwUZHH4CIYhmmhdmOPjBP03sSfRshQ&s"
                alt="admin-image"
                className="object-cover "
              />
            </div>
            <input
              type="radio"
              name="patient"
              value="P"
              onChange={handleOptionChange}
              checked={userType === "P"}
            />
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className="nav-content w-48">
        <ul className="flex justify-between h-10">
          <NavLink
            to="/login"
            className={(e) =>
              `rounded-lg bg-[#005CC8] border-4 hover:border-white  border-black px-3  text-xl font-semibold text-black hover:text-white hover:underline hover:underline-offset-2 ${
                e.isActive &&
                "border-slate-100 text-white shadow-md shadow-white "
              }`
            }
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className={(e) =>
              `rounded-lg bg-[#005CC8] border-4 hover:border-white  border-black px-3  text-xl font-semibold text-black hover:text-white hover:underline hover:underline-offset-2 ${
                e.isActive &&
                "border-slate-100 text-white shadow-md shadow-white "
              }`
            }
          >
            Register
          </NavLink>
        </ul>
      </div>
    </nav>
  );
};

export default PublicNav;
