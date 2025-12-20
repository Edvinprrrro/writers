import { Response, NextFunction, Request } from "express";
import User from "../modules/users/user.model.js";
import jwt, { JwtPayload } from "jsonwebtoken";
import RefreshToken from "../models/RefreshToken.js";

const JWT_REFRESH_KEY = process.env.JWT_REFRESH_KEY;
if (!JWT_REFRESH_KEY)
  throw new Error("Missing JWT_REFRESH_KE enviroment variable");

export const verifyRefreshToken = async (
  req: Request,
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
    const decoded: JwtPayload = jwt.verify(
      token,
      JWT_REFRESH_KEY
    ) as JwtPayload;
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Find the token in the database
    const dbToken = await RefreshToken.findOne({ user: user.id, token: token });
    if (!dbToken) return res.status(403).json({ error: "Invalid token" });
    const now = new Date();
    if (dbToken.revoked || now.getTime() > dbToken.expiresAt.getTime()) {
      console.log(now.getTime(), dbToken.expiresAt.getTime());
      console.log(dbToken);
      return res.status(403).json({ error: "Invalid token" });
    }

    req.user = {
      username: user.username,
      email: user.email,
      id: user._id as string,
    };
    await RefreshToken.findByIdAndUpdate(dbToken._id, { revoked: true });
    console.log("Going next");
    next();
  } catch (err) {
    return res.status(401).json({ error: err });
  }
};
