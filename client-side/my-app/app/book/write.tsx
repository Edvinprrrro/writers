import { TextInput, ScrollView } from "react-native";
import { textEditorStyles } from "@/styles/textEditor";

export default function Write() {
  return (
    <ScrollView contentContainerStyle={textEditorStyles.page}>
      <TextInput style={textEditorStyles.editor} multiline />
    </ScrollView>
  );
}
