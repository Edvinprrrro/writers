import { Pressable, View, Text, ScrollView } from "react-native";
import { page } from "@/styles/frame";
import { typography } from "@/styles/typography ";
import { indexStyles } from "@/styles";

export default function Index() {
  return (
    <ScrollView style={page.frame}>
      <Text style={typography.h1}>Your Books</Text>
      <View style={indexStyles.container}>
        <Pressable style={indexStyles.item}>
          <Text style={indexStyles.text}>Gane of thrones</Text>
        </Pressable>
        <Pressable style={indexStyles.item}>
          <Text style={indexStyles.text}>Lord of the rings</Text>
        </Pressable>
        <Pressable style={indexStyles.item}>
          <Text style={indexStyles.text}>Clash of clans</Text>
        </Pressable>
        <Pressable style={indexStyles.item}>
          <Text style={indexStyles.text}>Give him some milk</Text>
        </Pressable>
        <Pressable></Pressable>
      </View>
    </ScrollView>
  );
}
