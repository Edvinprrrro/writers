import { Pressable } from "react-native";
import { addCharacterStyle } from "@/styles/addCharacter";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function AddCharacter() {
  return (
    <Pressable style={addCharacterStyle.container}>
      <Ionicons
        style={addCharacterStyle.icon}
        name="add-circle-outline"
        size={40}
        color="#25ABBB"
      />
    </Pressable>
  );
}
