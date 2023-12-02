import { Request, Response } from "express";

import APIHelpers from "../helpers/API";
import productService from "../services/product.service";

export default {
  create: async (req: Request, res: Response) => {
    const product = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      slug: req.body.name.toLowerCase().replace(/\s/g, "-"),
    };

    const newProduct = await productService.create(
      product,
      req.body.categoryId,
      req.body.sizes,
      req.body.colors
    );

    return APIHelpers.sendSuccess(res, newProduct);
  },
  getAll: async (req: Request, res: Response) => {
    const products = await productService.getAll();

    return APIHelpers.sendSuccess(res, products);
  },
};
