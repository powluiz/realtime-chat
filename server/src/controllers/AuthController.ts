import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class AuthController {
  async authenticate(req: Request, res: Response) {
    const jwtSecret = process.env.JWT_SECRET as string;
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user?.password);

    if (!isPasswordValid) {
      return res.json({ error: "Invalid password" });
    }

    const accessToken = jwt.sign({ id: user.id }, jwtSecret, {
      expiresIn: "1d",
    });
    return res.json({ user, accessToken });
  }
}
