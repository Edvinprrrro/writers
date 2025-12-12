import { miniBook } from "@/styles/booksPage";
import { Link } from "expo-router";
import { Text, View } from "react-native";

interface MiniBookProps {
  title: string;
  id: string;
}

export default function MiniBook({ title, id }: MiniBookProps) {
  return (
    <Link
      asChild
      href={{ pathname: "/books/[id]", params: { id: id, title: title } }}
      style={miniBook.button}
    >
      <View>
        <Text style={miniBook.text}>{title}</Text>
      </View>
    </Link>
  );
}
