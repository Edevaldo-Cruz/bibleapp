import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "space-between",
  },
  user: {
    width: 150,
    height: 150,
    backgroundColor: Colors.primary,
    borderRadius: 75,
    marginTop: 20,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  letterUser: {
    fontSize: 80,
    fontWeight: "900",
    color: Colors.text,
  },
  nameUser: {
    width: 150,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "900",
    color: Colors.text,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  annotationsUser: {
    fontSize: 16,
    fontWeight: "900",
    color: Colors.text,
    textAlign: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  line: {
    width: 150,
    height: 5,
    backgroundColor: Colors.primary,
    marginVertical: 15,
  },
  text: {
    width: 150,
    fontSize: 18,
    color: Colors.text,
    textAlign: "center",
    fontWeight: "800",
  },
  btn: {
    width: 100,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.secondaryOpacity65,
    borderRadius: 8,
    borderColor: Colors.primary,
    borderWidth: 4,
    marginHorizontal: 4,
  },
});
