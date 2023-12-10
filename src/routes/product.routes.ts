import { Router } from "express";

import adminMiddleware from "../middlewares/admin";
import validateMiddleware from "../middlewares/validate";
import tryCatch from "../middlewares/tryCatch";
import productValidator from "../validators/product";
import productController from "../controllers/product";

const router = Router();

router.post(
  "/",
  [adminMiddleware(), validateMiddleware(productValidator.create)],
  tryCatch(productController.create)
);

router.get("/", tryCatch(productController.getAll));

router.get("/:id", tryCatch(productController.getById));

router.get("/:categoryId", tryCatch(productController.getByCategory));

export default router;
