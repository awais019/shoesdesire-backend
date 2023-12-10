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
  createorupdateCartItem: (
    cartId: string,
    productId: string,
    quantity: number,
    sizeId: string,
    colorId: string
  ) => {
    return prisma.cartItem.upsert({
      where: {
        cartId_productId_sizeId_colorId: {
          cartId,
          productId,
          sizeId,
          colorId,
        },
      },
      update: {
        quantity: {
          increment: quantity,
        },
      },
      create: {
        quantity,
        cartId,
        productId,
        sizeId,
        colorId,
      },
    });
  },
  updateCartTotal: (cartId: string, total: number) => {
    return prisma.cart.update({
      where: {
        id: cartId,
      },
      data: {
        total: {
          increment: total,
        },
      },
    });
  },
  get: (cartId: string) => {
    return prisma.cart.findUnique({
      where: {
        id: cartId,
      },
      include: {
        CartItem: {
          select: {
            id: true,
            quantity: true,
            Product: {
              select: {
                id: true,
                name: true,
                price: true,
                Images: {
                  select: {
                    url: true,
                  },
                },
              },
            },
            Size: {
              select: {
                id: true,
                size: true,
              },
            },
            Color: {
              select: {
                id: true,
                name: true,
                hex: true,
              },
            },
          },
        },
      },
    });
  },
  getCartItem: (cartId: string, cartItemId: string) => {
    return prisma.cartItem.findUnique({
      where: {
        id: cartItemId,
        cartId,
      },
      include: {
        Product: {
          select: {
            id: true,
            name: true,
            price: true,
            Images: {
              select: {
                url: true,
              },
            },
          },
        },
        Size: {
          select: {
            id: true,
            size: true,
          },
        },
        Color: {
          select: {
            id: true,
            name: true,
            hex: true,
          },
        },
      },
    });
  },
  removeCartItem: (cartId: string, cartItemId: string) => {
    return prisma.cartItem.delete({
      where: {
        id: cartItemId,
        Cart: {
          id: cartId,
        },
      },
    });
  },
};
