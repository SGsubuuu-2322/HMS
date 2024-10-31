// import React from 'react'
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Dashboard = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if a message was passed via navigate
    if (location?.state?.message) {
      toast.success(location.state.message);
    }
  }, [location]);

  const imageUrl =
    "https://plus.unsplash.com/premium_photo-1681843126728-04eab730febe?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return (
    <div className="w-full h-screen bg p-10 flex items-center justify-center">
      <ToastContainer />
      <div className="relative w-[80%] p-5 shadow-lg shadow-black">
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-[3px]"
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
        <div className="relative z-10 grid auto-rows-min gap-4 md:grid-cols-3 w-full">
          {/* <Skeleton className="aspect-video rounded-xl" />{" "} */}
          <div className="bg-[#ffffff88] aspect-video border-2 border-[#0077ff94] rounded-lg flex flex-col items-center justify-around">
            <h1 className="font-bold text-[#0077ff94]">Outbreaks</h1>
            <div className="text-4xl text-red-600 font-bold">1</div>
            <p>View ➡️</p>
          </div>
          <div className="bg-[#ffffff88] aspect-video border-2 border-[#0077ff94] rounded-lg flex flex-col items-center justify-around">
            <h1 className="font-bold text-[#0077ff94]">Doctors</h1>
            <div className="text-4xl text-red-600 font-bold">1</div>
            <p>View ➡️</p>
          </div>
          <div className="bg-[#ffffff88] aspect-video border-2 border-[#0077ff94] rounded-lg flex flex-col items-center justify-around">
            <h1 className="font-bold text-[#0077ff94]">Patients</h1>
            <div className="text-4xl text-red-600 font-bold">1</div>
            <p>View ➡️</p>
          </div>
          <div className="bg-[#ffffff88] aspect-video border-2 border-[#0077ff94] rounded-lg flex flex-col items-center justify-around">
            <h1 className="font-bold text-[#0077ff94]">Appointments</h1>
            <div className="text-4xl text-red-600 font-bold">1</div>
            <p>View ➡️</p>
          </div>
          <div className="bg-[#ffffff88] aspect-video border-2 border-[#0077ff94] rounded-lg flex flex-col items-center justify-around">
            <h1 className="font-bold text-[#0077ff94]">Profile Updation</h1>
            <div className="text-4xl text-red-600 font-bold">1</div>
            <p>View ➡️</p>
          </div>
          <Skeleton className="aspect-video rounded-xl" />{" "}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
