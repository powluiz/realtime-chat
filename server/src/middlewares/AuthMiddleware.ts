import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface ITokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export const AuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization Token not provided" });
  }

  const [_, token] = authorization.split(" ");
  const jwtSecret = process.env.JWT_SECRET as string;

  try {
    const decoded = verify(token, jwtSecret);
    const { id } = decoded as ITokenPayload;

    req.userId = id;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid Token" });
  }
};
