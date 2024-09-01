// import React from 'react'

import PublicNav from "@/components/ui/PublicNav";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <>
      <PublicNav />
      <Outlet />
    </>
  );
};

export default PublicLayout;
