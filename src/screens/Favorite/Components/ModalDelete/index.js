import { useEffect, useState } from "react";
import { Modal, View, Text, TouchableOpacity, TextInput } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { styles } from "./styles";
import Colors from "../../../../constants/Colors";

export default function ModalDelete({
  activeModalDelete,
  setActiveModalDelete,
  selectedItemId,
}) {
  const [modalVisible, setModalVisible] = useState(false);

  const closeModal = () => {
    setActiveModalDelete(false);
    setModalVisible(false);
  };
  const handleDeleteConfirmation = () => {};

  useEffect(() => {
    if (activeModalDelete) {
      setModalVisible(true);
    }
  }, [activeModalDelete]);

  return (
    <Modal visible={modalVisible} animationType="slide" transparent={true}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContainerHeader}>
            <Text style={styles.modalTitle}>Excluir</Text>
            <View style={styles.closeButton}>
              <TouchableOpacity onPress={closeModal}>
                <AntDesign
                  name="closecircleo"
                  size={24}
                  color={Colors.background}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Tem certeza que deseja excluir este item?
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={handleDeleteConfirmation}
              >
                <Text style={styles.buttonText}>Excluir</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={closeModal}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
