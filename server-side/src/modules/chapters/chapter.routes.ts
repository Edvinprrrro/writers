import express from "express";
import { authenticateAccessToken } from "../../middleware/authenticateAccessToken.js";
import chapterController from "./chapter.controller.js";
import { authenticateBookIsFromThisUser } from "../../middleware/authenticateBookIsFromThisUser.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import {
  createChapterSchema,
  deleteChapterSchema,
  getAllChaptersSchema,
  getChapterByIdSchema,
  updateChapterSchema,
} from "./chapter.schemas.js";

const router = express.Router();

router.get(
  "/",
  authenticateAccessToken,
  validateRequest(getAllChaptersSchema),
  chapterController.getAllChapters
);
router.get(
  "/:chapterId",
  authenticateAccessToken,
  validateRequest(getChapterByIdSchema),
  authenticateBookIsFromThisUser,
  chapterController.getChapterById
);
router.post(
  "/",
  authenticateAccessToken,
  validateRequest(createChapterSchema),
  authenticateBookIsFromThisUser,
  chapterController.createChapter
);
router.put(
  "/:chapterId",
  authenticateAccessToken,
  validateRequest(updateChapterSchema),
  authenticateBookIsFromThisUser,
  chapterController.updateChapter
);
router.delete(
  "/:chapterId",
  authenticateAccessToken,
  validateRequest(deleteChapterSchema),
  authenticateBookIsFromThisUser,
  chapterController.deleteChapter
);

export default router;
