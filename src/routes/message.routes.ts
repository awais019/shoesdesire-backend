import { Router } from "express";
import tryCatch from "../middlewares/tryCatch";
import authMiddleware from "../middlewares/auth";
import messageController from "../controllers/messages";
import adminMiddleware from "../middlewares/admin";

const router = Router();

router.get(
  "/:userId",
  authMiddleware(),
  tryCatch(messageController.createorGetConversation)
);

router.get(
  "/:conversationId/messages",
  authMiddleware(),
  tryCatch(messageController.getMessages)
);

router.get(
  "/conversations/list",
  adminMiddleware(),
  tryCatch(messageController.getConversations)
);

export default router;
