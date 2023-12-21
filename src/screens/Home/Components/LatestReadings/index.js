import { useEffect, useState } from "react";
import { FlatList, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./styles";
import { getAllLatestReadings } from "../../../../services/SQLite/latestReadings";

export default function LatestReadings({ id: idUser, token }) {
  const [repo, setRepo] = useState();

  async function getlatestReadings() {
    try {
      setRepo(await getAllLatestReadings(idUser));
    } catch {
      console.log(error);
    }
  }

  const navigation = useNavigation();

  const screenReader = (bookName = repo.book, abbrev, chapterNumber) => {
    navigation.navigate("Reader", {
      book: bookName,
      abbrev: abbrev,
      chapter: chapterNumber,
      token: token,
      id: idUser,
    });
  };

  useEffect(() => {
    getlatestReadings();
  }, [repo]);

  if (repo == null || repo == "") {
    return <></>;
  }

  return (
    <>
      <View>
        <Text style={styles.title}>Ultimas leituras:</Text>
      </View>
      <FlatList
        data={repo}
        style={styles.flat}
        contentContainerStyle={{ paddingRight: 50 }}
        keyExtractor={(repo, index) => index.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.btn}
            onPress={() => screenReader(item.name, item.abbrev, item.chapter)}
          >
            <Text style={styles.text}>
              {item.abbrev}.{item.chapter}
            </Text>
          </TouchableOpacity>
        )}
      />
    </>
  );
}
