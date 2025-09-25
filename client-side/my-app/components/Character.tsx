import { character } from "@/styles/character";
import { Text, Pressable } from "react-native";

interface CharacterProps {
  text: string;
}

// TODO: add the character info to this component along with the functionality to dropdown.

export default function Character({ text }: CharacterProps) {
  return (
    <Pressable style={character.containter}>
      <Text style={character.text}>{text}</Text>
    </Pressable>
  );
}
