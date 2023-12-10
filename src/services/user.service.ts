import { User } from "@prisma/client";
import prisma from "../prisma/prisma";

import ejsHelpers from "../helpers/ejs";
import emailHelpers from "../helpers/email";
import jwtHelpers from "../helpers/jwt";

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
  update: (id: string, data: Partial<User>) => {
    return prisma.user.update({
      where: {
        id,
      },
      data,
    });
  },
  sendEmail: async (user: User) => {
    const token = jwtHelpers.sign({ id: user.id });
    const email = await ejsHelpers.renderHTMLFile("verify", {
      name: `${user.firstName} ${user.lastName}`,
      verificationUrl: `${process.env.CLIENT_URL}/?token=${token}`,
    });
    await emailHelpers.sendMail({
      to: user.email,
      subject: "ShoesDesire - Verify your email",
      html: email,
    });
  },
};
