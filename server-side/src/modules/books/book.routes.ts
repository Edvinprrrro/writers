import express from "express";
import bookController from "./book.controller.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import { authenticateAccessToken } from "../../middleware/authenticateAccessToken.js";
import { authenticateBookIsFromThisUser } from "../../middleware/authenticateBookIsFromThisUser.js";
import bookSchemas from "./book.schemas.js";
import { sendScucesfullResponse } from "../../middleware/sendSuccesfullResponse.js";

const router = express.Router();

router.get("/", authenticateAccessToken, bookController.getAllBooks);

router.get(
  "/:bookId",
  authenticateAccessToken,
  validateRequest(bookSchemas.getBookByIdRequestSchema),
  authenticateBookIsFromThisUser,
  bookController.getBookById,
  sendScucesfullResponse
);

router.post(
  "/",
  authenticateAccessToken,
  validateRequest(bookSchemas.createBookRequestSchema),
  bookController.createBook,
  sendScucesfullResponse
);

router.put(
  "/:bookId",
  authenticateAccessToken,
  validateRequest(bookSchemas.updateBookRequestSchema),
  authenticateBookIsFromThisUser,
  bookController.updateBook,
  sendScucesfullResponse
);

router.delete(
  "/:bookId",
  authenticateAccessToken,
  validateRequest(bookSchemas.deleteBookRequestSchema),
  authenticateBookIsFromThisUser,
  bookController.deleteBook,
  sendScucesfullResponse
);

export default router;
