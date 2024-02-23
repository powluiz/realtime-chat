import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

export class UserController {
  async list(_: Request, res: Response) {
    const users = await prisma.user.findMany();
    return res.json(users);
  }

  async register(req: Request, res: Response) {
    const requestBody = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string(),
    });

    const { name, email, password } = requestBody.parse(req.body);

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Missing fields." });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (!!existingUser) {
      return res.status(400).json({ error: "User already exists." });
    }

    const hashPassword = await bcrypt.hash(password, 8);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
        avatar: "",
      },
    });

    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    return res.status(200).json(userData);
  }

  async getMe(req: Request, res: Response) {
    const requestBody = z.object({
      userId: z.string(),
    });

    const { userId } = requestBody.parse(req.body);

    if (!userId) {
      return res.status(400).json({ error: "Missing userId." });
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
    });

    if (!existingUser) {
      return res
        .status(400)
        .json({ error: `Failed to find user with id: ${userId}` });
    }

    const userData = {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      avatar: existingUser.avatar,
    };

    return res.status(200).json(userData);
  }

  async updateUser(req: Request, res: Response) {
    const requestBody = z.object({
      userId: z.string(),
      name: z.string(),
      email: z.string().email(),
      avatar: z.string(),
    });

    const { userId, name, email, avatar } = requestBody.parse(req.body);

    if (!userId) {
      return res.status(400).json({ error: "Missing userId." });
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
    });

    if (!existingUser) {
      return res
        .status(400)
        .json({ error: `Failed to find user with id: ${userId}` });
    }

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(userId) },
      data: {
        name,
        email,
        avatar,
      },
    });

    const userData = {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      avatar: updatedUser.avatar,
    };

    return res.status(200).json(userData);
  }

  async deleteUser(req: Request, res: Response) {
    const requestBody = z.object({
      userId: z.string(),
    });

    const { userId } = requestBody.parse(req.body);

    if (!userId) {
      return res.status(400).json({ error: "Missing userId." });
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
    });

    if (!existingUser) {
      return res
        .status(400)
        .json({ error: `Failed to find user with id: ${userId}` });
    }

    await prisma.user.delete({ where: { id: parseInt(userId) } });

    return res.status(200).json({ message: "User deleted successfully." });
  }
}
