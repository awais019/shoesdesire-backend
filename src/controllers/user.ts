import { Request, Response } from "express";

import APIHelpers from "../helpers/API";
import cryptoHelpers from "../helpers/crypto";
import userService from "../services/user.service";
import constants from "../constants";
import logger from "../startup/logger";
import jwtHelpers from "../helpers/jwt";
import { JwtPayload } from "jsonwebtoken";

export default {
  create: async (req: Request, res: Response) => {
    const _user = await userService.findByEmail(req.body.email);

    if (_user) {
      return APIHelpers.sendError(
        res,
        constants.BAD_REQUEST,
        constants.EMAIL_EXISTS_MESSAGE
      );
    }

    let user = {
      ...req.body,
      password: cryptoHelpers.encryptPassword(req.body.password),
    };
    user = await userService.create(user);

    userService.sendEmail(user).catch((error) => {
      logger.error(error);
    });

    return APIHelpers.sendSuccess(res, null);
  },
  verifyEmail: async (req: Request, res: Response) => {
    const { token } = req.query;

    const { id } = jwtHelpers.verify(token as string) as JwtPayload;

    const user = await userService.get(id);
    if (!user) {
      return APIHelpers.sendError(
        res,
        constants.NOT_FOUND,
        constants.NOT_FOUND_MESSAGE
      );
    }

    await userService.update(id, { email_verified: true });

    return APIHelpers.sendSuccess(res, null);
  },
};
