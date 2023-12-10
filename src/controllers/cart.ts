import { Request, Response } from "express";

import APIHelpers from "../helpers/API";
import cartService from "../services/cart.service";
import constants from "../constants";

export default {
  create: async (req: Request, res: Response) => {
    const cart = await cartService.create();

    return APIHelpers.sendSuccess(res, cart, constants.SUCCESS);
  },
};
