import AddDoctors from "@/Pages/auth/AddDoctors";
import AddOutbreak from "@/Pages/auth/AddOutbreak";
import Appointment from "@/Pages/auth/Appointment";
import Dashboard from "@/Pages/auth/Dashboard";
import DoctorsRecord from "@/Pages/auth/DoctorsRecord";
import LikelyOutbreak from "@/Pages/auth/LikelyOutbreak";
import OTP_Verification from "@/Pages/auth/OTP_Verification";
import PatientBook from "@/Pages/auth/PatientBook";
import Profile from "@/Pages/auth/Profile";

export const AuthRoutes = [
  {
    path: "/register/otp-verify",
    element: OTP_Verification,
  },
  {
    path: "/user/dashboard",
    element: Dashboard,
  },
  {
    path: "/user/profile",
    element: Profile,
  },
  {
    path: "/user/patients-book",
    element: PatientBook,
  },
  {
    path: "/user/add-doctor",
    element: AddDoctors,
  },
  {
    path: "/user/doctors-record",
    element: DoctorsRecord,
  },
  {
    path: "/user/appointments",
    element: Appointment,
  },
  {
    path: "/user/add-outbreak",
    element: AddOutbreak,
  },
  {
    path: "/user/likely-outbreaks",
    element: LikelyOutbreak,
  },
];
