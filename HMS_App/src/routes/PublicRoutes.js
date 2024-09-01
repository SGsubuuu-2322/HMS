import Login_Form from "@/Pages/Login_Form";
import Register_Form from "@/Pages/Register_Form";

export const PublicRoutes = [
  {
    path: "/login",
    element: Login_Form,
  },
  {
    path: "/register",
    element: Register_Form,
  },
];
