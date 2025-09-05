import { NextFunction, Response } from "express";
import { AuthRequest } from "./authMiddleware";
import Book from "../models/Book";

interface BookIdRequest extends AuthRequest {
  params: {
    bookId: string;
  };
}

export const validateBookByBookId = async (
  req: BookIdRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { bookId } = req.params;
  const userId = req.user!.id;
  if (!bookId) return res.status(400).json({ error: "No book id provided" });

  const book = await Book.findById(bookId);
  if (!book) return res.status(404).json({ error: "Book not found" });
  if (book.author.toString() !== userId.toString())
    return res.status(401).json({ error: "Not author of this book" });

  next();
};

interface IdRequest extends AuthRequest {
  params: {
    id: string;
  };
}

export const validateBookById = async (
  req: IdRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { id } = req.params;
  const userId = req.user!.id;
  if (!id) return res.status(400).json({ error: "No book id provided" });

  const book = await Book.findById(id);
  if (!book) return res.status(404).json({ error: "Book not found" });
  if (book.author.toString() !== userId.toString())
    return res.status(401).json({ error: "Not author of this book" });

  next();
};
