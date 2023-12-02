import { Category } from "@prisma/client";
import JOI from "joi";

export default {
  create: (category: Category) => {
    const schema = JOI.object({
      name: JOI.string().required(),
      description: JOI.string().required(),
    });

    return schema.validate(category);
  },
};
