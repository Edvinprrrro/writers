import { Text, View, TextInput } from "react-native";
import { useState } from "react";
import { formStyle } from "@/styles/form";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatPassword] = useState("");

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
      <View style={formStyle.textAndField}>
        <Text style={formStyle.text}>Repeat password</Text>
        <TextInput
          placeholder="Repeat your password here"
          value={repeatedPassword}
          onChangeText={setRepeatPassword}
          style={formStyle.field}
        />
      </View>
    </View>
  );
}
