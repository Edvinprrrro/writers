import { NextFunction, Request, Response } from "express";
import User from "./user.model";
import Chapter from "../chapters/chapter.model";
import Character from "../characters/character.model";
import PlotPoint from "../plotPoints/plotPoint.model";
import { HttpError } from "../../errors/httpError";
import { NotFoundError } from "../../errors/notFoundError";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { password, repeatedPassword, email, username } = req.body;

    if (password === repeatedPassword)
      throw new HttpError(400, "Passwords do not match");

    const existingEmail = await User.findOne({ email });
    if (existingEmail) throw new HttpError(400, "Email already being used");

    const existingUsername = await User.findOne({ username });
    if (existingUsername) throw new HttpError(400, "Username is taken");

    const user = new User();
    user.email = email;
    user.username = username;
    user.setPassword(password);
    await user.save();

    const tokenSignature = user.generateJwt();
    return res.status(201).json(tokenSignature);
  } catch (error: any) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { password, username } = req.body;
    const user = await User.findOne({ username });

    if (!user) throw new NotFoundError();
    if (!user.isPasswordValid(password))
      throw new HttpError(401, "Incorrect password");

    const tokenSignature = user.generateJwt();
    return res.status(200).json(tokenSignature);
  } catch (error: any) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
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
