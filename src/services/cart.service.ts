import prisma from "../prisma/prisma";

export default {
  create: () => {
    return prisma.cart.create({
      data: {
        total: 0,
      },
      select: {
        id: true,
      },
    });
  },
};
