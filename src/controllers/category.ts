import { Request, Response } from "express";
import constants from "../constants";
import APIHelpers from "../helpers/API";
import categoryService from "../services/category.service";
import uploadService from "../services/upload.service";
import { UploadedFile } from "express-fileupload";

export default {
  create: async (req: Request, res: Response) => {
    if (!req.files) {
      return APIHelpers.sendError(
        res,
        constants.BAD_REQUEST,
        constants.IMAGE_NOT_PROVIDED_MESSAGE
      );
    }

    const image = req.files.image as UploadedFile;

    const fileName = uploadService.upload(image, constants.IMAGES_PATH);

    const category = {
      ...req.body,
    };
    await categoryService.create(category, fileName);

    return APIHelpers.sendSuccess(
      res,
      null,
      constants.CREATED,
      constants.SUCCESS_MESSAGE
    );
  },
  getAll: async (req: Request, res: Response) => {
    const categories = (await categoryService.getAll()).map((c) => {
      return {
        id: c.id,
        name: c.name,
        slug: c.slug,
        imageUrl: c.CategoryImage[0]?.url,
      };
    });

    return APIHelpers.sendSuccess(res, categories);
  },
};
