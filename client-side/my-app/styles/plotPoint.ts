import { StyleSheet } from "react-native";

export const plotPointStyle = StyleSheet.create({
  containter: {
    backgroundColor: "#25ABBB",
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 20,
    position: "relative",
    padding: 10,
  },
  text: {
    fontFamily: "KellySlab_400Regular",
    fontSize: 20,
    margin: "auto",
    textAlign: "center",
  },
  number: {
    backgroundColor: "#25ABBB",
    borderColor: "#000000",
    borderWidth: 1,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    position: "absolute",
    top: -18,
    left: -10,
  },
});
