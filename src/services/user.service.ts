import { User } from "@prisma/client";
import prisma from "../prisma/prisma";

export default {
  create: (user: User) => {
    return prisma.user.create({
      data: {
        ...user,
      },
    });
  },
};
