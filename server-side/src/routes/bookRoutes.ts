import express from "express";
import {
  createBook,
  deleteBook,
  getBook,
  getBooks,
  updateBook,
} from "../controllers/bookController";
import { authJwtToken } from "../middleware/authMiddleware";
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

router.post("/", authJwtToken, createBook);
router.put("/:id", authJwtToken, validateBookById, updateBook);
router.get("/", authJwtToken, getBooks);
router.get("/:id", authJwtToken, validateBookById, getBook);
router.delete("/:id", authJwtToken, validateBookById, deleteBook);

// Chapter routes
router.post(
  "/:bookId/chapters",
  authJwtToken,
  validateBookByBookId,
  createChapter
);
router.get(
  "/:bookId/chapters",
  authJwtToken,
  validateBookByBookId,
  getAllChapters
);
router.get(
  "/:bookId/chapters/:id",
  authJwtToken,
  validateBookByBookId,
  getChapterById
);
router.put(
  "/:bookId/chapters/:id",
  authJwtToken,
  validateBookByBookId,
  updateChapter
);
router.delete(
  "/:bookId/chapters/:id",
  authJwtToken,
  validateBookByBookId,
  deleteChapter
);

// Character routes
router.get(
  "/:bookId/characters",
  authJwtToken,
  validateBookByBookId,
  getAllCharacters
);
router.get(
  "/:bookId/characters/:id",
  authJwtToken,
  validateBookByBookId,
  getCharacterById
);
router.post(
  "/:bookId/characters",
  authJwtToken,
  validateBookByBookId,
  createCharacter
);
router.put(
  "/:bookId/characters/:id",
  authJwtToken,
  validateBookByBookId,
  updateCharacter
);
router.delete(
  "/:bookId/characters/:id",
  authJwtToken,
  validateBookByBookId,
  deleteCharacter
);

// Plot points routes
router.get(
  "/:bookId/plotpoints",
  authJwtToken,
  validateBookByBookId,
  getPlotPoints
);
router.get(
  "/:bookId/plotpoints/:id",
  authJwtToken,
  validateBookByBookId,
  getPlotPoint
);
router.post(
  "/:bookId/plotpoints",
  authJwtToken,
  validateBookByBookId,
  createPlotPoint
);
router.put(
  "/:bookId/plotpoints/:id",
  authJwtToken,
  validateBookByBookId,
  updatePlotPoint
);
router.delete(
  ":bookId/plotpoints/:id",
  authJwtToken,
  validateBookByBookId,
  deletePlotPoint
);

export default router;
