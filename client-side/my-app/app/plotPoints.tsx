import { View, Text } from "react-native";
import { page } from "@/styles/frame";
import { typography } from "@/styles/typography ";
import PlotPoint from "@/components/PlotPoint";

export default function PlotPoints() {
  return (
    <View style={page.frame}>
      <Text style={typography.h1}>Game of Thrones Plot Points</Text>
      <View style={{ gap: 20 }}>
        <PlotPoint text="Eddard becomes the hand of the king" order={1} />
        <PlotPoint
          text="Eddard becomes the hand of the king and he becomes gay"
          order={2}
        />
      </View>
    </View>
  );
}
