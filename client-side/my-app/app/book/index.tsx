import { Pressable, Text, View } from "react-native";
import { page } from "@/styles/frame";
import { typography } from "@/styles/typography ";
import { bookButtonsStyles } from "@/styles/bookButtons";

export default function Button() {
  return (
    <View style={page.frame}>
      <Text style={typography.h1}>Game of Thrones</Text>
      <View style={bookButtonsStyles.container}>
        <Pressable style={bookButtonsStyles.tall}>
          <Text style={bookButtonsStyles.text}>Continue Writing</Text>
        </Pressable>
        <Pressable style={bookButtonsStyles.normal}>
          <Text style={bookButtonsStyles.text}>Characters</Text>
        </Pressable>
        <Pressable style={bookButtonsStyles.normal}>
          <Text style={bookButtonsStyles.text}>Plot Points</Text>
        </Pressable>
        <Pressable style={bookButtonsStyles.normal}>
          <Text style={bookButtonsStyles.text}>Drafts</Text>
        </Pressable>
      </View>
    </View>
  );
}
