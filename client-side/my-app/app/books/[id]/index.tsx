import { ScrollView, Text, View } from "react-native";
import { page } from "@/styles/frame";
import { typography } from "@/styles/typography ";
import { bookButtonsStyles } from "@/styles/bookButtons";
import BookButton from "@/components/BookButton";
import { router, useLocalSearchParams } from "expo-router";

export default function BooksIdIndex() {
  let { id, title } = useLocalSearchParams();
  if (!id || !title) {
    router.replace("/");
    return null;
  }
  id = Array.isArray(id) ? id[0] : id;

  return (
    <ScrollView>
      <View style={page.frame}>
        <Text style={typography.h1}>{title}</Text>
        <View style={bookButtonsStyles.container}>
          <BookButton
            height="tall"
            text="Continue writing"
            link={{ pathname: "/books/[id]/write", params: { id: id } }}
          />
          <BookButton
            height="normal"
            text="Characters"
            link={{
              pathname: "/books/[id]/characters",
              params: { id: id, title: title },
            }}
          />
          <BookButton
            height="normal"
            text="Plot Points"
            link={{ pathname: "/books/[id]/plotPoints", params: { id: id } }}
          />
          <BookButton height="normal" text="Drafts" link="./" />
        </View>
      </View>
    </ScrollView>
  );
}
