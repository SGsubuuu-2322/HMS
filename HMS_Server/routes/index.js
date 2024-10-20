import { Router } from "express";
import admin from "./admin.js";
import doctor from "./doctor.js";
import patient from "./patient.js";
import user from "./user.js";

const router = Router();

router.use("/user", user);
router.use("/admin", admin);
router.use("/doctor", doctor);
router.use("/patient", patient);

export default router;
