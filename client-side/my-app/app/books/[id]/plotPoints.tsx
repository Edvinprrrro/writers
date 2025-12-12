import { View, Text } from "react-native";
import { page } from "@/styles/frame";
import { typography } from "@/styles/typography ";
import PlotPoint from "@/components/Buttons/PlotPoint";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { PlotPointType } from "@/utils/types";

export default function PlotPoints() {
  const [plotPoints, setPlotPoints] = useState<PlotPointType[]>([]);

  const { id, title } = useLocalSearchParams();
  const fixedId = Array.isArray(id) ? id[0] : id;

  return (
    <View style={page.frame}>
      <Text style={typography.h1}></Text>
      <View style={{ gap: 20 }}></View>
    </View>
  );
}
