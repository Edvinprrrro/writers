import { character } from "@/styles/character";
import { Text, Pressable } from "react-native";

interface CharacterProps {
  name: string;
}

// TODO: add the character info to this component along with the functionality to dropdown.

export default function Character({ name }: CharacterProps) {
  return (
    <Pressable style={character.containter}>
      <Text style={character.text}>{name}</Text>
    </Pressable>
  );
}
