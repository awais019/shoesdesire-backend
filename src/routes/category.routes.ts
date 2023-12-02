import { Router } from "express";
import adminMiddleware from "../middlewares/admin";
import tryCatch from "../middlewares/tryCatch";
import validateMiddleware from "../middlewares/validate";
import categoryValidator from "../validators/category";
import categoryController from "../controllers/category";

const router = Router();

router.post(
  "/",
  [adminMiddleware(), validateMiddleware(categoryValidator.create)],
  tryCatch(categoryController.create)
);

export default router;
