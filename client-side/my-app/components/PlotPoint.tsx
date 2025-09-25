import { plotPointStyle } from "@/styles/plotPoint";
import { Pressable, Text, View } from "react-native";

interface PlotPointProps {
  text: string;
  order: number;
}

export default function PlotPoint({ text, order }: PlotPointProps) {
  return (
    <Pressable style={plotPointStyle.containter}>
      <View style={plotPointStyle.number}>
        <Text>{order}</Text>
      </View>
      <Text style={plotPointStyle.text}>{text}</Text>
    </Pressable>
  );
}
