import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";

export class AuthController {
  async login(req: Request, res: Response) {
    const jwtSecret = process.env.JWT_SECRET as string;
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user?.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const accessToken = sign({ id: user.id }, jwtSecret, {
      expiresIn: "1d",
    });

    return res.json({ userId: user.id, accessToken: accessToken });
  }
}
