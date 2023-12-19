import { FlatList, Text, View, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { useEffect, useState } from "react";
import { getAllLatestReadings } from "../../../../services/SQLite/latestReadings";

export default function LatestReadings({ id: idUser }) {
  const [repo, setRepo] = useState();

  async function getlatestReadings() {
    try {
      setRepo(await getAllLatestReadings(idUser));
    } catch {
      console.error(error);
    }
  }

  useEffect(() => {
    getlatestReadings();
  }, [repo]);

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
            //onPress={() => navigation.navigate("", { item })}
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
