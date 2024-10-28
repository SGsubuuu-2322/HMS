// import React from 'react'
import { Skeleton } from "@/components/ui/skeleton";

const Dashboard = () => {
  return (
    <div className="z-0 w-full h-screen bg p-10 flex items-center justify-center">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3 w-[80%]">
        {/* <Skeleton className="aspect-video rounded-xl" />{" "} */}
        <div className="aspect-video border-2 border-[#0077ff94] rounded-lg flex flex-col items-center justify-around">
          <h1 className="font-bold text-[#0077ff94]">Outbreaks</h1>
          <div className="text-4xl text-red-600 font-bold">1</div>
          <p>View ➡️</p>
        </div>
        <div className="aspect-video border-2 border-[#0077ff94] rounded-lg flex flex-col items-center justify-around">
          <h1 className="font-bold text-[#0077ff94]">Doctors</h1>
          <div className="text-4xl text-red-600 font-bold">1</div>
          <p>View ➡️</p>
        </div>
        <div className="aspect-video border-2 border-[#0077ff94] rounded-lg flex flex-col items-center justify-around">
          <h1 className="font-bold text-[#0077ff94]">Patients</h1>
          <div className="text-4xl text-red-600 font-bold">1</div>
          <p>View ➡️</p>
        </div>
        <div className="aspect-video border-2 border-[#0077ff94] rounded-lg flex flex-col items-center justify-around">
          <h1 className="font-bold text-[#0077ff94]">Appointments</h1>
          <div className="text-4xl text-red-600 font-bold">1</div>
          <p>View ➡️</p>
        </div>
        <div className="aspect-video border-2 border-[#0077ff94] rounded-lg flex flex-col items-center justify-around">
          <h1 className="font-bold text-[#0077ff94]">Profile Updation</h1>
          <div className="text-4xl text-red-600 font-bold">1</div>
          <p>View ➡️</p>
        </div>
        <Skeleton className="aspect-video rounded-xl" />{" "}
      </div>
    </div>
  );
};

export default Dashboard;
