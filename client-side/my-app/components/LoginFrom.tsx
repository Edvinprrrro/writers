import { Button, View } from "react-native";
import { useState } from "react";
import { formStyle } from "@/styles/form";
import TextAndField from "./TextAndField";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      const response = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.succes) alert("Nice login");
      else alert("No login");
    } catch (error) {
      console.log("Error: ", error);
    }
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
