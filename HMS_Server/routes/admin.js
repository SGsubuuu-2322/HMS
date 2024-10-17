import { Router } from "express";
import { getAdDashboardDetails } from "../controllers/admin_controller.js";

const router = Router();

router.route("/dashboard").get(getAdDashboardDetails);

export default router;
