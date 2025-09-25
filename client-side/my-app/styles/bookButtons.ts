import { StyleSheet } from "react-native";

export const bookButtonsStyles = StyleSheet.create({
  container: {
    gap: 10,
  },
  tall: {
    backgroundColor: "#25ABBB",
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 20,
    padding: 2,
    height: 200,
  },
  normal: {
    backgroundColor: "#25ABBB",
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 20,
    padding: 2,
  },
  text: {
    textTransform: "uppercase",
    fontFamily: "KellySlab_400Regular",
    fontSize: 40,
    margin: "auto",
    width: "auto",
  },
});
