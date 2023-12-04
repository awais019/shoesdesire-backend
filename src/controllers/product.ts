import { Request, Response } from "express";

import APIHelpers from "../helpers/API";
import productService from "../services/product.service";
import constants from "../constants";
import { UploadedFile } from "express-fileupload";
import uploadService from "../services/upload.service";

export default {
  create: async (req: Request, res: Response) => {
    if (!req.files) {
      return APIHelpers.sendError(
        res,
        constants.BAD_REQUEST,
        constants.IMAGE_NOT_PROVIDED_MESSAGE
      );
    }

    const product = {
      name: req.body.name,
      description: req.body.description,
      price: parseFloat(req.body.price),
      stock: parseInt(req.body.stock),
      slug: req.body.name.toLowerCase().replace(/\s/g, "-"),
    };

    const files = Object.values(req.files) as UploadedFile[];

    const fileNames = uploadService.bulkUpload(files, "images");

    const newProduct = await productService.create(
      product,
      JSON.parse(req.body.categories),
      JSON.parse(req.body.sizes),
      JSON.parse(req.body.colors),
      fileNames
    );
    return APIHelpers.sendSuccess(res, newProduct);
  },
  getAll: async (req: Request, res: Response) => {
    const products = await productService.getAll();

    return APIHelpers.sendSuccess(res, products);
  },
  getByCategory: async (req: Request, res: Response) => {
    const products = await productService.getByCategory(
      req.params.categoryId as string
    );

    return APIHelpers.sendSuccess(res, products);
  },
};
