import { ORDERSTATUS } from "@prisma/client";
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
        paid: true,
        status: true,
        User: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        OrderDetail: {
          select: {
            id: true,
            quantity: true,
            price: true,
            Product: {
              select: {
                name: true,
              },
            },
            Size: {
              select: {
                size: true,
              },
            },
            Color: {
              select: {
                name: true,
                hex: true,
              },
            },
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
  updatePaymentStatus: (orderId: string, paymentStatus: boolean) => {
    return prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        paid: paymentStatus,
      },
    });
  },
  updateShippingStatus: (orderId: string, shippingStatus: string) => {
    return prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status:
          shippingStatus == "pending"
            ? ORDERSTATUS.PENDING
            : shippingStatus == "shipped"
            ? ORDERSTATUS.SHIPPED
            : ORDERSTATUS.DELIVERED,
      },
    });
  },
  getAll: () => {
    return prisma.order.findMany({
      where: {
        paid: true,
      },
      select: {
        id: true,
        User: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        total: true,
        OrderDetail: {
          select: {
            quantity: true,
            price: true,
            Product: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
  },
};
