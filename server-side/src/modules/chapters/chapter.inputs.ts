import {
  getChapterByIdSchema,
  createChapterSchema,
  updateChapterSchema,
  deleteChapterSchema,
} from "./chapter.schemas";
import * as z from "zod";

export type GetChapterByIdInput = z.infer<typeof getChapterByIdSchema>;
export type CreateChapterInput = z.infer<typeof createChapterSchema>;
export type UpdateChapterInput = z.infer<typeof updateChapterSchema>;
export type DeleteChapterInput = z.infer<typeof deleteChapterSchema>;
