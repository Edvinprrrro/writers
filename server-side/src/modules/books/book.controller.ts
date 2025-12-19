import { NextFunction, Response, Request } from "express";
import Book from "./book.model.js";
import Chapter from "../chapters/chapter.model.js";
import { createBookInput, updateBookInput } from "./book.schemas.js";
import { addBookToDatabase, updateBookInDatabase } from "./book.services.js";
import getFileLocation from "../../globalServices/getFileLocation.js";
import getUpdates from "../../globalServices/getUpdates.js";
import { getAllBooksFromUser } from "./book.services.js";

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
  req.responseData = { location, status: 201, body: book };

  next();
};

const updateBook = async (
  req: Request<{ bookId: string }, any, updateBookInput>,
  res: Response,
  next: NextFunction
): Promise<any> => {
  let book: any;
  try {
    const { bookId } = req.params;
    const updates = getUpdates(req.body);

    book = updateBookInDatabase(bookId, updates);
  } catch (error: any) {
    return next(error);
  }

  const location = getFileLocation(req.originalUrl, book._id);
  req.responseData = { location, status: 201, body: book };

  next();
};

const getAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  let books = {};
  try {
    const userId = req.user!.id;
    books = getAllBooksFromUser(userId);
  } catch (error: any) {
    next(error);
  }

  req.responseData = { body: books, status: 200 };
  next();
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
