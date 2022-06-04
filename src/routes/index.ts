import express, { Router } from "express";
import { decryptAuthorization } from "../middlewares/decryptAuthorization";
import { routerDocs } from "./docs";
import contractsRoutes from "./contracts.routes";
import jobsRoutes from "./jobs.routes";
import balancesRoutes from "./balances.routes";
import adminRoutes from "./admin.routes";

const router = express.Router();

router.use(decryptAuthorization);

router.use("/docs", routerDocs);
router.use("/contracts", contractsRoutes)
router.use("/jobs", jobsRoutes)
router.use("/balances", balancesRoutes)
router.use("/admin", adminRoutes)

export const routerBase: Router = router;
