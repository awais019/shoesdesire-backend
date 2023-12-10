import { Router } from "express";

import tryCatch from "../middlewares/tryCatch";
import orderController from "../controllers/order";
import authMiddleware from "../middlewares/auth";

const router = Router();

router.post("/", authMiddleware(), tryCatch(orderController.create));

export default router;
