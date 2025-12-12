import express from "express";
import { authenticateAccessToken } from "../../middleware/authenticateAccessToken.js";
import { validateBody } from "../../middleware/validateBodyOfRequest";
import chapterController from "./chapter.controller.js";
import { authenticateBookIsFromThisUser } from "../../middleware/authenticateBookIsFromThisUser.js";

const router = express.Router();

router.get(
  "/",
  authenticateAccessToken,
  validateBody(),
  chapterController.getAllChapters
);
router.get(
  "/:chapterId",
  authenticateAccessToken,
  validateBody(),
  authenticateBookIsFromThisUser,
  chapterController.getChapterById
);
router.post(
  "/",
  authenticateAccessToken,
  validateBody,
  authenticateBookIsFromThisUser,
  chapterController.createChapter
);
router.put(
  "/:chapterId",
  authenticateAccessToken,
  validateBody,
  authenticateBookIsFromThisUser,
  chapterController.updateChapter
);
router.delete(
  "/:chapterId",
  authenticateAccessToken,
  validateBody,
  authenticateBookIsFromThisUser,
  chapterController.deleteChapter
);

export default router;
