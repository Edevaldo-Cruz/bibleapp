import { useEffect, useState } from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { styles } from "./styles";
import Colors from "../../../../constants/Colors";
import { deleteFavoriteVerse } from "../../../../services/SQLite/favoriteVerse";

export default function ModalDelete({
  activeModalDelete,
  setActiveModalDelete,
  selectedItemId,
  navigation,
  updateFavoriteList,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const closeModal = () => {
    setActiveModalDelete(false);
    setModalVisible(false);
  };

  const handleDeleteConfirmation = async () => {
    if (selectedItemId) {
      try {
        await deleteFavoriteVerse(selectedItemId);
        navigation.navigate("Favorite");
        updateFavoriteList();
        navigation.navigate("Favorite");
        setActiveModalDelete(false);
        closeModal();
      } catch (error) {
        console.error("Erro ao deletar favorito:", error);
      }
    }
  };

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
                style={styles.cancelButton}
                onPress={closeModal}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteConfirmation()}
              >
                <Text style={styles.buttonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
