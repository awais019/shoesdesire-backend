import { Category } from "@prisma/client";
import prisma from "../prisma/prisma";

export default {
  create: (category: Category, imageName: string) => {
    return prisma.$transaction(async function () {
      const c = await prisma.category.create({
        data: {
          ...category,
          slug: category.name.toLowerCase().replace(" ", "-"),
        },
      });

      await prisma.categoryImage.create({
        data: {
          url: `${process.env.BASE_URL}/images/${imageName}`,
          categoryId: c.id,
        },
      });

      return c;
    });
  },

  updateImage: (categoryId: string, imageName: string) => {
    return prisma.categoryImage.update({
      where: {
        categoryId,
      },
      data: {
        url: `${process.env.BASE_URL}/images/${imageName}`,
      },
    });
  },
  getAll: () => {
    return prisma.category.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        CategoryImage: {
          select: {
            url: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },
};