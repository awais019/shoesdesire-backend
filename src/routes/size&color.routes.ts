import { Router } from "express";

import sizeColorController from "../controllers/size&color";
import adminMiddleware from "../middlewares/admin";
import tryCatch from "../middlewares/tryCatch";
import validateMiddleware from "../middlewares/validate";
import sizeColorValidator from "../validators/size&color";

const router = Router();

router.post(
  "/size",
  [adminMiddleware(), validateMiddleware(sizeColorValidator.createSize)],
  tryCatch(sizeColorController.createSize)
);

router.post(
  "/color",
  [adminMiddleware(), validateMiddleware(sizeColorValidator.createColor)],
  tryCatch(sizeColorController.createColor)
);

router.get("/size", tryCatch(sizeColorController.getAllSizes));
router.get("/color", tryCatch(sizeColorController.getAllColors));

export default router;
