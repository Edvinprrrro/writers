import { NextFunction, Response, Request } from "express";
import Book from "./book.model.js";
import Chapter from "../chapters/chapter.model.js";
import bookSchemas, {
  createBookInput,
  updateBookInput,
} from "./book.schemas.js";
import { addBookToDatabase } from "./book.services.js";
import getFileLocation from "../../globalServices/getFileLocation.js";

const createBook = async (
  req: Request<any, any, createBookInput>,
  res: Response,
  next: NextFunction
): Promise<any> => {
  let book: any;
  try {
    const userId = req.user!.id;
    const { title, description } = req.body;
    const bookData = { userId, title, description };
    book = await addBookToDatabase(bookData);
  } catch (error: any) {
    return next(error);
  }
  const location = getFileLocation(req.originalUrl, book._id);

  req.responseData = { location, status: 201, jsonReturned: book };
  next();
};

const updateBook = async (
  req: Request<{ bookId: string }, any, updateBookInput>,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const userId = req.user.id;
  const { title, description } = req.body;
  const { bookId } = req.params;

  // Check the updates that will be made
  const updates: Partial<updateBookInput> = {};
  Object.entries(req.body).forEach(([key, value]) => {
    if (value !== undefined) (updates as any)[key] = value;
  });

  const book = await Book.findByIdAndUpdate(bookId, updates);
  if (!book)
    return res
      .status(500)
      .json({ error: "An error ocurred trying to update the book" });

  return res.status(200).location(`books/${bookId}`).json(book);
};

const getAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const userId = req.user!.id;
  const books = await Book.find({ author: userId });
  if (!books)
    return res.status(404).json({ error: "There are not books for that user" });

  return res.status(200).json(books);
};

const getBookById = async (
  req: Request<{ bookId: string }, any, any>,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { bookId } = req.params;

  const book = await Book.findById(bookId);
  // TO DO: not cheking if the book exists
  return res.status(200).json(book);
};

const deleteBook = async (
  req: Request<{ bookId: string }, any, any>,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { bookId } = req.params;

  const book = await Book.findByIdAndDelete(bookId);
  const chapter = await Chapter.deleteMany({ book: bookId });

  return res
    .status(200)
    .json({ message: "Book and all of it's chapters succesfully deleted" });
};

export default {
  createBook,
  getBookById,
  deleteBook,
  getAllBooks,
  updateBook,
};
