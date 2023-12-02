import { Router } from "express";

import validateMiddleware from "../middlewares/validate";
import tryCatch from "../middlewares/tryCatch";
import userVaidator from "../validators/user";
import adminController from "../controllers/admin";

const router = Router();

router.post(
  "/",
  validateMiddleware(userVaidator.create),
  tryCatch(adminController.create)
);

export default router;
