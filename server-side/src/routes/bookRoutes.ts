import express from "express";
import {
  createBook,
  deleteBook,
  getBook,
  getBooks,
  updateBook,
} from "../controllers/bookController";
import { authAccessJwtToken } from "../middleware/authAccessTokenMiddleware.ts";
import {
  createChapter,
  deleteChapter,
  getAllChapters,
  getChapterById,
  updateChapter,
} from "../controllers/chapterController";
import {
  validateBookByBookId,
  validateBookById,
} from "../middleware/validateBook";
import {
  createCharacter,
  deleteCharacter,
  getAllCharacters,
  getCharacterById,
  updateCharacter,
} from "../controllers/characterController";
import {
  createPlotPoint,
  deletePlotPoint,
  getPlotPoint,
  getPlotPoints,
  updatePlotPoint,
} from "../controllers/plotPointController";

const router = express.Router();

router.post("/", authAccessJwtToken, createBook);
router.put("/:id", authAccessJwtToken, validateBookById, updateBook);
router.get("/", authAccessJwtToken, getBooks);
router.get("/:id", authAccessJwtToken, validateBookById, getBook);
router.delete("/:id", authAccessJwtToken, validateBookById, deleteBook);

// Chapter routes
router.post(
  "/:bookId/chapters",
  authAccessJwtToken,
  validateBookByBookId,
  createChapter
);
router.get(
  "/:bookId/chapters",
  authAccessJwtToken,
  validateBookByBookId,
  getAllChapters
);
router.get(
  "/:bookId/chapters/:id",
  authAccessJwtToken,
  validateBookByBookId,
  getChapterById
);
router.put(
  "/:bookId/chapters/:id",
  authAccessJwtToken,
  validateBookByBookId,
  updateChapter
);
router.delete(
  "/:bookId/chapters/:id",
  authAccessJwtToken,
  validateBookByBookId,
  deleteChapter
);

// Character routes
router.get(
  "/:bookId/characters",
  authAccessJwtToken,
  validateBookByBookId,
  getAllCharacters
);
router.get(
  "/:bookId/characters/:id",
  authAccessJwtToken,
  validateBookByBookId,
  getCharacterById
);
router.post(
  "/:bookId/characters",
  authAccessJwtToken,
  validateBookByBookId,
  createCharacter
);
router.put(
  "/:bookId/characters/:id",
  authAccessJwtToken,
  validateBookByBookId,
  updateCharacter
);
router.delete(
  "/:bookId/characters/:id",
  authAccessJwtToken,
  validateBookByBookId,
  deleteCharacter
);

// Plot points routes
router.get(
  "/:bookId/plotpoints",
  authAccessJwtToken,
  validateBookByBookId,
  getPlotPoints
);
router.get(
  "/:bookId/plotpoints/:id",
  authAccessJwtToken,
  validateBookByBookId,
  getPlotPoint
);
router.post(
  "/:bookId/plotpoints",
  authAccessJwtToken,
  validateBookByBookId,
  createPlotPoint
);
router.put(
  "/:bookId/plotpoints/:id",
  authAccessJwtToken,
  validateBookByBookId,
  updatePlotPoint
);
router.delete(
  ":bookId/plotpoints/:id",
  authAccessJwtToken,
  validateBookByBookId,
  deletePlotPoint
);

export default router;
