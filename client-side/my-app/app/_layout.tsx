import { Tabs } from "expo-router";
import { useFonts } from "@expo-google-fonts/italiana/useFonts";
import { Italiana_400Regular } from "@expo-google-fonts/italiana/400Regular";
import { KellySlab_400Regular } from "@expo-google-fonts/kelly-slab";
import { ActivityIndicator, View } from "react-native";

export default function RootLayout() {
  let [fontsLoaded] = useFonts({
    Italiana_400Regular,
    KellySlab_400Regular,
  });

  if (!fontsLoaded)
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <Tabs>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="login" />
      <Tabs.Screen name="register" />
      <Tabs.Screen name="characters" />
      <Tabs.Screen name="plotPoints" />
    </Tabs>
  );
}
