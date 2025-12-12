import { StyleSheet } from "react-native";

export const alertStyle = StyleSheet.create({
  container: {
    borderRadius: 10,
    minHeight: 40,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  closeButton: {
    fontSize: 22,
  },
  text: {
    color: "#f7fbff",
    fontSize: 20,
  },
});
