import { Router } from "express";

import validateMiddleware from "../middlewares/validate";
import tryCatch from "../middlewares/tryCatch";
import authMiddlware from "../middlewares/auth";
import authValidator from "../validators/auth";
import authController from "../controllers/auth";

const router = Router();

router.post(
  "/signin",
  validateMiddleware(authValidator.signin),
  tryCatch(authController.signin)
);

router.get("/me", authMiddlware(), tryCatch(authController.me));

export default router;
