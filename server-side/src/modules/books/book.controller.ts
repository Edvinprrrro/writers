import { NextFunction, Response, Request } from "express";
import getUpdates from "../../globalServices/getUpdates.js";
import Book from "./book.model.js";
import { NotFoundError } from "../../errors/notFoundError.js";
import { deleteBookAndChapters } from "./book.services.js";

export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const book = new Book();
    book.title = req.body.title;
    book.description = req.body.description;
    book.author = req.user!.id;
    await book.save();

    const location = req.originalUrl + book._id;
    return res.status(201).location(location).json(book);
  } catch (error: any) {
    return next(error);
  }
};

export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { bookId } = req.params;
    const updates = getUpdates(req.body);
    const book = await Book.findByIdAndUpdate(bookId, updates);
    if (!book) throw new NotFoundError();

    const location = req.originalUrl + book._id;
    return res.status(200).location(location).json(book);
  } catch (error: any) {
    return next(error);
  }
};

export const getAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const userId = req.user!.id;
    const books = await Book.find({ author: userId });
    if (!books) throw new NotFoundError();

    return res.status(200).json(books);
  } catch (error: any) {
    next(error);
  }
};

export const getBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { bookId } = req.params;
    const book = await Book.findById(bookId);
    if (!book) throw new NotFoundError();

    return res.status(200).json(book);
  } catch (error: any) {
    next(error);
  }
};

export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { bookId } = req.params;
    await deleteBookAndChapters(bookId);

    return res.status(200).json({ message: "Succesfully deleted" });
  } catch (error: any) {
    next(error);
  }
};
