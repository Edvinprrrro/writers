import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import User, { IUser } from "../models/User";
import jwt, { JwtPayload } from "jsonwebtoken";
import { error } from "console";
import { ILoginData, IRegisterData } from "../types/User";

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
  const user: IUser | null = await User.findOne({ username: username });
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
  const payload = { id: user._id.toString(), username: user.username };
  const token = jwt.sign(payload, JWT_KEY, { expiresIn: "2d" });
  return res
    .status(200)
    .json({ message: "Succesfully signed in", token: token });
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const authorizationHeader = req.header("Authorization");

  // Check if there is a header or if it's well created
  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Missing or malformed Authorization header" });
  }

  const token = authorizationHeader?.split(" ")[1];
  // Validate the JWT
  try {
    const decoded: JwtPayload = jwt.verify(token, JWT_KEY) as JwtPayload;
    await User.findByIdAndDelete(decoded.id);
    return res.status(204);
  } catch (err) {
    res.status(401).json({ error: `Invalid token: ${err}` });
  }
};
