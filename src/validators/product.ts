import Joi from "joi";

export default {
  create: (body: {
    name: string;
    description: string;
    price: number;
    stock: number;
    categories: string;
    sizes: string;
    colors: string;
  }) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().required(),
      stock: Joi.number().required(),
      categories: Joi.array().items(Joi.string()).required(),
      sizes: Joi.array().items(Joi.string()).required(),
      colors: Joi.array().items(Joi.string()).required(),
    });
    return schema.validate({
      ...body,
      categories: JSON.parse(body.categories),
      sizes: JSON.parse(body.sizes),
      colors: JSON.parse(body.colors),
    });
  },
};
