import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

export const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    marginHorizontal: "8%",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: Colors.secondary,

    borderRadius: 16,
    borderColor: Colors.primary,
    borderWidth: 4,
  },
  modalContainerHeader: {
    flexDirection: "row",
  },
  modalTitle: {
    width: "90%",
    fontWeight: "bold",
    marginHorizontal: 3,
    fontSize: 24,
    textAlign: "center",
    color: Colors.background,
  },
  closeButton: {
    width: "10%",
    textAlign: "right",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    marginTop: 16,
  },
  modalText: {
    marginBottom: 16,
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    color: Colors.background,
  },
  containerBtnAnnotation: {
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  btnAnnotation: {
    width: 245,
    height: 50,
    backgroundColor: Colors.primary,
    paddingHorizontal: 10,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBtnText: {
    color: Colors.text,
    fontWeight: "bold",
    marginHorizontal: 3,
    fontSize: 18,
  },
  annotationInput: {
    width: "100%",
    marginBottom: 16,
    backgroundColor: Colors.background,
    borderRadius: 16,
    borderColor: Colors.primary,
    borderWidth: 4,
    color: Colors.text,
    fontWeight: "800",
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  textAnnotation: {
    fontWeight: "bold",
    fontSize: 16,
    color: Colors.background,
    textAlign: "left",
    width: "100%",
  },
  placeholderText: {
    color: Colors.text,
    fontWeight: "800",
    paddingTop: 10,
  },
});
