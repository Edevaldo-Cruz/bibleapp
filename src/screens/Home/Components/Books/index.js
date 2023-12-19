import React, { useState } from "react";
import { FlatList, TouchableOpacity, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { data } from "../../../../content/data";
import { styles } from "./styles";

export default function Books({ receivedData: filter, token, id }) {
  const [expandedItem, setExpandedItem] = useState(null);
  const navigation = useNavigation();

  const filteredData = data.filter((item) => item.testament === filter);

  const handleExpand = (index) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  const screenReader = (bookName, abbrev, chapterNumber) => {
    navigation.navigate("Reader", {
      book: bookName,
      abbrev: abbrev,
      chapter: chapterNumber,
      token: token,
      id: id,
    });
  };

  return (
    <FlatList
      style={styles.flat}
      data={filteredData}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => (
        <View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => handleExpand(index)}
          >
            <Text style={styles.text}>{item.name}</Text>
          </TouchableOpacity>

          {expandedItem === index && (
            <View style={styles.containerChapter}>
              {Array.from({ length: item.chapters }, (_, i) => (
                <TouchableOpacity
                  key={`${item.name}_${i}`}
                  style={styles.btnChapter}
                  onPress={() => screenReader(item.name, item.abbrev.pt, i + 1)}
                >
                  <Text style={styles.chapterText}>{i + 1}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      )}
    />
  );
}
