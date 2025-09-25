import { Pressable, Text, View, ScrollView } from "react-native";
import { page } from "@/styles/frame";
import { typography } from "@/styles/typography ";
import { indexButtonsStyle } from "@/styles/indexButtons";

export default function Index() {
  return (
    <View style={page.frame}>
      <Text style={typography.h1}>Your Books</Text>
      <View style={indexButtonsStyle.container}>
        <Pressable style={indexButtonsStyle.tall}>
          <Text style={indexButtonsStyle.text}>Continue Writing</Text>
        </Pressable>
        <Pressable style={indexButtonsStyle.normal}>
          <Text style={indexButtonsStyle.text}>Characters</Text>
        </Pressable>
        <Pressable style={indexButtonsStyle.normal}>
          <Text style={indexButtonsStyle.text}>Plot Points</Text>
        </Pressable>
        <Pressable style={indexButtonsStyle.normal}>
          <Text style={indexButtonsStyle.text}>Drafts</Text>
        </Pressable>
      </View>
    </View>
  );
}
