// import React from 'react'
import { Skeleton } from "@/components/ui/skeleton";

const Dashboard = () => {
  return (
    <div className="w-full h-screen bg p-10 border-2 border-black">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <Skeleton className="aspect-video rounded-xl" />{" "}
        {/* <div className="aspect-video rounded-xl bg-muted/50" /> */}
        <Skeleton className="aspect-video rounded-xl" />{" "}
        {/* <div className="aspect-video rounded-xl bg-muted/50" /> */}
        <Skeleton className="aspect-video rounded-xl" />{" "}
        <Skeleton className="aspect-video rounded-xl" />{" "}
        <Skeleton className="aspect-video rounded-xl" />{" "}
        <Skeleton className="aspect-video rounded-xl" />{" "}
        <Skeleton className="aspect-video rounded-xl" />{" "}
        <Skeleton className="aspect-video rounded-xl" />{" "}
        <Skeleton className="aspect-video rounded-xl" />{" "}
        <Skeleton className="aspect-video rounded-xl" />{" "}
        {/* <div className="aspect-video rounded-xl bg-muted/50" /> */}
      </div>
    </div>
  );
};

export default Dashboard;
