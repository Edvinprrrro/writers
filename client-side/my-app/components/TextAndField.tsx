import { View, Text, TextInput } from "react-native";
import { formStyle } from "@/styles/form";

interface TextAndFieldProps {
  placeholder: string;
  name: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function TextAndField({
  placeholder,
  value,
  setValue,
  name,
}: TextAndFieldProps) {
  return (
    <View style={formStyle.textAndField}>
      <Text style={formStyle.text}>{name}</Text>
      <TextInput
        placeholderTextColor="#2c2c2c"
        placeholder={placeholder}
        value={value}
        onChangeText={setValue}
        style={formStyle.field}
      />
    </View>
  );
}
