import express from "express";
import bookController from "./book.controller.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import { authenticateAccessToken } from "../../middleware/authenticateAccessToken.js";
import { authenticateBookIsFromThisUser } from "../../middleware/authenticateBookIsFromThisUser.js";
import { sendScucesfullResponse } from "../../middleware/sendSuccesfullResponse.js";
import {
  createBookSchema,
  deleteBookSchema,
  getBookByIdSchema,
  updateBookSchema,
} from "./book.schemas.js";

const router = express.Router();

router.get("/", authenticateAccessToken, bookController.getAllBooks);

router.get(
  "/:bookId",
  authenticateAccessToken,
  validateRequest(getBookByIdSchema),
  authenticateBookIsFromThisUser,
  bookController.getBookById,
  sendScucesfullResponse
);

router.post(
  "/",
  authenticateAccessToken,
  validateRequest(createBookSchema),
  bookController.createBook,
  sendScucesfullResponse
);

router.put(
  "/:bookId",
  authenticateAccessToken,
  validateRequest(updateBookSchema),
  authenticateBookIsFromThisUser,
  bookController.updateBook,
  sendScucesfullResponse
);

router.delete(
  "/:bookId",
  authenticateAccessToken,
  validateRequest(deleteBookSchema),
  authenticateBookIsFromThisUser,
  bookController.deleteBook,
  sendScucesfullResponse
);

export default router;
