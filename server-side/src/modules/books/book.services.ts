import { createBookInput } from "./book.schemas";

interface addBookData extends createBookInput {
  userId: string;
}

export async function addBookToDatabase() {}
