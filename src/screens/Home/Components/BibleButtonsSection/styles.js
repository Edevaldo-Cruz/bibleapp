import { StyleSheet } from "react-native";
import Colors from "../../../../constants/Colors";

export const styles = StyleSheet.create({
  containerBtnBible: {
    marginBottom: 16,
    marginHorizontal: 25,
  },
  title: {
    textAlign: "center",
    color: Colors.text,
    fontSize: 36,
    fontWeight: "bold",
  },
  containerBtn: {
    flexDirection: "row",
  },
  btnDeactivated: {
    width: 163,
    height: 119,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.secondaryOpacity65,
    borderRadius: 16,
    borderColor: Colors.primary,
    borderWidth: 4,
    marginHorizontal: 4,
  },
  textDeactivated: {
    color: Colors.background,
    fontSize: 24,
    fontWeight: "bold",
  },
  btnActivated: {
    width: 163,
    height: 119,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    borderRadius: 16,
    borderColor: Colors.text,
    borderWidth: 4,
    marginHorizontal: 4,
  },
  textActivated: {
    color: Colors.text,
    fontSize: 24,
    fontWeight: "bold",
  },
  titleDinamic: {
    textAlign: "center",
    color: Colors.text,
    fontSize: 24,
    fontWeight: "bold",
  },
});
