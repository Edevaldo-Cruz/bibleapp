import { FlatList, Text, View, TouchableOpacity } from "react-native";
import { styles } from "./styles";

const repo = [
  { book: "Gn", chapter: 50 },
  { book: "Ex", chapter: 40 },
  { book: "Lv", chapter: 27 },
  { book: "Nm", chapter: 36 },
  { book: "Dt", chapter: 34 },
  { book: "Js", chapter: 24 },
  { book: "Jz", chapter: 21 },
];

export default function LatestReadings() {
  return (
    <>
      <View>
        <Text style={styles.title}>Ultimas leituras:</Text>
      </View>
      <FlatList
        data={repo}
        style={styles.flat}
        keyExtractor={(repo, index) => index.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.btn}
            //onPress={() => navigation.navigate("InfoRepositorio", { item })}
          >
            <Text style={styles.text}>
              {item.book}.{item.chapter}
            </Text>
          </TouchableOpacity>
        )}
      />
    </>
  );
}
