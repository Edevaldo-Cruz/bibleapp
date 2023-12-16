import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 25,
    backgroundColor: Colors.background,
    alignContent: "center",
    paddingBottom: 50,
  },
  containerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  containerVersion: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.secondaryOpacity65,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  textVersion: {
    color: Colors.text,
    fontWeight: "bold",
    marginHorizontal: 3,
    fontSize: 16,
  },
  containerBookChapter: {
    alignItems: "center",
    marginVertical: 8,
  },
  textBook: {
    color: Colors.text,
    fontWeight: "bold",
    marginHorizontal: 3,
    fontSize: 24,
    textTransform: "uppercase",
    marginBottom: 0,
  },
  numberChapter: {
    color: Colors.text,
    fontWeight: "bold",
    marginHorizontal: 3,
    fontSize: 96,
    bottom: 25,
    marginBottom: -40,
  },
  verseContainer: {
    paddingBottom: 10,
  },
  verseText: {
    color: Colors.text,
    fontSize: 18,
    textAlign: "center",
    fontWeight: "700",
  },
  fixedView: {
    width: "100%",
    height: 100,
    position: "absolute",
    bottom: 0.1,
    alignSelf: "center",
    backgroundColor: Colors.background,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: Colors.text,
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  line: {
    height: 3,
    width: "100%",
    backgroundColor: Colors.secondary,
  },
  containerFooter: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  containerBtnFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    height: 50,
    backgroundColor: Colors.secondaryOpacity65,
    paddingHorizontal: 10,
    borderRadius: 16,
    borderColor: Colors.primary,
    borderWidth: 4,
  },
});
