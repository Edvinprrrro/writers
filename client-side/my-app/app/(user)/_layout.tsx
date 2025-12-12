import { Tabs } from "expo-router";
import { View } from "react-native";

export default function authLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Tabs />
    </View>
  );
}
