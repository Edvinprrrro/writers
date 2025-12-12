import { StyleSheet } from "react-native";

export const booksPage = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },
});

export const miniBook = StyleSheet.create({
  button: {
    backgroundColor: "lightblue",
    width: "48%",
    aspectRatio: 0.7,
    justifyContent: "center",
    alignContent: "center",
  },
  text: {
    textAlign: "center",
  },
});
