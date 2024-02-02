import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { IncomingMessage } from "../types/Message";

export class ChatController {
  async list(_: Request, res: Response) {
    const chats = await prisma.chat.findMany();
    return res.json(chats);
  }

  async createMessage(req: Request, res: Response) {
    const { senderId, chatId, content }: IncomingMessage = req.body;

    if (!senderId || !chatId || !content) {
      return res.status(400).json({ error: "Missing fields." });
    }

    const chat = await prisma.chat.findUnique({
      where: { id: parseInt(chatId) },
    });

    if (!chat) {
      return res
        .status(400)
        .json({ error: `Failed to find chat with id: ${chatId}` });
    }

    const sender = await prisma.user.findUnique({
      where: { id: parseInt(senderId) },
    });

    if (!sender) {
      return res
        .status(400)
        .json({ error: `Failed to find user with id: ${senderId}` });
    }

    const message = await prisma.message.create({
      data: {
        text: content.text,
        image: content.image,
        chat: { connect: { id: chat.id } },
        sender: { connect: { id: sender.id } },
      },
    });

    return res.status(200).json(message);
  }
}
