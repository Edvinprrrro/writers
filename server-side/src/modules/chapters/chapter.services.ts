import Chapter from "./chapter.model";

export async function deleteAllChaptersFromBook(bookId: string) {
  await Chapter.deleteMany({ book: bookId });
  return;
}
