// import React from "react";
import { Button } from "@/components/ui/button";
import avatar from "../../assets/profile.png";

const Profile = () => {
  const imageUrl =
    "https://plus.unsplash.com/premium_photo-1681843126728-04eab730febe?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return (
    <div className="w-full h-screen bg p-10 flex items-center justify-center">
      <div className="relative w-[60%] p-5 mt-10">
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-[3px]"
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
        <div className="relative z-10 w-full border-[3px] border-[#0077ff94] bg-[#ffffff88] rounded-md p-2 px-6">
          <div className="w-full h-20 flex justify-center items-center">
            <span>
              <img
                src={avatar}
                alt="profile Img"
                className="border-2 border-gray-100 w-[66px] h-[66px] object-cover rounded-full shadow-lg cursor-pointer"
              />
            </span>
          </div>
          <div className="w-full h-10 flex items-center justify-between py-1">
            <span>First Name</span>
            <span className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm"></span>
          </div>
          <div className="w-full h-10 flex items-center justify-between py-1">
            <span>Middle Name</span>
            <span className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm"></span>
          </div>
          <div className="w-full h-10 flex items-center justify-between py-1">
            <span>Last Name</span>
            <span className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm"></span>
          </div>
          <div className="w-full h-10 flex items-center justify-between py-1">
            <span>Role</span>
            <span className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm"></span>
          </div>
          <div className="w-full h-10 flex items-center justify-between py-1">
            <span>Email</span>
            <span className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm"></span>
          </div>
          <div className="w-full h-10 flex items-center justify-between py-1">
            <span>Phone</span>
            <span className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm"></span>
          </div>
          <div className="w-full h-10 flex items-center justify-between py-1">
            <span>Address</span>
            <span className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm"></span>
          </div>
          <div className="w-full h-10 flex items-center justify-between py-1">
            <span>Address</span>
            <span className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm"></span>
          </div>
          <div className="w-full h-10 flex items-center justify-center py-1 mt-2">
            <Button>Update</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
