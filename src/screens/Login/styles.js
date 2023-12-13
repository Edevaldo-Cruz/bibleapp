import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 25,
    backgroundColor: Colors.background,
    alignContent: "center",
  },
  text: {
    marginVertical: 16,
    color: Colors.text,
    fontSize: 24,
    textAlign: "center",
  },
  btnLogin: {
    width: "16rem",
    height: 68,
    marginVertical: 16,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
  btnRegister: {
    width: "16rem",
    height: 68,
    marginVertical: 16,
    backgroundColor: Colors.secondaryOpacity65,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    opacity: "05",
  },
  btnText: {
    fontSize: 24,
    color: Colors.text,
    fontWeight: "bold",
  },
});
