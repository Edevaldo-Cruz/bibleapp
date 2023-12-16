import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { FlatList, View, Text, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

import { styles } from "./styles";
import { getChapter } from "../../services/BibleApi/requests";

export default function Reader() {
  const route = useRoute();
  const { book, abbrev, chapter } = route.params;
  const [text, setText] = useState("");
  const [verses, setVerses] = useState([]);

  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  async function getVerses() {
    const result = await getChapter("nvi", abbrev, chapter);
    if (result && result.data && result.data.verses) {
      setVerses(result.data.verses);
    }
  }

  useEffect(() => {
    getVerses();
  }, []);

  useEffect(() => {
    console.log(text);
  }, [text]);

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
              <Text style={styles.textBook}>{book}</Text>
              <Text style={styles.numberChapter}>{chapter}</Text>
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
            <TouchableOpacity>
              <AntDesign name="arrowleft" size={38} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.buttonText}>
                {book} {chapter}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <AntDesign name="arrowright" size={38} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
