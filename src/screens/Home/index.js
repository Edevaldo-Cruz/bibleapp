import React, { useState } from "react";
import { FlatList, View } from "react-native";

import { styles } from "./styles";
import HeaderSection from "./Components/HeaderSection";
import LatestReadings from "./Components/LatestReadings";
import BibleButtonsSection from "./Components/BibleButtonsSection";
import Books from "./Components/Books";

export default function Home() {
  const [filter, setFilter] = useState("VT");

  const sections = [
    { key: "header", component: <HeaderSection /> },
    { key: "latestReadings", component: <LatestReadings /> },
    {
      key: "bibleButtons",
      component: (
        <BibleButtonsSection
          sendDataToParent={(data) => setFilter(data)}
          filter={filter}
        />
      ),
    },
    { key: "books", component: <Books receivedData={filter} /> },
  ];

  return (
    <FlatList
      style={styles.container}
      data={sections}
      renderItem={({ item }) => <View>{item.component}</View>}
      keyExtractor={(item) => item.key}
    />
  );
}
