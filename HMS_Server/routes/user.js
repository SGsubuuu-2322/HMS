import { Router } from "express";
import { registeredUserOtpVerification, registerUser } from "../controllers/user_controller.js";

const router = Router();
router.route("/register").post(registerUser);
router.route("/register/otp/verify").post(registeredUserOtpVerification)

export default router;
