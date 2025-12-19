import { createBookInput, updateBookInput } from "./book.schemas";
import Book from "./book.model";
import Chapter from "../chapters/chapter.model";
import { deleteAllChaptersFromBook } from "../chapters/chapter.services";

interface addBookData extends createBookInput {
  userId: string;
}

export async function addBookToDatabase({
  title,
  description,
  userId,
}: addBookData) {
  return await Book.create({
    title,
    description,
    author: userId,
  });
}

export async function updateBookInDatabase(
  bookId: string,
  updates: updateBookInput
) {
  return await Book.findByIdAndUpdate(bookId, updates);
}

export async function getAllBooksFromUser(userId: string) {
  return await Book.find({ author: userId });
}

export async function getAllBooksByIdFromDB(bookId: string) {
  return await Book.findById(bookId);
}

export async function deleteBookAndChapters(bookId: string) {
  await Book.findByIdAndDelete(bookId);
  await deleteAllChaptersFromBook(bookId);
  return;
}
