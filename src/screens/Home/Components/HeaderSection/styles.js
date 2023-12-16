import { StyleSheet } from "react-native";
import Colors from "../../../../constants/Colors";

export const styles = StyleSheet.create({
  containerHeader: {
    width: "100%",
    height: 45,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 38,
  },
  image: {
    width: 53,
    height: 63,
    resizeMode: "contain",
  },
  text: {
    marginVertical: 8,
    color: Colors.text,
    fontSize: 24,
    textAlign: "center",
    fontWeight: "400",
  },
  input: {
    width: 240,
    height: 45,
    backgroundColor: Colors.secondary,
    borderRadius: 32,
    borderColor: Colors.primary,
    borderWidth: 4,
    paddingStart: 15,
    color: Colors.background,
    fontWeight: "800",
    fontSize: 20,
  },
  viewBtn: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 24,
  },
  btn: {
    height: 68,
    paddingHorizontal: 32,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
  btnText: {
    fontSize: 24,
    color: Colors.text,
    fontWeight: "bold",
  },
});
