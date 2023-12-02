import Joi from "joi";

export default {
  createSize: ({ size }: { size: number }) =>
    Joi.number().required().min(1).max(100).validate(size),
  createColor: ({ name, hex }: { name: string; hex: string }) =>
    Joi.object({
      name: Joi.string().required().min(3).max(30),
      hex: Joi.string().required().min(7).max(7),
    }).validate({ name, hex }),
};
