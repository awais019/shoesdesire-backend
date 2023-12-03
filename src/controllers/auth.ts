import { Request, Response } from "express";

import APIHelpers from "../helpers/API";
import cryptoHelpers from "../helpers/crypto";
import jwtHelpers from "../helpers/jwt";
import userService from "../services/user.service";
import constants from "../constants";
import { JwtPayload } from "jsonwebtoken";

export default {
  signin: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await userService.findByEmail(email);

    if (!user) {
      return APIHelpers.sendError(
        res,
        constants.NOT_FOUND,
        constants.INVALID_CREDENTIALS_MESSAGE
      );
    }

    const isPasswordValid = cryptoHelpers.comparePassword(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return APIHelpers.sendError(
        res,
        constants.BAD_REQUEST,
        constants.INVALID_CREDENTIALS_MESSAGE
      );
    }

    const token = jwtHelpers.sign({ _id: user.id, role: user.role });

    return APIHelpers.sendSuccess(res, { token }, constants.SUCCESS);
  },
  me: async (req: Request, res: Response) => {
    const token = req.headers[constants.AUTH_HEADER_NAME] as string;
    const { _id } = jwtHelpers.verify(token) as JwtPayload;
    const user = await userService.get(_id);

    return APIHelpers.sendSuccess(res, user, constants.SUCCESS);
  },
};
