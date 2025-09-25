import { StyleSheet } from "react-native";

export const formStyle = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "#25ABBB",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    gap: 40,
    width: "100%",
    borderColor: "#0000000",
    borderWidth: 1,
  },
  textAndField: {
    width: "100%",
    gap: 10,
  },
  text: {
    marginRight: "auto",
    fontFamily: "KellySlab_400Regular",
  },
  field: {
    backgroundColor: "#FFFEFE",
    width: "100%",
    borderRadius: 20,
    height: 50,
  },
});
