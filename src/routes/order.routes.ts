import { Router } from "express";

import tryCatch from "../middlewares/tryCatch";
import orderController from "../controllers/order";
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";

const router = Router();

router.post("/", authMiddleware(), tryCatch(orderController.create));

router.post(
  "/:orderId",
  authMiddleware(),
  tryCatch(orderController.updatePaymentStatus)
);

router.get("/", adminMiddleware(), tryCatch(orderController.getOrders));

router.get("/:orderId", adminMiddleware(), tryCatch(orderController.getOrder));

router.put(
  "/:orderId",
  adminMiddleware(),
  tryCatch(orderController.updateOrderStatus)
);

export default router;
