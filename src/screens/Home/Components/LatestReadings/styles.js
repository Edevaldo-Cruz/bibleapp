import { StyleSheet } from "react-native";
import Colors from "../../../../constants/Colors";

export const styles = StyleSheet.create({
  flat: {
    width: "100%",
    height: 68,
    flexGrow: 0,
    marginBottom: 16,
    paddingLeft: 25,
    paddingRight: 55,
  },
  title: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 25,
    marginBottom: 8,
  },
  btn: {
    flexDirection: "row",
    width: 84,
    height: 45,
    marginLeft: 5,
    backgroundColor: Colors.secondaryOpacity65,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    borderColor: Colors.primary,
    borderWidth: 4,
  },
  text: {
    color: Colors.text,
    fontWeight: "bold",
    fontSize: 20,
    textTransform: "uppercase",
  },
});
