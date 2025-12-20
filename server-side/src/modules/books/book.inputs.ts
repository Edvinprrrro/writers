import {
  getBookByIdSchema,
  createBookSchema,
  updateBookSchema,
  deleteBookSchema,
} from "./book.schemas";
import * as z from "zod";

export type GetBookByIdInput = z.infer<typeof getBookByIdSchema>;
export type CreateBookInput = z.infer<typeof createBookSchema>;
export type UpdateBookInput = z.infer<typeof updateBookSchema>;
export type DeleteBookInput = z.infer<typeof deleteBookSchema>;
