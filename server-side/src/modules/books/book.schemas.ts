import * as z from "zod";

export const getBookByIdSchema = z.object({
  params: z.object({
    bookId: z.string().min(1),
  }),
});

export const deleteBookSchema = z.object({
  params: z.object({
    bookId: z.string().min(1),
  }),
});

export const createBookSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    description: z.string().optional(),
  }),
});

export const updateBookSchema = z.object({
  params: z.object({
    bookId: z.string().min(1),
  }),
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }),
});
