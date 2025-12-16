import * as z from "zod";

const createBookBodySchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
});

const createBookRequestSchema = z.object({
  body: createBookBodySchema,
});

export type createBookInput = z.infer<typeof createBookBodySchema>;

const getBookByIdRequestSchema = z.object({
  params: z.object({
    bookId: z.string().min(1),
  }),
});

const updateBookBodySchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
});

const updateBookRequestSchema = z.object({
  params: updateBookBodySchema,
});

export type updateBookInput = z.infer<typeof updateBookBodySchema>;

const deleteBookRequestSchema = z.object({
  params: z.object({
    bookId: z.string().min(1),
  }),
});

export default {
  createBookRequestSchema,
  getBookByIdRequestSchema,
  updateBookRequestSchema,
  deleteBookRequestSchema,
};
