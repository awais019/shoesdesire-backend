import { Request, Response } from "express";

import APIHelpers from "../helpers/API";
import cryptoHelpers from "../helpers/crypto";
import userService from "../services/user.service";
import constants from "../constants";
import logger from "../startup/logger";

export default {
  create: async (req: Request, res: Response) => {
    const user = {
      ...req.body,
      password: cryptoHelpers.encryptPassword(req.body.password),
    };
    await userService.create(user);

    userService.sendEmail(user).catch((error) => {
      logger.error(error);
    });

    return APIHelpers.sendSuccess(res, user, constants.SUCCESS);
  },
};
