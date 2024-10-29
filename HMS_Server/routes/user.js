import { Router } from "express";
import {
  getUserDetails,
  loginUser,
  registeredUserOtpVerification,
  registerUser,
} from "../controllers/user_controller.js";
import * as middleware from "../middlewares/auth.js";

const router = Router();
router.route("/register").post(registerUser);
router
  .route("/register/otp/verify")
  .post(middleware.auth, registeredUserOtpVerification);
router.route("/login").post(loginUser);
router.route("/details/:id").get(middleware.auth, getUserDetails);
export default router;
