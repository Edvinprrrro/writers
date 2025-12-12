import { Link, Href } from "expo-router";
import { View, Text } from "react-native";
import { bookButtonsStyles } from "@/styles/bookButtons";

interface BookButtonProps {
  text: string;
  link: Href;
  height: "normal" | "tall";
}

export default function BookButton({ text, link, height }: BookButtonProps) {
  return (
    <Link href={link} asChild>
      <View style={bookButtonsStyles[height]}>
        <Text style={bookButtonsStyles.text}>{text}</Text>
      </View>
    </Link>
  );
}
