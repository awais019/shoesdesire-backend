import { Router } from "express";

import tryCatch from "../middlewares/tryCatch";
import cartController from "../controllers/cart";

const router = Router();

router.post("/", tryCatch(cartController.create));

export default router;
