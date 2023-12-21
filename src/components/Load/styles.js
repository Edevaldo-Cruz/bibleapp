import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 32,
    color: Colors.text,
    textAlign: "center",
    fontWeight: "800",
  },
});
