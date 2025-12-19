import { createBookInput, updateBookInput } from "./book.schemas";
import Book from "./book.model";

interface addBookData extends createBookInput {
  userId: string;
}

export async function addBookToDatabase({
  title,
  description,
  userId,
}: addBookData) {
  const book = await Book.create({
    title,
    description,
    author: userId,
  });

  return book;
}

export async function updateBookInDatabase(
  bookId: string,
  updates: updateBookInput
) {
  const book = await Book.findByIdAndUpdate(bookId, updates);

  return book;
}
