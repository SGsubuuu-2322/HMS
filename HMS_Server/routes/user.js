import { Router } from "express";
import {
  changeUserPassword,
  getUserDetails,
  loginUser,
  registerUser,
  updateUserDetails,
} from "../controllers/user_controller.js";
import * as middleware from "../middlewares/auth.js";
import authorizeRoles from "../middlewares/role.js";

const router = Router();
router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router
  .route("/details/:id")
  .get(middleware.auth, authorizeRoles("A", "D", "P"), getUserDetails);

router
  .route("/profile/update/:id")
  .put(middleware.auth, authorizeRoles("A", "D", "P"), updateUserDetails);

router
  .route("/change/password/:id")
  .patch(middleware.auth, authorizeRoles("A", "D", "P"), changeUserPassword);

export default router;
