import * as z from "zod";

const createBookSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    description: z.string().optional(),
  }),
});

const getBookByIdSchema = z.object({
  params: z.object({
    bookId: z.string().min(1),
  }),
});

const updateBookSchema = z.object({
  params: z.object({
    bookId: z.string().min(1),
  }),
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }),
});

const deleteBookSchema = z.object({
  params: z.object({
    bookId: z.string().min(1),
  }),
});

export default {
  createBookSchema,
  getBookByIdSchema,
  updateBookSchema,
  deleteBookSchema,
};
