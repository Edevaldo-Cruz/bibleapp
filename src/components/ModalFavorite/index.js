import { useState, useEffect } from "react";
import { Modal, View, Text, TouchableOpacity, TextInput } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { styles } from "./styles";
import Colors from "../../constants/Colors";
import {
  saveFavoriteVerse,
  getAllFavoriteVerses,
} from "../../services/SQLite/favoriteVerse";

export default function ModalFavorite({
  activeModal,
  selectedItem,
  setActiveModal,
  book,
  abbrev,
  chapter,
  idUser,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [annotationText, setAnnotationText] = useState("");

  const closeModal = () => {
    setActiveModal(false);
    setModalVisible(false);
    setAnnotationText("");
  };

  const handlePressAnnotation = () => {
    if (selectedItem) {
      const verseDetails = {
        idUser: idUser, // Substitua pelo ID do usuário real
        verse: `${selectedItem.number} ${selectedItem.text}`,
        annotation: annotationText,
        book: book, // Substitua pelo nome real do livro
        abbrev: abbrev, // Substitua pela abreviação real do livro
        chapter: chapter, // Substitua pelo número real do capítulo
        //inclusionDate: new Date().toISOString(),
      };

      saveFavoriteVerse(verseDetails); // Chama a função para salvar o versículo favorito
      console.log(getAllFavoriteVerses());
    }
    closeModal();
  };

  useEffect(() => {
    if (activeModal) {
      setModalVisible(true);
    }
  }, [activeModal]);

  useEffect(() => {
    const fetchFavoriteVerses = async () => {
      try {
        const verses = await getAllFavoriteVerses();
        console.log(verses);
      } catch (error) {
        console.error("Erro ao obter versículos favoritos:", error);
      }
    };

    fetchFavoriteVerses();
  }, []);

  return (
    <Modal visible={modalVisible} animationType="slide" transparent={true}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContainerHeader}>
            <Text style={styles.modalTitle}>Marcar como favorito</Text>
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
          {selectedItem && (
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>
                {selectedItem.number} {selectedItem.text}
              </Text>
              <View style={styles.containerBtnAnnotation}>
                <Text style={styles.textAnnotation}>Anotação:</Text>
                <TextInput
                  style={styles.annotationInput}
                  placeholder="Digite sua anotação"
                  placeholderTextColor={Colors.text}
                  onChangeText={(text) => setAnnotationText(text)}
                  value={annotationText}
                  multiline
                  numberOfLines={3}
                />
                <TouchableOpacity
                  style={styles.btnAnnotation}
                  onPress={handlePressAnnotation}
                >
                  <Text style={styles.modalBtnText}>Salvar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}