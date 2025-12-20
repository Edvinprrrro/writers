import * as z from "zod";

const chapterParamsSchema = z.object({
  params: z.object({
    chapterId: z.string().min(1),
  }),
});

const createChapterBodySchema = z.object({
  body: z.object({
    title: z.string().min(1),
    content: z.string().min(1),
    order: z.number().min(1),
  }),
});

const createChapterRequestSchema = z.object({
  createChapterBodySchema,
});

const updateChapterBodySchema = z.object({
  body: z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    order: z.number().optional(),
  }),
});

const updateChapterRequestSchema = z.object({
  updateChapterBodySchema,
  chapterParamsSchema,
});

const getAllChaptersBodySchema;
