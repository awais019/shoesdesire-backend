import { User } from "@prisma/client";
import Joi from "joi";

export default {
  createAdmin: (user: User) => {
    const schema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    return schema.validate(user);
  },
  createUser: (user: User) => {
    const schema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      address: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
    });

    return schema.validate(user);
  },
};
