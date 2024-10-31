import { Router } from "express";
import {
  addDoctor,
  //   getAdDashboardDetails,
} from "../controllers/admin_controller.js";
import * as middleware from "../middlewares/auth.js";
import authorizeRoles from "../middlewares/role.js";
import { registeredUserOtpVerification } from "../controllers/user_controller.js";

const router = Router();

// router.route("/dashboard").get(getAdDashboardDetails);
router
  .route("/register/otp/verify")
  .post(middleware.auth, authorizeRoles("A"), registeredUserOtpVerification);

router
  .route("/add/doctor/:id")
  .post(middleware.auth, authorizeRoles("A"), addDoctor);
export default router;
