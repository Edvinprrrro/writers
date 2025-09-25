import { Text, View, TextInput } from "react-native";
import { useState } from "react";
import { formStyle } from "@/styles/form";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={formStyle.container}>
      <View style={formStyle.textAndField}>
        <Text style={formStyle.text}>Email</Text>
        <TextInput
          placeholder="example@gmail.com"
          value={email}
          onChangeText={setEmail}
          style={formStyle.field}
        />
      </View>
      <View style={formStyle.textAndField}>
        <Text style={formStyle.text}>Password</Text>
        <TextInput
          placeholder="Type your password here"
          value={password}
          onChangeText={setPassword}
          style={formStyle.field}
        />
      </View>
    </View>
  );
}
