import prisma from "../prisma/prisma";

export default {
  createSize: (size: number) => {
    return prisma.size.create({
      data: {
        size,
      },
    });
  },
  createColor: (name: string, hex: string) => {
    return prisma.color.create({
      data: {
        name,
        hex,
      },
    });
  },
  getAllSizes: () => {
    return prisma.size.findMany();
  },
  getAllColors: () => {
    return prisma.color.findMany();
  },
};
