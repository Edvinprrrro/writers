import { View, Text } from "react-native";
import { typography } from "@/styles/typography ";
import { page } from "@/styles/frame";
import Character from "@/components/Character";
import AddCharacter from "@/components/AddCharacter";

export default function Characters() {
  return (
    <View style={page.frame}>
      <Text style={typography.h1}>Game Of Thrones Characters</Text>
      <View style={{ gap: 10 }}>
        <Character text="Eddard Stark" />
        <Character text="Jon Snow" />
        <Character text="Sansa Stark" />
        <AddCharacter />
      </View>
    </View>
  );
}
