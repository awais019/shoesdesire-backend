import { Request, Response } from "express";

import APIHelpers from "../helpers/API";
import cryptoHelpers from "../helpers/crypto";
import userService from "../services/user.service";
import constants from "../constants";

export default {
  create: async (req: Request, res: Response) => {
    const user = {
      ...req.body,
      password: cryptoHelpers.encryptPassword(req.body.password),
      role: "ADMIN",
    };
    await userService.create(user);

    return APIHelpers.sendSuccess(res, user, constants.SUCCESS);
  },
};
