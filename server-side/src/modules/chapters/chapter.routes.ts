import express from "express";
import { authenticateAccessToken } from "../../middleware/authenticateAccessToken.js";
import { authenticateBookIsFromThisUser } from "../../middleware/authenticateBookIsFromThisUser.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import {
  createChapterSchema,
  deleteChapterSchema,
  getAllChaptersSchema,
  getChapterByIdSchema,
  updateChapterSchema,
} from "./chapter.schemas.js";
import {
  getAllChapters,
  getChapterById,
  updateChapter,
  createChapter,
  deleteChapter,
} from "./chapter.controller.js";

const router = express.Router({ mergeParams: true });

router.use(authenticateAccessToken);

router.get("/", validateRequest(getAllChaptersSchema), getAllChapters);

router.get(
  "/:chapterId",
  validateRequest(getChapterByIdSchema),
  authenticateBookIsFromThisUser,
  getChapterById
);
router.post(
  "/",
  validateRequest(createChapterSchema),
  authenticateBookIsFromThisUser,
  createChapter
);

router.put(
  "/:chapterId",
  validateRequest(updateChapterSchema),
  authenticateBookIsFromThisUser,
  updateChapter
);
router.delete(
  "/:chapterId",
  validateRequest(deleteChapterSchema),
  authenticateBookIsFromThisUser,
  deleteChapter
);

export default router;
