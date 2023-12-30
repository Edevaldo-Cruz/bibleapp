import { StyleSheet } from "react-native";
import Colors from "../../../../constants/Colors";

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
    borderRadius: 8,
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
  annotationContainer: {
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 8,
    marginVertical: 16,
    backgroundColor: Colors.grey,
    borderRadius: 8,
  },
  annotationText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.background,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  deleteButton: {
    backgroundColor: Colors.grey,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: Colors.background,
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});
