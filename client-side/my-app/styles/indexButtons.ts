import { StyleSheet } from "react-native";

export const indexButtonsStyle = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
    gap: 10,
  },
  tall: {
    flex: 3,
    backgroundColor: "#25ABBB",
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 20,
    padding: 2,
  },
  normal: {
    flex: 1,
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
  },
});
