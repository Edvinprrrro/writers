import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { page } from "@/styles/frame";
import { typography } from "@/styles/typography ";
import { useEffect, useState } from "react";
import { getBooks } from "@/services/booksServices";
import { Book } from "@/utils/types";
import { router } from "expo-router";
import MiniBook from "@/components/MiniBook";
import { booksPage } from "@/styles/booksPage";

export default function Index() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await getBooks();
        if (!res.ok) {
          console.log("Error: ", res.message);
          return null;
        }
        setBooks(res.data);
      } catch {
        router.replace("/(user)/login");
        return null;
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  });

  if (loading)
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <ScrollView>
      <View style={page.frame}>
        <Text style={typography.h1}>Your Books</Text>
        <View style={booksPage.container}>
          {books.length > 0 ? (
            books.map((book) => (
              <MiniBook key={book._id} title={book.title} id={book._id} />
            ))
          ) : (
            <Text>No books yet</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
