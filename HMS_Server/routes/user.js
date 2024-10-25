import { Router } from "express";
import {
  loginUser,
  registeredUserOtpVerification,
  registerUser,
} from "../controllers/user_controller.js";

const router = Router();
router.route("/register").post(registerUser);
router.route("/register/otp/verify").post(registeredUserOtpVerification);
router.route("/login").post(loginUser);

export default router;
