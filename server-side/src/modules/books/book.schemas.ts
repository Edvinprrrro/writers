import * as z from "zod";

/* =========================
   Atomic schemas 
   ========================= */

const bookIdParamsSchema = z.object({
  params: z.object({
    bookId: z.string().min(1),
  }),
});

const createBookBodySchema = z.object({
  body: z.object({
    title: z.string().min(1),
    description: z.string().optional(),
  }),
});

const updateBookBodySchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }),
});

/* =========================
   Composed request schemas
   ========================= */

export const getBookByIdSchema = bookIdParamsSchema;
export const deleteBookSchema = bookIdParamsSchema;
export const createBookSchema = createBookBodySchema;
export const updateBookSchema = bookIdParamsSchema.merge(updateBookBodySchema);

e;
