import { StyleSheet } from "react-native";

export const textEditorStyles = StyleSheet.create({
  page: {
    flexGrow: 1,
    width: "55%",
    backgroundColor: "#FFFFFF",
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "#000",
    minWidth: 390,
  },
  editor: {
    flex: 1,
    padding: 12,
    textAlignVertical: "top",
  },
});
