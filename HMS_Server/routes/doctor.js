import { Router } from "express";
import { getDocDashboardDetails } from "../controllers/doctor_controller.js";

const router = Router();

router.route("/dashboard").get(getDocDashboardDetails);

export default router;
