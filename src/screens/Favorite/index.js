import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { AntDesign } from "@expo/vector-icons";

import { styles } from "./styles";
import { getAllFavoriteVerses } from "../../services/SQLite/favoriteVerse";
import ModalFavorite from "../../components/ModalFavorite";

export default function Favorite() {
  const [data, setData] = useState([]);
  const [activeModal, setActiveModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const navigation = useNavigation();
  const handleGoBack = () => {
    navigation.goBack();
  };

  const handlePress = (item) => {
    setActiveModal(true);
    setSelectedItemId(item.id);
  };

  useEffect(() => {
    const fetchFavoriteVerses = async () => {
      try {
        const verses = await getAllFavoriteVerses();
        setData(verses);
      } catch (error) {
        console.error("Erro ao obter versículos favoritos:", error);
      }
    };
    fetchFavoriteVerses();
  }, []);

  return (
    <>
      <FlatList
        data={data}
        style={styles.container}
        ListHeaderComponent={
          <View style={styles.containerHeader}>
            <TouchableOpacity onPress={handleGoBack}>
              <AntDesign name="arrowleft" size={38} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.title}>Favoritos</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.containerCardFavorite}
            onPress={() => handlePress(item)}
          >
            <Text style={styles.titleCard}>
              {item.book} - {item.chapter}
            </Text>
            <Text numberOfLines={2} style={styles.textCard}>
              {item.verse}
            </Text>
          </TouchableOpacity>
        )}
      />
      <ModalFavorite
        activeModal={activeModal}
        selectedItemId={selectedItemId}
        setActiveModal={setActiveModal}
        modo="details"
      />
    </>
  );
}
