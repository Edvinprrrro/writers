import * as z from "zod";
import { bookIdParamsSchema } from "../books/book.schemas";

/* =========================
   Atomic schemas 
   ========================= */

const createChapterBodySchema = z.object({
  body: z.object({
    title: z.string().min(1),
    content: z.string().min(1),
    order: z.number().min(1),
  }),
});

const updateChapterBodySchema = z.object({
  body: z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    order: z.number().optional(),
  }),
});

const chapterIdParamsSchema = z.object({
  params: z.object({
    chapterId: z.string().min(1),
    boookId: z.string().min(1),
  }),
});

/* =========================
   Composed request schemas
   ========================= */

export const getChapterByIdSchema = chapterIdParamsSchema;
export const deleteChapterSchema = chapterIdParamsSchema;
export const createChapterSchema =
  createChapterBodySchema.merge(bookIdParamsSchema);
export const getAllChaptersSchema = bookIdParamsSchema;
export const updateChapterSchema = chapterIdParamsSchema.merge(
  updateChapterBodySchema
);
