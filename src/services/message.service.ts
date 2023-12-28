import prisma from "../prisma/prisma";

export default {
  checkIfUserExists: (userId: string) => {
    return prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  },
  getConversation: (userId: string) => {
    return prisma.conversation.findFirst({
      where: {
        Participant: {
          userId,
        },
      },

      include: {
        Participant: {
          select: {
            User: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        Message: {
          select: {
            id: true,
            message: true,
            created_at: true,
            sender: true,
          },
          orderBy: {
            created_at: "desc",
          },
          take: 1,
        },
      },
    });
  },
  createConversation: (userId: string) => {
    return prisma.conversation.create({
      data: {
        Participant: {
          create: {
            userId,
          },
        },
      },
      include: {
        Participant: {
          select: {
            User: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });
  },
  getConversations: async (_id: string) => {
    const conversations = await prisma.conversation.findMany({
      orderBy: {
        updated_at: "desc",
      },
      select: {
        id: true,
        Participant: {
          select: {
            User: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        Message: {
          select: {
            id: true,
            message: true,
            created_at: true,
            sender: true,
          },
          orderBy: {
            created_at: "desc",
          },
          take: 1,
        },
      },
    });
    const _conversations = [];
    for (let index = 0; index < conversations.length; index++) {
      const unreadCount = await prisma.message.count({
        where: {
          conversationId: conversations[index]?.id,

          read: false,
        },
      });
      _conversations.push({ ...conversations[index], unreadCount });
    }

    return _conversations;
  },
  createMessage: async ({
    conversationId,
    message,
    sender,
  }: {
    conversationId: string;
    message: string;
    sender: string;
  }) => {
    const messages = await prisma.message.create({
      data: {
        conversationId,
        message,
        sender,
      },
    });
    await prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        updated_at: new Date(),
      },
    });
    return messages;
  },
  getMessages: (conversationId: string) => {
    return prisma.message.findMany({
      where: {
        conversationId,
      },
      orderBy: {
        created_at: "asc",
      },
    });
  },
  updateMessages: (conversationId: string, userId: string) => {
    return prisma.message.updateMany({
      where: {
        conversationId,
        read: false,
      },
      data: {
        read: true,
      },
    });
  },
};
