import { Request, Response } from "express";

import APIHelpers from "../helpers/API";
import orderService from "../services/order.service";
import constants from "../constants";
import productService from "../services/product.service";
import jwtHelpers from "../helpers/jwt";
import stripeHelpers from "../helpers/stripe";
import { JwtPayload } from "jsonwebtoken";

export default {
  create: async (req: Request, res: Response) => {
    const token = req.headers[constants.AUTH_HEADER_NAME] as string;

    const { _id } = jwtHelpers.verify(token) as JwtPayload;

    let order = await orderService.create(_id);

    const { items } = req.body;

    for (let i = 0; i < items.length; i++) {
      const product = await productService.getById(items[i].productId);

      if (!product) {
        return APIHelpers.sendError(
          res,
          constants.BAD_REQUEST,
          constants.NOT_FOUND_MESSAGE
        );
      }

      await orderService.createOrderItem(
        order.id,
        items[i].productId,
        items[i].quantity,
        product.price,
        items[i].sizeId,
        items[i].colorId
      );

      const total = product.price * items[i].quantity;

      await orderService.updateOrderTotal(order.id, total);
    }

    const _order = await orderService.getById(order.id);

    if (!_order) {
      return APIHelpers.sendError(
        res,
        constants.BAD_REQUEST,
        constants.NOT_FOUND_MESSAGE
      );
    }

    const price = await stripeHelpers.createPrice(
      _order.User.firstName + " " + _order.User.lastName,
      _order.id,
      _order.total
    );

    const session = await stripeHelpers.createPaymentLink(price, 1);

    return APIHelpers.sendSuccess(
      res,
      {
        paymentLink: session.url,
        orderId: _order.id,
      },
      constants.SUCCESS
    );
  },

  updatePaymentStatus: async (req: Request, res: Response) => {
    const orderId = req.params.orderId;

    if (!orderId) {
      return APIHelpers.sendError(
        res,
        constants.BAD_REQUEST,
        constants.NOT_FOUND_MESSAGE
      );
    }

    await orderService.updatePaymentStatus(orderId, true);

    return APIHelpers.sendSuccess(res, null, constants.SUCCESS);
  },
};
