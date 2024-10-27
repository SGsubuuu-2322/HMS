// import React from 'react'
import { AppSidebar } from "@/components/custom/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
const AuthLayout = ({ children }) => {
  return (
    <div className="w-full h-screen overflow-hidden">
      {/* <AuthNav /> */}
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full h-screen overflow-y-auto">
          <div className="flex">
            <SidebarTrigger />
            <h1>Dashboard</h1>
          </div>
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
};

export default AuthLayout;
