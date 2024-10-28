// import React from 'react'
import { Skeleton } from "@/components/ui/skeleton";

const Dashboard = () => {
  return (
    <div className="z-0 w-full h-screen bg p-10 flex items-center justify-center">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3 w-[90%]">
        <Skeleton className="aspect-video rounded-xl" />{" "}
        <Skeleton className="aspect-video rounded-xl" />{" "}
        <Skeleton className="aspect-video rounded-xl" />{" "}
        <Skeleton className="aspect-video rounded-xl" />{" "}
        <Skeleton className="aspect-video rounded-xl" />{" "}
      </div>
    </div>
  );
};

export default Dashboard;
