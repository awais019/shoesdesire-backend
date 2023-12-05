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

router.get("/", tryCatch(categoryController.getAll));
router.get("/men_women", tryCatch(categoryController.getMenCategories));

export default router;
