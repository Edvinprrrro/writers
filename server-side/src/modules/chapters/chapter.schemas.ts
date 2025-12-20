import * as z from "zod";

/* =========================
   Atomic schemas 
   ========================= */

const createChapterBodySchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  order: z.number().min(1),
});

const updateChapterBodySchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  order: z.number().min(1),
});

const chapterIdParamsSchema = z.object({
  chapterId: z.string().min(1),
});

/* =========================
   Composed request schemas
   ========================= */

export const getChapterByIdSchema = chapterIdParamsSchema;
export const deleteChapterSchema = chapterIdParamsSchema;
export const createChapterSchema = createChapterBodySchema;
export const updateChapterSchema = chapterIdParamsSchema.merge(
  updateChapterBodySchema
);
