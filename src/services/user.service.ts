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
  findByEmail: (email: string) => {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  },
  get: (id: string) => {
    return prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
      },
    });
  },
};
