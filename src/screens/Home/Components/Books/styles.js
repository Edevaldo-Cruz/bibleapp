import { StyleSheet } from "react-native";
import Colors from "../../../../constants/Colors";

export const styles = StyleSheet.create({
  flat: {
    width: "100%",
    height: "100%",
    paddingBottom: 100,
    paddingHorizontal: 25,
  },
  btn: {
    width: "100%",
    height: 45,
    marginLeft: 5,
  },
  text: {
    color: Colors.text,
    fontWeight: "bold",
    fontSize: 20,
  },
  containerChapter: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  btnChapter: {
    width: 50,
    height: 35,
    marginLeft: 5,
    marginBottom: 5,
    backgroundColor: Colors.secondaryOpacity65,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderColor: Colors.primary,
    borderWidth: 4,
  },
});
