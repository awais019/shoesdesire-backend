import { Request, Response } from "express";

import APIHelpers from "../helpers/API";
import sizeColorService from "../services/size&color.service";

export default {
  createSize: async (req: Request, res: Response) => {
    const size = await sizeColorService.createSize(req.body.size);

    APIHelpers.sendSuccess(res, size);
  },
  getAllSizes: async (req: Request, res: Response) => {
    const sizes = await sizeColorService.getAllSizes();

    APIHelpers.sendSuccess(res, sizes);
  },
  createColor: async (req: Request, res: Response) => {
    const color = await sizeColorService.createColor(
      req.body.name,
      req.body.hex
    );

    APIHelpers.sendSuccess(res, color);
  },
  getAllColors: async (req: Request, res: Response) => {
    const colors = await sizeColorService.getAllColors();

    APIHelpers.sendSuccess(res, colors);
  },
};
