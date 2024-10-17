import AboutUs from "@/Pages/AboutUs";
import Contact from "@/Pages/Contact";
import Home from "@/Pages/Home";
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
  {
    path: "/",
    element: Home,
  },
  {
    path: "/about-us",
    element: AboutUs,
  },
  {
    path: "/contact-us",
    element: Contact,
  },
];
