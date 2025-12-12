import { View, Text, Pressable } from "react-native";
import { alertStyle } from "@/styles/alert";
import { AlertColor, alertColors } from "@/styles/colors";

interface AlertProp {
  message: string;
  color: AlertColor;
  onPress: () => void;
}

export default function Alert({ message, color, onPress }: AlertProp) {
  return (
    <View
      style={[alertStyle.container, { backgroundColor: alertColors[color] }]}
    >
      <Text style={alertStyle.text}>{message}</Text>
      <Pressable onPress={onPress}>
        <Text style={[alertStyle.closeButton, alertStyle.text]}>✕</Text>
      </Pressable>
    </View>
  );
}
