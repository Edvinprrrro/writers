import express from "express";
import { authenticateAccessToken } from "../../middleware/authenticateAccessToken.js";
import chapterController from "./chapter.controller.js";
import { authenticateBookIsFromThisUser } from "../../middleware/authenticateBookIsFromThisUser.js";
import { validateRequest } from "../../middleware/validateRequest.js";

const router = express.Router();

router.get(
  "/",
  authenticateAccessToken,
  validateRequest,
  chapterController.getAllChapters
);
router.get(
  "/:chapterId",
  authenticateAccessToken,
  validateRequest,
  authenticateBookIsFromThisUser,
  chapterController.getChapterById
);
router.post(
  "/",
  authenticateAccessToken,
  validateRequest,
  authenticateBookIsFromThisUser,
  chapterController.createChapter
);
router.put(
  "/:chapterId",
  authenticateAccessToken,
  validateRequest,
  authenticateBookIsFromThisUser,
  chapterController.updateChapter
);
router.delete(
  "/:chapterId",
  authenticateAccessToken,
  validateRequest,
  authenticateBookIsFromThisUser,
  chapterController.deleteChapter
);

export default router;
