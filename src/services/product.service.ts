import prisma from "../prisma/prisma";

export default {
  create: async (
    product: { name: string; slug: string; description: string; price: number },
    categoryId: string,
    sizes: string[],
    colors: string[]
  ) => {
    return await prisma.$transaction(async () => {
      const newProduct = await prisma.product.create({
        data: {
          ...product,
        },
      });
      await prisma.productCategory.create({
        data: {
          productId: newProduct.id,
          categoryId,
        },
      });
      await prisma.productSize.createMany({
        data: sizes.map((sizeId) => {
          return {
            productId: newProduct.id,
            sizeId,
          };
        }),
      });
      await prisma.productColor.createMany({
        data: colors.map((colorId) => {
          return {
            productId: newProduct.id,
            colorId,
          };
        }),
      });
      return newProduct;
    });
  },
};
