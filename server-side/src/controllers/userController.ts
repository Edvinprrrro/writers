import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res
      .status(400)
      .json({ error: "Missing fields to register a valid user" });
  }

  const existingEmail = await User.findOne({ email: email });
  if (existingEmail != null) {
    return res.status(400).json({ error: "Email already being used" });
  }

  const existingUsername = await User.findOne({ username: username });
  if (existingUsername != null) {
    return res.status(400).json({ error: "Username already taken" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    email,
    passwordHash,
  });

  await user.save();

  return res.status(201).json({ message: "User added succesfully" });
};
