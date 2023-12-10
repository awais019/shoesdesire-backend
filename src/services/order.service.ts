import prisma from "../prisma/prisma";

export default {
  create: (userId: string) => {
    return prisma.order.create({
      data: {
        total: 0,
        userId,
      },
      select: {
        id: true,
      },
    });
  },
  getById: (orderId: string) => {
    return prisma.order.findUnique({
      where: {
        id: orderId,
      },
      select: {
        id: true,
        total: true,
        User: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  },
  updateOrderTotal: (orderId: string, total: number) => {
    return prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        total: {
          increment: total,
        },
      },
    });
  },
  createOrderItem: (
    orderId: string,
    productId: string,
    quantity: number,
    price: number,
    sizeId: string,
    colorId: string
  ) => {
    return prisma.orderDetail.create({
      data: {
        orderId,
        productId,
        quantity,
        sizeId,
        colorId,
        price,
      },
    });
  },
};
