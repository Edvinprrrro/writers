import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import User, { IUser } from "../models/User";
import jwt from "jsonwebtoken";
import { ILoginData, IRegisterData } from "../types/User";
import { HydratedDocument } from "mongoose";
import { AuthRequest } from "../middleware/authMiddleware";

const JWT_KEY = process.env.JWT_KEY;
if (!JWT_KEY) {
  throw new Error("Missing JWT_KEY environment variable");
}

export const registerUser = async (
  req: Request<{}, {}, IRegisterData>,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { email, username, password } = req.body;
  // Check if all the fields are sent
  if (!email || !username || !password) {
    return res
      .status(400)
      .json({ error: "Missing fields to register a valid user" });
  }

  // Check if the email is already being used
  const existingEmail = await User.findOne({ email: email });
  if (existingEmail != null) {
    return res.status(400).json({ error: "Email already being used" });
  }

  // Check if the username is taken
  const existingUsername = await User.findOne({ username: username });
  if (existingUsername != null) {
    return res.status(400).json({ error: "Username already taken" });
  }

  // Encrypt the password
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

export const loginUser = async (
  req: Request<{}, {}, ILoginData>,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { password, username } = req.body;

  // Check if all fields are sent
  if (!password || !username) {
    return res.status(400).json({ error: "Missing fields" });
  }

  // Check if user exists by that username
  const user: HydratedDocument<IUser> | null = await User.findOne({ username });
  if (!user) {
    return res
      .status(400)
      .json({ error: "User not found, incorrect username" });
  }

  // Check if password is correct
  const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordCorrect) {
    return res.status(400).json({ error: "Incorrect paswword" });
  }

  // Sign the user in by sending the jwt token
  const payload = { id: user.id.toString(), username: user.username };
  const token = jwt.sign(payload, JWT_KEY, { expiresIn: "2d" });
  return res
    .status(200)
    .json({ message: "Succesfully signed in", token: token });
};

export const deleteUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const user = req.user;

    if (user === undefined) {
      return res.status(401).json({ error: "Unathoriazed" });
    }

    const userId = user._id;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // TO DO Delete all the boocks, chapters, plotpoints, characters from that user;
    return res.status(200).json({ message: "User deleted" });
  } catch (err) {
    return res.status(401).json({ error: err });
  }
};
