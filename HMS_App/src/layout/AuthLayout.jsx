// import React from 'react'
import { AppSidebar } from "@/components/custom/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
const AuthLayout = ({ children }) => {
  return (
    <div className="h-screen overflow-hidden">
      {/* <AuthNav /> */}
      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
};

export default AuthLayout;
