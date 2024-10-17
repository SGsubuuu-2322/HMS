import { Router } from "express";
import { getPatDashboardDetails } from "../controllers/patient_controller.js";

const router = Router();

router.route("/dashboard").get(getPatDashboardDetails);

export default router;
