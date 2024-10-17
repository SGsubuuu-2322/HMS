import { Router } from "express";
import admin from "./admin.js";
import doctor from "./doctor.js";
import patient from "./patient.js";

const router = Router();

router.use("/admin", admin);
router.use("/doctor", doctor);
router.use("/patient", patient);

export default router;
