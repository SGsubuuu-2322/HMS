import { Router } from "express";
import {
  //   getAdDashboardDetails,
  registeredUserOtpVerification,
} from "../controllers/admin_controller.js";
import * as middleware from "../middlewares/auth.js";
import authorizeRoles from "../middlewares/role.js";

const router = Router();

// router.route("/dashboard").get(getAdDashboardDetails);
router
  .route("/register/otp/verify")
  .post(middleware.auth, authorizeRoles("A"), registeredUserOtpVerification);

export default router;
