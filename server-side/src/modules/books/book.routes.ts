import express from "express";
import bookController from "./book.controller.js";
import sanitizeRequest from "../../middleware/sanitizeRequest.js";
import { authenticateAccessToken } from "../../middleware/authenticateAccessToken.js";
import { authenticateBookIsFromThisUser } from "../../middleware/authenticateBookIsFromThisUser.js";
import bookSchemas from "./book.schemas.js";

const router = express.Router();

router.get("/", authenticateAccessToken, bookController.getAllBooks);

router.get(
  "/:bookId",
  authenticateAccessToken,
  sanitizeRequest(bookSchemas.getBookByIdRequestSchema),
  authenticateBookIsFromThisUser,
  bookController.getBookById
);

router.post(
  "/",
  authenticateAccessToken,
  sanitizeRequest(bookSchemas.createBookRequestSchema),
  bookController.createBook
);

router.put(
  "/:bookId",
  authenticateAccessToken,
  sanitizeRequest(bookSchemas.updateBookRequestSchema),
  authenticateBookIsFromThisUser,
  bookController.updateBook
);

router.delete(
  "/:bookId",
  authenticateAccessToken,
  sanitizeRequest(bookSchemas.deleteBookRequestSchema),
  authenticateBookIsFromThisUser,
  bookController.deleteBook
);

export default router;
