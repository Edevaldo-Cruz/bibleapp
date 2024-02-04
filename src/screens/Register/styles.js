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
    flexDirection: "row",
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "8%",
    marginBottom: "5%",
  },

  image: {
    width: "30%",
    height: "100%",
    resizeMode: "contain",
  },
  title: {
    width: "70%",
    height: "100%",
    color: Colors.text,
    fontSize: 26,
    textAlign: "left",
    fontWeight: "bold",
    paddingTop: 8,
  },
  text: {
    marginVertical: 8,
    color: Colors.text,
    fontSize: 24,
  },
  containerInputs: {
    marginVertical: 24,
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
    margin: 0,
  },
  viewBtn: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 24,
  },
  btn: {
    width: 228,
    height: 68,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
  btnDisabled: {
    width: 228,
    height: 68,
    backgroundColor: Colors.grey,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },

  btnText: {
    fontSize: 24,
    color: Colors.text,
    fontWeight: "bold",
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
  confirm: {
    marginTop: -20,
  },
});
