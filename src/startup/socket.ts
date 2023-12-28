import { Server } from "socket.io";
import messageService from "../services/message.service";
import logger from "./logger";

export default function socket(server: any) {
  const clients = new Map();

  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    logger.info("User connected to socket");

    socket.on("set-user", (id: string) => {
      clients.set(id, socket.id);
    });

    socket.on("join", async (conversationId: string, userId: string) => {
      socket.join(conversationId);

      await messageService.updateMessages(conversationId, userId);
      logger.info(`User joined conversation ${conversationId}`);
    });

    socket.on(
      "message",
      async (data: {
        conversationId: string;
        message: string;
        sender: string;
      }) => {
        const message = await messageService.createMessage(data);
        io.to(data.conversationId).emit("message", message);
        logger.info(
          `User ${data.sender} sent message to conversation ${data.conversationId}`
        );
      }
    );

    socket.on("leave", (conversationId: string) => {
      socket.leave(conversationId);
      logger.info(`User left conversation ${conversationId}`);
    });

    socket.on("disconnect", () => {
      logger.info("User disconnected from socket");
    });
  });

  return io;
}
