import { useState, useEffect } from "react";
import { Modal, View, Text, TouchableOpacity, TextInput } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { styles } from "./styles";
import Colors from "../../constants/Colors";
import {
  saveFavoriteVerse,
  getFavoriteVerseById,
  updateFavoriteVerseAnnotation,
} from "../../services/SQLite/favoriteVerse";

export default function ModalFavorite({
  activeModal,
  selectedItem,
  setActiveModal,
  idUser,
  book,
  abbrev,
  chapter,
  modo = "create",
  selectedItemId,
  updateFavoriteList,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [annotationText, setAnnotationText] = useState("");
  const [content, setContent] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const closeModal = () => {
    setActiveModal(false);
    setModalVisible(false);
    setAnnotationText("");
    setEditMode(false);
  };

  const handlePressAnnotation = () => {
    if (selectedItem) {
      const verseDetails = {
        idUser: idUser,
        verse: `${selectedItem.number} ${selectedItem.text}`,
        annotation: annotationText,
        book: book,
        abbrev: abbrev,
        chapter: chapter,
      };
      saveFavoriteVerse(verseDetails);
    }
    closeModal();
  };

  const handleUpdateAnnotation = async () => {
    if (content && content.id) {
      try {
        await updateFavoriteVerseAnnotation(content.id, annotationText);
        updateFavoriteList();
        closeModal();
      } catch (error) {
        console.error("Erro editar a anotação do favorito:", error);
      }
    }
  };

  const handleEditAnnotation = () => {
    setEditMode(true);
  };

  useEffect(() => {
    if (activeModal) {
      setModalVisible(true);
    }
  }, [activeModal]);

  useEffect(() => {
    if (modo === "details" && selectedItemId) {
      const fetchFavoriteVerses = async () => {
        try {
          const verse = await getFavoriteVerseById(selectedItemId);
          setContent(verse);
        } catch (error) {
          console.error("Erro ao obter versículo favorito:", error);
        }
      };
      fetchFavoriteVerses();
    }
  }, [modo, selectedItemId, updateFavoriteList]);

  // useEffect(() => {
  //   if (content.annotation) {
  //     setAnnotationText(content.annotation);
  //   }
  // }, [content.annotation]);

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

          {(modo === "create" && selectedItem) ||
          (modo === "details" && content) ? (
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>
                {modo === "create"
                  ? `${selectedItem.number} ${selectedItem.text}`
                  : content.verse}
              </Text>

              <View style={styles.containerBtnAnnotation}>
                <Text style={styles.textAnnotation}>Anotação:</Text>

                {modo === "details" && !editMode ? (
                  <View style={styles.annotationContainer}>
                    <Text style={styles.annotationText}>
                      {content.annotation}
                    </Text>
                  </View>
                ) : (
                  <TextInput
                    style={styles.annotationInput}
                    placeholder="Digite sua anotação"
                    placeholderTextColor={Colors.text}
                    onChangeText={(text) => setAnnotationText(text)}
                    value={content.annotation}
                    multiline
                    numberOfLines={3}
                    editable={true}
                  />
                )}

                {modo != "details" ? (
                  <TouchableOpacity
                    style={styles.btnAnnotation}
                    onPress={handlePressAnnotation}
                  >
                    <Text style={styles.modalBtnText}>Salvar</Text>
                  </TouchableOpacity>
                ) : editMode ? (
                  <TouchableOpacity
                    style={styles.btnAnnotation}
                    onPress={handleUpdateAnnotation}
                  >
                    <Text style={styles.modalBtnText}>Salvar anotação</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.btnAnnotation}
                    onPress={handleEditAnnotation}
                  >
                    <Text style={styles.modalBtnText}>Editar anotação</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ) : null}
        </View>
      </View>
    </Modal>
  );
}
