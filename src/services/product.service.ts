import prisma from "../prisma/prisma";

export default {
  create: async (
    product: {
      name: string;
      slug: string;
      description: string;
      price: number;
      stock: number;
    },
    categories: string[],
    sizes: string[],
    colors: string[],
    images: string[]
  ) => {
    return await prisma.$transaction(async () => {
      const newProduct = await prisma.product.create({
        data: {
          ...product,
        },
      });
      await prisma.productCategory.createMany({
        data: categories.map((categoryId) => {
          return {
            productId: newProduct.id,
            categoryId,
          };
        }),
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
      await prisma.productImage.createMany({
        data: images.map((url) => {
          return {
            url: `${process.env.BASE_URL}/images/${url}`,
            productId: newProduct.id,
          };
        }),
      });
      return newProduct;
    });
  },
  getAll: () => {
    return prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        Images: {
          select: {
            url: true,
          },
        },
        ProductCategory: true,
        ProductColor: true,
        ProductSize: true,
      },
    });
  },
  getByCategory: (categoryId: string) => {
    return prisma.product.findMany({
      where: {
        ProductCategory: {
          some: {
            categoryId,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        Images: true,
        ProductColor: {
          select: {
            Color: {
              select: {
                name: true,
                hex: true,
              },
            },
          },
        },
        ProductSize: {
          select: {
            Size: {
              select: {
                size: true,
              },
            },
          },
        },
      },
    });
  },
};
