import Dashboard from "@/Pages/auth/Dashboard";
import OTP_Verification from "@/Pages/auth/OTP_Verification";

export const AuthRoutes = [
  {
    path: "/register/otp-verify",
    element: OTP_Verification,
  },
  {
    path: "/user/dashboard",
    element: Dashboard,
  },
];
