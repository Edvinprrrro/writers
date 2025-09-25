import { Pressable, Text } from "react-native";
import { characterInfo } from "@/styles/characterInfo";

interface CharacterInfoProps {
  text: string;
}

export default function CharacterInfo({ text }: CharacterInfoProps) {
  return (
    <Pressable style={characterInfo.container}>
      <Text style={characterInfo.text}>{text}</Text>
    </Pressable>
  );
}
