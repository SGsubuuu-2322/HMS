import avatar from "../../assets/profile.png";
import {
  SquareUser,
  BookUser,
  UserRoundPlus,
  AlarmClockCheck,
  ShieldAlert,
  ShieldQuestion,
  Settings,
  Wallet,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavLink, useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useState } from "react";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/user/dashboard",
    icon: Wallet,
  },
  {
    title: "Profile",
    url: "/user/profile",
    icon: SquareUser,
  },
  {
    title: "Patient's Book",
    url: "/user/patients-book",
    icon: BookUser,
  },
  {
    title: "Add Doctor",
    url: "/user/add-doctor",
    icon: UserRoundPlus,
  },
  {
    title: "Doctor's Record",
    url: "/user/doctors-record",
    icon: BookUser,
  },
  {
    title: "Appointments",
    url: "/user/appointments",
    icon: AlarmClockCheck,
  },
  {
    title: "Add Outbreak",
    url: "/user/add-outbreak",
    icon: ShieldAlert,
  },
  {
    title: "Likely Outbreaks",
    url: "/user/likely-outbreaks",
    icon: ShieldQuestion,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  const location = useLocation();
  // const [route, setRoute] = useState("/user/dashboard");

  // useEffect(() => {
  //   setRoute(location.pathname);
  //   console.log(route);
  // }, [location]);

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="py-10">
            <div className="flex justify-center items-center">
              <span>
                <img
                  src={avatar}
                  alt="profile Img"
                  className="border-2 border-gray-100 w-[50px] h-[50px] object-cover rounded-full shadow-lg cursor-pointer"
                />
              </span>
              <span className="ml-2">
                <h2 className="font-semibold text-lg text-black">Hritik</h2>
                <h2 className="text-sm font-medium">Admin</h2>
              </span>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={item.url == location.pathname ? "true" : "false"}
                  >
                    <NavLink
                      to={item.url}
                      className="hover:font-medium hover:text-[#0077ff94]"
                    >
                      <span className="text-xl">
                        <item.icon />
                      </span>
                      <span className="text-base">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
