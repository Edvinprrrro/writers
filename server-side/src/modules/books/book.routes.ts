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

router.use(authenticateAccessToken);

router.get("/", authenticateAccessToken, bookController.getAllBooks);

router.get(
  "/:bookId",
  validateRequest(getBookByIdSchema),
  authenticateBookIsFromThisUser,
  bookController.getBookById
);

router.post("/", validateRequest(createBookSchema), bookController.createBook);

router.put(
  "/:bookId",
  validateRequest(updateBookSchema),
  authenticateBookIsFromThisUser,
  bookController.updateBook
);

router.delete(
  "/:bookId",
  validateRequest(deleteBookSchema),
  authenticateBookIsFromThisUser,
  bookController.deleteBook
);

router.use(sendScucesfullResponse);

export default router;
