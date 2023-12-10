import { Router } from "express";

import tryCatch from "../middlewares/tryCatch";
import cartController from "../controllers/cart";

const router = Router();

router.post("/", tryCatch(cartController.create));

router.get("/:id", tryCatch(cartController.get));

router.put("/:id", tryCatch(cartController.addToCart));

router.delete(
  "/:cartId/items/:itemId",
  tryCatch(cartController.removeCartItem)
);

export default router;
