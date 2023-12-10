import { Router } from "express";

import validateMiddleware from "../middlewares/validate";
import tryCatch from "../middlewares/tryCatch";
import userVaidator from "../validators/user";
import userController from "../controllers/user";
const router = Router();

router.post(
  "/",
  validateMiddleware(userVaidator.createUser),
  tryCatch(userController.create)
);

export default router;
