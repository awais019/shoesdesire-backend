import { Request, Response } from "express";
import APIHelpers from "../helpers/API";
import JWTHelpers from "../helpers/jwt";
import constants from "../constants";
import { JwtPayload } from "jsonwebtoken";
import messageService from "../services/message.service";

export default {
  createorGetConversation: async (req: Request, res: Response) => {
    const { userId } = req.params;

    const token = req.header(constants.AUTH_HEADER_NAME);

    if (!token || !userId) {
      return APIHelpers.sendError(
        res,
        constants.UNAUTHORIZED,
        constants.UNAUTHORIZED_MESSAGE
      );
    }

    const user = await messageService.checkIfUserExists(userId);

    if (!user) {
      return APIHelpers.sendError(
        res,
        constants.BAD_REQUEST,
        constants.BAD_REQUEST_MESSAGE
      );
    }

    const oldConversation = await messageService.getConversation(userId);

    if (oldConversation) {
      if (
        !oldConversation.Participant ||
        !oldConversation.Participant ||
        !oldConversation.Participant.User
      ) {
        return APIHelpers.sendError(
          res,
          constants.INTERNAL_SERVER_ERROR,
          constants.ERROR_MESSAGE
        );
      }

      return APIHelpers.sendSuccess(
        res,
        {
          id: oldConversation.id,
          Participant: oldConversation.Participant.User,
          Message: oldConversation.Message[0] || null,
        },
        constants.SUCCESS,
        constants.SUCCESS_MESSAGE
      );
    }

    const newConversation = await messageService.createConversation(userId);

    if (!newConversation || !newConversation.Participant) {
      return APIHelpers.sendError(
        res,
        constants.INTERNAL_SERVER_ERROR,
        constants.ERROR_MESSAGE
      );
    }

    return APIHelpers.sendSuccess(
      res,
      {
        id: newConversation.id,
        Participant: newConversation.Participant.User,
        Message: null,
      },
      constants.SUCCESS,
      constants.SUCCESS_MESSAGE
    );
  },
  getConversations: async (req: Request, res: Response) => {
    const conversations = await messageService.getConversations();

    return APIHelpers.sendSuccess(
      res,
      conversations.map((conversation) => {
        if (
          !conversation.Participant ||
          !conversation.Participant ||
          !conversation.Participant.User ||
          !conversation.Message
        ) {
          return APIHelpers.sendError(
            res,
            constants.INTERNAL_SERVER_ERROR,
            constants.ERROR_MESSAGE
          );
        }

        const participant = conversation.Participant.User;
        const message = conversation.Message[0];

        return {
          id: conversation.id,
          Participant: participant,
          Message: message,
          unreadCount: conversation.unreadCount,
        };
      }),
      constants.SUCCESS,
      constants.SUCCESS_MESSAGE
    );
  },
  getMessages: async (req: Request, res: Response) => {
    const { conversationId } = req.params;

    if (!conversationId) {
      return APIHelpers.sendError(
        res,
        constants.BAD_REQUEST,
        constants.BAD_REQUEST_MESSAGE
      );
    }

    const messages = await messageService.getMessages(conversationId);

    return APIHelpers.sendSuccess(
      res,
      messages,
      constants.SUCCESS,
      constants.SUCCESS_MESSAGE
    );
  },
};
