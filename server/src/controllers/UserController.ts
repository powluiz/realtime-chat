import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import bcrypt from "bcryptjs";

export class UserController {
  async index(_: Request, res: Response) {
    const users = await prisma.user.findMany();
    return res.json(users);
  }

  async register(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (!!existingUser) {
      return res.status(400).json({ error: "User already exists!" });
    }

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Missing fields!" });
    }

    const hashPassword = await bcrypt.hash(password, 8);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    });

    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    return res.status(200).json(userData);
  }
}
