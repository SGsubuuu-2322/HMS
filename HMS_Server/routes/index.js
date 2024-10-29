import { Router } from "express";
import admin from "./admin.js";
import doctor from "./doctor.js";
import patient from "./patient.js";
import user from "./user.js";
import registerMail from "../controllers/mailer_controller.js";
import * as middleware from "../middlewares/auth.js";

const router = Router();

router.route("/registermail").post(middleware.auth, registerMail);

router.use("/user", user);
router.use("/admin", admin);
router.use("/doctor", doctor);
router.use("/patient", patient);

export default router;
