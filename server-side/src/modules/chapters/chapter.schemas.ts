import * as z from "zod";

export const getChapterByIdSchema = z.object({
  params: z.object({
    chapterId: z.string().min(1),
    boookId: z.string().min(1),
  }),
});

export const deleteChapterSchema = z.object({
  params: z.object({
    chapterId: z.string().min(1),
    boookId: z.string().min(1),
  }),
});

export const createChapterSchema = z.object({
  params: z.object({
    boookId: z.string().min(1),
  }),
  body: z.object({
    title: z.string().min(1),
    content: z.string().min(1),
    order: z.number().min(1),
  }),
});

export const getAllChaptersSchema = z.object({
  pparams: z.object({
    boookId: z.string().min(1),
  }),
});

export const updateChapterSchema = z.object({
  params: z.object({
    chapterId: z.string().min(1),
    boookId: z.string().min(1),
  }),
  body: z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    order: z.number().optional(),
  }),
});
