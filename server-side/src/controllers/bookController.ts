import { NextFunction, Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import Book from "../models/Book";
import { IAddBook } from "../types/Book";
import Chapter from "../models/Chapter";

interface AddBookRequest extends AuthRequest {
  body: IAddBook;
}

export const createBook = async (
  req: AddBookRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const userId = req.user!._id;
  const { title, description } = req.body;
  if (!title || !description)
    return res
      .status(400)
      .json({ error: "The body does not have all the required fields" });

  const book = await Book.create({
    title,
    description,
    author: userId,
  });
  if (!book)
    return res
      .status(500)
      .json({ error: "There was an error creating the book" });

  return res.status(201).location(`/books/${book._id}`).json(book);
};

interface UpdateBookRequest extends AuthRequest {
  params: {
    id: string;
  };
  body: IAddBook;
}

export const updateBook = async (
  req: UpdateBookRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const userId = req.user!._id;
  const { title, description } = req.body;
  if (!title && !description)
    return res.status(400).json({ error: "No changes were sent to make" });

  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "No book was sent to update" });

  // Check the updates that will be made
  const updates: Partial<IAddBook> = {};
  Object.entries(req.body).forEach(([key, value]) => {
    if (value !== undefined) (updates as any)[key] = value;
  });

  const book = await Book.findByIdAndUpdate(id, updates);
  if (!book)
    return res.status(500).json("An error ocurred trying to update the book");

  return res.status(200).location(`books/${id}`).json(book);
};

export const getBooks = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const userId = req.user!.id;
  const books = await Book.find({ author: userId });
  if (!books)
    return res.status(404).json({ error: "There are not books for that user" });

  return res.status(200).json(books);
};

interface BookIdRequest extends AuthRequest {
  params: {
    id: string;
  };
}

export const getBook = async (
  req: BookIdRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "Did not provide id" });

  const book = await Book.findById(id);
  return res.status(200).json(book);
};

export const deleteBook = async (
  req: BookIdRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { id } = req.params;

  const book = await Book.findByIdAndDelete(id);
  const chapter = await Chapter.deleteMany({ book: id });

  return res
    .status(200)
    .json({ message: "Book and all of it's chapters succesfully deleted" });
};
