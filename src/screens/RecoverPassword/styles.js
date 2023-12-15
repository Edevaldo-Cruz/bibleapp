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
  containerImage: {
    width: "100%",
    height: "25%",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  title: {
    color: Colors.text,
    fontSize: 36,
    textAlign: "center",
    fontWeight: "bold",
  },
  text: {
    textAlign: "center",
    marginVertical: 24,
    color: Colors.text,
    fontSize: 20,
  },
  label: {
    marginVertical: 0,
    color: Colors.text,
    fontSize: 20,
  },
  containerInput: {
    marginVertical: 28,
  },
  inputs: {
    width: "16rem",
    height: 45,
    backgroundColor: Colors.secondary,
    borderRadius: 16,
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
    marginVertical: 28,
  },
  btn: {
    width: 228,
    height: 68,

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
  inputPassword: {
    flexDirection: "row",
  },
  iconEye: {
    zIndex: 9,
    margin: 0,
    bottom: 33,
    left: 300,
  },
  containerLink: {
    alignItems: "center",
  },
  link: {
    marginVertical: 8,
    color: Colors.text,
    fontSize: 20,
  },
});
