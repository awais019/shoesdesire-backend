import { Router } from "express";

import validateMiddleware from "../middlewares/validate";
import tryCatch from "../middlewares/tryCatch";
import authValidator from "../validators/auth";
import authController from "../controllers/auth";

const router = Router();

router.post(
  "/signin",
  validateMiddleware(authValidator.signin),
  tryCatch(authController.signin)
);

export default router;
