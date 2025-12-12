import { Button, View } from "react-native";
import { useState } from "react";
import { formStyle } from "@/styles/form";
import TextAndField from "../TextAndField";
import { login } from "../../services/auth";
import { router } from "expo-router";

interface LoginFormProps {
  onError: (message: string) => void;
}

export default function LoginForm({ onError }: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    const result = await login(username, password);
    if (result.ok) {
      router.replace("/");
      return;
    }

    onError(result.message);
  }

  return (
    <View style={formStyle.container}>
      <TextAndField
        placeholder="Username here"
        value={username}
        setValue={setUsername}
        name="Username"
      />
      <TextAndField
        placeholder="Password here"
        value={password}
        setValue={setPassword}
        name="Password"
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
