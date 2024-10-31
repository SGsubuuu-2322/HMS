import { Router } from "express";
import { getDocDashboardDetails } from "../controllers/doctor_controller.js";
import * as middleware from "../middlewares/auth.js";
import authorizeRoles from "../middlewares/role.js";
import {
  addOutbreak,
  registeredUserOtpVerification,
} from "../controllers/user_controller.js";

const router = Router();

// router.route("/dashboard").get(getDocDashboardDetails);

router
  .route("/register/otp/verify")
  .post(middleware.auth, authorizeRoles("D"), registeredUserOtpVerification);

router
  .route("/add/outbreak")
  .post(middleware.auth, authorizeRoles("D"), addOutbreak);

export default router;
