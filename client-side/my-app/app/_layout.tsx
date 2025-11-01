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
      <Tabs.Screen
        name="index"
        options={{ tabBarStyle: { display: "none" }, headerShown: false }}
      />
      <Tabs.Screen
        name="login"
        options={{ tabBarStyle: { display: "none" }, headerShown: false }}
      />
      <Tabs.Screen
        name="register"
        options={{ tabBarStyle: { display: "none" }, headerShown: false }}
      />
      <Tabs.Screen
        name="characters"
        options={{ tabBarStyle: { display: "none" }, headerShown: false }}
      />
      <Tabs.Screen
        name="plotPoints"
        options={{ tabBarStyle: { display: "none" }, headerShown: false }}
      />
      <Tabs.Screen
        name="write"
        options={{ tabBarStyle: { display: "none" }, headerShown: false }}
      />
    </Tabs>
  );
}
