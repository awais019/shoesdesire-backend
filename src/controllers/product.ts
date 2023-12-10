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
    const { category, size, color, q } = req.query as {
      category: string | undefined;
      size: string | undefined;
      color: string | undefined;
      q: string | undefined;
    };

    const products = await productService.getAll(category, size, color, q);

    return APIHelpers.sendSuccess(
      res,
      products.map((p) => {
        return {
          id: p.id,
          name: p.name,
          description: p.description,
          slug: p.slug,
          price: p.price,
          stock: p.stock,
          images: p.Images.map((image) => image.url),
          totalCategories: p.ProductCategory.length,
          colorsAvailable: p.ProductColor.length,
          sizesAvailable: p.ProductSize.length,
        };
      })
    );
  },
  getByCategory: async (req: Request, res: Response) => {
    const products = await productService.getByCategory(
      req.params.categoryId as string
    );

    return APIHelpers.sendSuccess(res, products);
  },
  getById: async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      return APIHelpers.sendError(
        res,
        constants.BAD_REQUEST,
        constants.ID_NOT_PROVIDED_MESSAGE
      );
    }
    const product = await productService.getById(id);

    if (!product) {
      return APIHelpers.sendError(
        res,
        constants.NOT_FOUND,
        constants.NOT_FOUND_MESSAGE
      );
    }

    return APIHelpers.sendSuccess(res, {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      images: product.Images,
      sizes: product.ProductSize.map((size) => {
        return { id: size.Size.id, size: size.Size.size };
      }),
      colors: product.ProductColor.map((color) => {
        return {
          id: color.Color.id,
          name: color.Color.name,
          hex: color.Color.hex,
        };
      }),
    });
  },
};
