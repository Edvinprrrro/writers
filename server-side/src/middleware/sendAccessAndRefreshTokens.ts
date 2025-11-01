import { Response, NextFunction } from "express";
import { AuthRequest } from "./authAccessTokenMiddleware.ts";
import jwt from "jsonwebtoken";

const JWT_ACCESS_KEY = process.env.JWT_ACCESS_KEY;
if (!JWT_ACCESS_KEY)
  throw new Error("Missing JWT_ACCESS_KEY enviroment variable");

const JWT_REFRESH_KEY = process.env.JWT_REFRESH_KEY;
if (!JWT_REFRESH_KEY)
  throw new Error("Missing JWT_REFRESH_KE enviroment variable");

export const sendTokens = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const user = req.user;
  if (!user)
    return res.status(500).json({ error: "User not found in the request" });

  const payload = { id: user.id, username: user.username };

  const accessToken = jwt.sign(payload, JWT_ACCESS_KEY, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign(payload, JWT_REFRESH_KEY, {
    expiresIn: "7d",
  });

  res.status(200).json({
    message: "Tokens sent successfully",
    accessToken,
    refreshToken,
  });
};
