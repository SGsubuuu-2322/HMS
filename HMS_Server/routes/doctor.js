import { Router } from "express";
import {
  getDocDashboardDetails,
  getOutbreaks,
} from "../controllers/doctor_controller.js";
import * as middleware from "../middlewares/auth.js";
import authorizeRoles from "../middlewares/role.js";
import { registeredUserOtpVerification } from "../controllers/user_controller.js";

const router = Router();

// router.route("/dashboard").get(getDocDashboardDetails);

router
  .route("/register/otp/verify")
  .post(middleware.auth, authorizeRoles("D"), registeredUserOtpVerification);

router
  .route("/get/outbreaks")
  .get(middleware.auth, authorizeRoles("D"), getOutbreaks);

export default router;
