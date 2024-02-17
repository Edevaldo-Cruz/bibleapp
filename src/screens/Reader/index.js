import React, { useEffect, useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { FlatList, View, Text, TouchableOpacity, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";

import { AntDesign } from "@expo/vector-icons";

import { data } from "../../content/data";
import { styles } from "./styles";
import {
  getChapter,
  getChapterWithToken,
} from "../../services/BibleApi/requests";
import {
  createLatestReadings,
  getAllLatestReadings,
} from "../../services/SQLite/latestReadings";
import Load from "../../components/Load";
import ModalFavorite from "../../components/ModalFavorite";

export default function Reader() {
  const route = useRoute();
  const navigation = useNavigation();
  const { book, abbrev, chapter, token, id, version } = route.params;

  const [versesLoaded, setVersesLoaded] = useState(false);
  const [verses, setVerses] = useState([]);
  const [currentChapter, setCurrentChapter] = useState(chapter);
  const [currentBook, setCurrentBook] = useState(book);
  const [lastBook, setLastBook] = useState("");
  const [currentAbbrev, setCurrentAbbrev] = useState(abbrev);
  const [activeModal, setActiveModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const timeoutRef = useRef(null);

  const handlePressIn = (item) => {
    timeoutRef.current = setTimeout(() => {
      setSelectedItem(item);
      setActiveModal(true);
    }, 500);
  };

  const handlePressOut = (item) => {
    clearTimeout(timeoutRef.current);
    setSelectedItem(item);
    setActiveModal(true);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  //TODO: para usuario que optarem por não fazer o registro.
  // async function getVerses() {
  //   const result = await getChapter("nvi", currentAbbrev, currentChapter);
  //   if (result && result.data && result.data.verses) {
  //     setVerses(result.data.verses);
  //   }
  // }

  async function getVerses() {
    try {
      const result = await getChapterWithToken(
        version,
        currentAbbrev,
        currentChapter,
        token
      );
      if (result && result.data && result.data.verses) {
        setVerses(result.data.verses);
        let latestReadings = {
          book: book,
          abbrev: currentAbbrev,
          chapter: currentChapter,
          idUser: id,
          inclusionDate: Date.now(),
        };
        await createLatestReadings(latestReadings);
        setLastBook(result.data.book.name);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro ao obter informação.");
    }
  }

  const getPosition = () => {
    const index = data.findIndex((item) =>
      (item.name === lastBook) !== "" ? lastBook : currentBook
    );
    return index !== -1 ? index : null;
  };

  const nextChapter = () => {
    let position = getPosition();
    let nextPosition = position + 1;

    if (currentChapter + 1 <= data[position].chapters) {
      setCurrentChapter(currentChapter + 1);
    } else if (currentAbbrev != "ap") {
      setCurrentBook(!lastBook ? data[nextPosition].name : lastBook);
      setCurrentAbbrev(data[nextPosition].abbrev.pt);
      setCurrentChapter(1);
    }
  };

  const previousChapter = () => {
    let position = getPosition();
    let previousPosition = position - 1;

    if (currentChapter != 1) {
      setCurrentChapter(currentChapter - 1);
    } else if (currentAbbrev != "gn") {
      setCurrentBook(data[previousPosition].name);
      setCurrentAbbrev(data[previousPosition].abbrev.pt);
      setCurrentChapter(data[previousPosition].chapters);
    }
  };

  useEffect(() => {
    getVerses();
  }, [currentChapter]);

  useEffect(() => {
    if (verses.length > 0) {
      setVersesLoaded(true);
    }
  }, [verses]);

  if (!versesLoaded) {
    return <Load />;
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={styles.container}
        data={verses}
        keyExtractor={(item) => item.number.toString()}
        contentContainerStyle={{ paddingBottom: 150 }}
        ListHeaderComponent={
          <>
            <View style={styles.containerHeader}>
              <TouchableOpacity onPress={handleGoBack}>
                <AntDesign name="arrowleft" size={38} color="#FFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.containerVersion}>
                <Text style={styles.textVersion}>{version.toUpperCase()}</Text>
                <AntDesign name="earth" size={22} color="#FFF" />
              </TouchableOpacity>
            </View>
            <View style={styles.containerBookChapter}>
              <Text style={styles.nameBook}>
                {lastBook !== "" ? lastBook : currentBook}
              </Text>
              <Text style={styles.numberChapter}>{currentChapter}</Text>
            </View>
          </>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.verseContainer}
            onPressIn={() => handlePressIn(item)}
            onPressOut={() => handlePressOut(item)}
          >
            <Text style={styles.verseText}>
              {item.number} {item.text}
            </Text>
          </TouchableOpacity>
        )}
      />
      <>
        <View style={styles.fixedView}>
          <View style={styles.line} />
          <View style={styles.containerFooter}>
            <View style={styles.containerBtnFooter}>
              <TouchableOpacity onPress={previousChapter}>
                <AntDesign name="arrowleft" size={38} color="#FFF" />
              </TouchableOpacity>

              <TouchableOpacity>
                <Text style={styles.buttonText}>
                  {lastBook !== "" ? lastBook : currentBook} {currentChapter}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={nextChapter}>
                <AntDesign name="arrowright" size={38} color="#FFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <ModalFavorite
          activeModal={activeModal}
          selectedItem={selectedItem}
          setActiveModal={setActiveModal}
          book={lastBook !== "" ? lastBook : currentBook}
          abbrev={currentAbbrev}
          chapter={currentChapter}
          idUser={id}
        />
      </>
    </View>
  );
}
