import { ScrollView, Text, View } from "react-native";
import { useState, useCallback } from "react";
import { typography } from "@/styles/typography ";
import { page } from "@/styles/frame";
import Alert from "@/components/Alert";
import RegisterForm from "@/components/Forms/RegisterForm";

export default function Register() {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleRegisterError = useCallback((message: string) => {
    setAlertMessage(message);
  }, []);

  const handleButtonPress = useCallback(() => {
    setAlertMessage(null);
  }, []);

  return (
    <ScrollView contentContainerStyle={page.frame}>
      <Text style={typography.h1}>Welcome To Writers</Text>
      <View>
        {alertMessage && (
          <Alert
            message={alertMessage}
            color="red"
            onPress={handleButtonPress}
          />
        )}
        <RegisterForm onError={handleRegisterError} />
      </View>
    </ScrollView>
  );
}
