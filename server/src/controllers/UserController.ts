import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import bcrypt from "bcryptjs";

export class UserController {
  async index(_: Request, res: Response) {
    const users = await prisma.user.findMany();
    return res.json(users);
  }

  async store(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (!!existingUser) {
      return res.json({ error: "User already exists!" });
    }

    const hashPassword = await bcrypt.hash(password, 8);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    });

    return res.json(user);
  }
}
