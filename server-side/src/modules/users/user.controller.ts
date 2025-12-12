import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import User, { IUser } from "./user.model";
import { ILoginData, IRegisterData } from "./user.types";
import { HydratedDocument } from "mongoose";
import { AuthRequest } from "../../middleware/authenticateAccessToken";
import Book from "../books/book.model";
import Chapter from "../chapters/chapter.model";
import Character from "../characters/character.model";
import PlotPoint from "../plotPoints/plotPoint.model";

interface RegisterUserRequest extends AuthRequest {
  body: IRegisterData;
}

export const registerUser = async (
  req: RegisterUserRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { email, username, password, repeatedPassword } = req.body;
  // Check if all the fields are sent
  if (!email || !username || !password || !repeatedPassword) {
    return res
      .status(400)
      .json({ error: "Missing fields to register a valid user" });
  }

  // Check if the repeated password matches the password
  if (password !== repeatedPassword)
    return res.status(400).json({ error: "Passwords do not match" });

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

  req.user = user;
  next();
};

interface LoginUserRequest extends AuthRequest {
  body: ILoginData;
}

export const loginUser = async (
  req: LoginUserRequest,
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

  req.user = user;
  next();
};

export const deleteUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const id = req.user!._id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const books = await Book.find({ author: id });
    const bookIds = books.map((book) => book._id);
    await Chapter.deleteMany({ book: { $in: bookIds } });
    await Character.updateMany(
      { books: { $in: bookIds } },
      { $pull: { books: { $in: bookIds } } }
    );
    await Character.deleteMany({ books: { $size: 0 } });
    await PlotPoint.deleteMany({ book: { $in: bookIds } });
    await Book.deleteMany({ author: id });
    await User.findByIdAndDelete(id);

    return res.status(200).json(user);
  } catch (err) {
    return res.status(401).json({ error: err });
  }
};
