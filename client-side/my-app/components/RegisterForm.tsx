import { View, Button } from "react-native";
import { useState } from "react";
import { formStyle } from "@/styles/form";
import TextAndField from "./TextAndField";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setusername] = useState("");
  const [repeatedPassword, setRepeatPassword] = useState("");

  async function onRegister() {
    try {
      const response = await fetch("http://localhost:3000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password, repeatedPassword }),
      });

      const data = await response.json();
      console.log(data.error);

      if (data.succes) alert("Nice register");
      else alert("No register");
    } catch (error) {
      console.log("Error: ", error);
    }
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
