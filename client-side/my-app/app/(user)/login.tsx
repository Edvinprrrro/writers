import LoginForm from "@/components/LoginFrom";
import { View, Text } from "react-native";
import { typography } from "@/styles/typography ";
import { page } from "@/styles/frame";

export default function Login() {
  return (
    <View style={page.frame}>
      <Text style={typography.h1}>Welcome Back To Writers</Text>
      <LoginForm />
    </View>
  );
}
