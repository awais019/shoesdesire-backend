import { Router } from "express";
import tryCatch from "../middlewares/tryCatch";
import authMiddleware from "../middlewares/auth";
import messageController from "../controllers/messages";

const router = Router();

router.get(
  "/:userId",
  authMiddleware(),
  tryCatch(messageController.createorGetConversation)
);

router.get(
  "/:conversationId/messages",
  tryCatch(messageController.getMessages)
);

export default router;
