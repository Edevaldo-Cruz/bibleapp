import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { FlatList, View, Text, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

import { data } from "../../content/data";
import { styles } from "./styles";
import {
  getChapter,
  getChapterWithToken,
} from "../../services/BibleApi/requests";

export default function Reader() {
  const route = useRoute();
  const navigation = useNavigation();
  const { book, abbrev, chapter } = route.params;

  const [verses, setVerses] = useState([]);
  const [currentChapter, setCurrentChapter] = useState(chapter);
  const [currentBook, setCurrentBook] = useState(book);
  const [currentAbbrev, setCurrentAbbrev] = useState(abbrev);

  const handleGoBack = () => {
    navigation.goBack();
  };

  // async function getVerses() {
  //   const result = await getChapter("nvi", currentAbbrev, currentChapter);
  //   if (result && result.data && result.data.verses) {
  //     setVerses(result.data.verses);
  //   }
  // }

  var token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlN1biBEZWMgMTcgMjAyMyAyMzozOToxNyBHTVQrMDAwMC42NTNkMjM0N2MyYWM3YjAwMjlkY2Y4MzciLCJpYXQiOjE3MDI4NTYzNTd9.Tl3YjvxQVqTXiE8B5KKbqscyqI3FaOTNGDPB-chHB5M";

  async function getVerses() {
    const result = await getChapterWithToken(
      "nvi",
      currentAbbrev,
      currentChapter,
      token
    );
    if (result && result.data && result.data.verses) {
      setVerses(result.data.verses);
    }
  }

  const getPosition = () => {
    const index = data.findIndex((item) => item.name === currentBook);
    return index !== -1 ? index : null;
  };

  const nextChapter = () => {
    let position = getPosition();
    if (currentChapter + 1 <= data[position].chapters) {
      setCurrentChapter(currentChapter + 1);
    } else if (currentAbbrev != "ap") {
      setCurrentBook(data[position + 1].name);
      setCurrentAbbrev(data[position + 1].abbrev.pt);
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
                <Text style={styles.textVersion}>NVI</Text>
                <AntDesign name="earth" size={22} color="#FFF" />
              </TouchableOpacity>
            </View>
            <View style={styles.containerBookChapter}>
              <Text style={styles.textBook}>{currentBook}</Text>
              <Text style={styles.numberChapter}>{currentChapter}</Text>
            </View>
          </>
        }
        renderItem={({ item }) => (
          <View style={styles.verseContainer}>
            <Text style={styles.verseText}>
              {item.number} {item.text}
            </Text>
          </View>
        )}
      />
      <View style={styles.fixedView}>
        <View style={styles.line} />
        <View style={styles.containerFooter}>
          <View style={styles.containerBtnFooter}>
            <TouchableOpacity onPress={previousChapter}>
              <AntDesign name="arrowleft" size={38} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.buttonText}>
                {currentBook} {currentChapter}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={nextChapter}>
              <AntDesign name="arrowright" size={38} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
