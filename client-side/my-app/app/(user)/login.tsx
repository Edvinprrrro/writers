import LoginForm from "@/components/Forms/LoginFrom";
import { View, Text, ScrollView } from "react-native";
import { typography } from "@/styles/typography ";
import { page } from "@/styles/frame";
import { useState, useCallback } from "react";
import Alert from "@/components/Alert";

export default function Login() {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleLoginError = useCallback((message: string) => {
    setAlertMessage(message);
  }, []);

  const handleButtonPress = useCallback(() => {
    setAlertMessage(null);
  }, []);

  return (
    <ScrollView>
      <View style={page.frame}>
        <Text style={typography.h1}>Welcome Back To Writers</Text>
        <View>
          {alertMessage && (
            <Alert
              message={alertMessage}
              color="red"
              onPress={handleButtonPress}
            />
          )}
          <LoginForm onError={handleLoginError} />
        </View>
      </View>
    </ScrollView>
  );
}
