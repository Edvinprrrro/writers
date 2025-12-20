import { NextFunction, Response, Request } from "express";
import {
  CreateBookInput,
  UpdateBookInput,
  DeleteBookInput,
  GetBookByIdInput,
} from "./book.inputs.js";
import {
  addBookToDatabase,
  deleteBookAndChapters,
  getAllBooksByIdFromDB,
  updateBookInDatabase,
} from "./book.services.js";
import getFileLocation from "../../globalServices/getFileLocation.js";
import getUpdates from "../../globalServices/getUpdates.js";
import { getAllBooksFromUser } from "./book.services.js";

const createBook = async (
  req: Request<any, any, CreateBookInput["body"]>,
  res: Response,
  next: NextFunction
): Promise<any> => {
  let book: any;
  try {
    const userId = req.user!.id;
    const { title, description } = req.body;
    const bookData = { userId, title, description };
    book = await addBookToDatabase(bookData);

    const location = getFileLocation(req.originalUrl, book._id);
    req.responseData = { location, status: 201, body: book };

    next();
  } catch (error: any) {
    return next(error);
  }
};

const updateBook = async (
  req: Request<UpdateBookInput["params"], any, UpdateBookInput["body"]>,
  res: Response,
  next: NextFunction
): Promise<any> => {
  let book: any;
  try {
    const { bookId } = req.params;
    const updates = getUpdates(req.body);
    book = updateBookInDatabase(bookId, updates);

    const location = getFileLocation(req.originalUrl, book._id);
    req.responseData = { location, status: 201, body: book };

    next();
  } catch (error: any) {
    return next(error);
  }
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

    req.responseData = { body: books, status: 200 };
    next();
  } catch (error: any) {
    next(error);
  }
};

const getBookById = async (
  req: Request<GetBookByIdInput["params"], any, any>,
  res: Response,
  next: NextFunction
): Promise<any> => {
  let book = {};
  try {
    const { bookId } = req.params;
    book = getAllBooksByIdFromDB(bookId);

    req.responseData = { body: book, status: 200 };
    next();
  } catch (error: any) {
    next(error);
  }
};

const deleteBook = async (
  req: Request<DeleteBookInput["params"], any, any>,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { bookId } = req.params;
    await deleteBookAndChapters(bookId);

    req.responseData = {
      body: { message: "Succesfully deleted" },
      status: 200,
    };
    next();
  } catch (error: any) {
    next(error);
  }
};

export default {
  createBook,
  getBookById,
  deleteBook,
  getAllBooks,
  updateBook,
};
