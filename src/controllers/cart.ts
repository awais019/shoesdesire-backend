import { Request, Response } from "express";

import APIHelpers from "../helpers/API";
import cartService from "../services/cart.service";
import constants from "../constants";
import productService from "../services/product.service";

export default {
  create: async (req: Request, res: Response) => {
    const cart = await cartService.create();

    return APIHelpers.sendSuccess(res, cart, constants.SUCCESS);
  },

  addToCart: async (req: Request, res: Response) => {
    const cartId = req.params.id;

    if (!cartId) {
      return APIHelpers.sendError(
        res,
        constants.BAD_REQUEST,
        constants.ID_NOT_PROVIDED_MESSAGE
      );
    }

    const { productId, quantity, sizeId, colorId } = req.body;

    const product = await productService.getById(productId);

    if (!product) {
      return APIHelpers.sendError(
        res,
        constants.BAD_REQUEST,
        constants.NOT_FOUND_MESSAGE
      );
    }
    const cart = await cartService.createorupdateCartItem(
      cartId,
      productId,
      parseInt(quantity),
      sizeId,
      colorId
    );

    const total = product.price * parseInt(quantity);

    await cartService.updateCartTotal(cartId, total);

    return APIHelpers.sendSuccess(res, cart, constants.SUCCESS);
  },
  get: async (req: Request, res: Response) => {
    const cartId = req.params.id;

    if (!cartId) {
      return APIHelpers.sendError(
        res,
        constants.BAD_REQUEST,
        constants.ID_NOT_PROVIDED_MESSAGE
      );
    }

    const cart = await cartService.get(cartId);

    return APIHelpers.sendSuccess(res, cart, constants.SUCCESS);
  },
  removeCartItem: async (req: Request, res: Response) => {
    const cartItemId = req.params.itemId;
    const cartId = req.params.cartId;

    if (!cartId || !cartItemId) {
      return APIHelpers.sendError(
        res,
        constants.BAD_REQUEST,
        constants.ID_NOT_PROVIDED_MESSAGE
      );
    }

    const cartItem = await cartService.getCartItem(cartId, cartItemId);

    if (!cartItem) {
      return APIHelpers.sendError(
        res,
        constants.BAD_REQUEST,
        constants.NOT_FOUND_MESSAGE
      );
    }

    const total = cartItem.quantity * cartItem.Product.price;

    await cartService.updateCartTotal(cartId, -total);

    const cart = await cartService.removeCartItem(cartId, cartItemId);

    return APIHelpers.sendSuccess(res, cart, constants.SUCCESS);
  },
};
