import Book from "./book.model";
import { deleteAllChaptersFromBook } from "../chapters/chapter.services";
import { HttpError } from "../../errors/httpError";

export async function deleteBookAndChapters(bookId: string) {
  const book = await Book.findByIdAndDelete(bookId);
  if (!book) throw new HttpError(404, "Not found");
  await deleteAllChaptersFromBook(bookId);
  return;
}
