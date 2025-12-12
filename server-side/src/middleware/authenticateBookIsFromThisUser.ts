import { NextFunction, Response, Request } from "express";
import Book from "../modules/books/book.model.js";

export const authenticateBookIsFromThisUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const bookId = req.params.bookId;
  const userId = req.user!.id;

  const book = await Book.findById(bookId);
  if (!book) return res.status(404).json({ error: "Book not found" });
  if (book.author.toString() !== userId.toString())
    return res.status(401).json({ error: "Not author of this book" });

  return next();
};
