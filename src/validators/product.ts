import Joi from "joi";

export default {
  create: (body: {
    name: string;
    description: string;
    price: number;
    stock: number;
    categoryId: string;
    sizes: string[];
    colors: string[];
  }) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().required(),
      stock: Joi.number().required(),
      categoryId: Joi.string().required(),
      sizes: Joi.array().items(Joi.string()).required(),
      colors: Joi.array().items(Joi.string()).required(),
    });
    return schema.validate(body);
  },
};
