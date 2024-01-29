import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

export class ChatController {
  async list(_: Request, res: Response) {
    const chats = await prisma.chat.findMany();
    return res.json(chats);
  }

  async createChat(req: Request, res: Response) {
    const { name: chatName, userId } = req.body;

    if (!chatName || !userId) {
      return res.status(400).json({ error: "Missing fields." });
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
    });

    if (!existingUser) {
      return res
        .status(400)
        .json({ error: `Failed to find user with id: ${userId}` });
    }

    const chat = await prisma.chat.create({
      data: {
        name: chatName,
        users: {
          connect: {
            id: existingUser.id,
          },
        },
      },
    });

    return res.status(200).json(chat);
  }
}
