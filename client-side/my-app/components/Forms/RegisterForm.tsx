import { View, Button } from "react-native";
import { useState } from "react";
import { formStyle } from "@/styles/form";
import TextAndField from "../TextAndField";
import { register } from "../../services/auth";
import { router } from "expo-router";

interface RegisterFormProps {
  onError: (message: string) => void;
}

export default function RegisterForm({ onError }: RegisterFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setusername] = useState("");
  const [repeatedPassword, setRepeatPassword] = useState("");

  async function onRegister() {
    const result = await register(email, username, password, repeatedPassword);

    if (result.ok) {
      router.replace("/");
      return null;
    }

    onError(result.message);
  }

  return (
    <View style={formStyle.container}>
      <TextAndField
        placeholder="example@gmail.com"
        value={email}
        setValue={setEmail}
        name="Email"
      />

      <TextAndField
        placeholder="Type you username here"
        value={username}
        setValue={setusername}
        name="Username"
      />

      <TextAndField
        placeholder="Type you password here"
        value={password}
        setValue={setPassword}
        name="Password"
      />

      <TextAndField
        placeholder="Repeat you password here"
        value={repeatedPassword}
        setValue={setRepeatPassword}
        name="Repeat your password here"
      />

      <Button title="Register" onPress={onRegister} />
    </View>
  );
}
