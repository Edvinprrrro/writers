import express from "express";
import { validateRequest } from "../../middleware/validateRequest.js";
import { authenticateAccessToken } from "../../middleware/authenticateAccessToken.js";
import { authenticateBookIsFromThisUser } from "../../middleware/authenticateBookIsFromThisUser.js";
import {
  createBookSchema,
  deleteBookSchema,
  getBookByIdSchema,
  updateBookSchema,
} from "./book.schemas.js";
import {
  getAllBooks,
  createBook,
  updateBook,
  deleteBook,
  getBookById,
} from "./book.controller.js";

const router = express.Router();

router.use(authenticateAccessToken);

router.get("/", getAllBooks);

router.get(
  "/:bookId",
  validateRequest(getBookByIdSchema),
  authenticateBookIsFromThisUser,
  getBookById
);

router.post("/", validateRequest(createBookSchema), createBook);

router.put(
  "/:bookId",
  validateRequest(updateBookSchema),
  authenticateBookIsFromThisUser,
  updateBook
);

router.delete(
  "/:bookId",
  validateRequest(deleteBookSchema),
  authenticateBookIsFromThisUser,
  deleteBook
);

export default router;
