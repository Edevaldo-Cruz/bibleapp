import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 35,
    paddingHorizontal: 25,
    backgroundColor: Colors.background,
    alignContent: "center",
  },
  containerHeader: {
    flexDirection: "row",
    marginVertical: 8,
  },
  title: {
    width: "80%",
    color: Colors.text,
    textAlign: "center",
    fontWeight: "bold",
    marginHorizontal: 3,
    fontSize: 24,
    textTransform: "uppercase",
    marginBottom: 0,
  },
  containerCardFavorite: {
    width: "100%",
    height: 110,
    marginTop: 8,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: Colors.secondary,
    borderRadius: 16,
    borderColor: Colors.primary,
    borderWidth: 4,
    elevation: 5,
  },
  titleCard: {
    color: Colors.background,
    fontWeight: "bold",
    marginHorizontal: 3,
    fontSize: 20,
    textTransform: "uppercase",
    marginBottom: 0,
  },
  textCard: {
    marginLeft: 24,
    color: Colors.background,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "700",
  },
  cardHeard: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
