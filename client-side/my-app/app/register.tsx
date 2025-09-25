import { View, Text } from "react-native";
import { typography } from "@/styles/typography ";
import { page } from "@/styles/frame";
import RegisterForm from "@/components/RegisterForm";

export default function register() {
  return (
    <View style={page.frame}>
      <Text style={typography.h1}>Welcome To Writers</Text>
      <RegisterForm />
    </View>
  );
}
