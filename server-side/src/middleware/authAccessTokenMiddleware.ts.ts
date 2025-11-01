import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/User";
import { IUser } from "../models/User";

const JWT_ACCESS_KEY = process.env.JWT_ACCESS_KEY;
if (!JWT_ACCESS_KEY) {
  throw new Error("Missing JWT_ACCESS_KEY environment variable");
}

export interface AuthRequest extends Request {
  user?: IUser;
}

export const authAccessJwtToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Missing or malformed authorization header" });
  }

  const token = authHeader?.split(" ")[1];

  // Validate the JWT
  try {
    const decoded: JwtPayload = jwt.verify(token, JWT_ACCESS_KEY) as JwtPayload;
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid Token" });
  }
};
