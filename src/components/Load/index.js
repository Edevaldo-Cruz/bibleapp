import { View, Text } from "react-native";
import { styles } from "./styles";

export default function Load() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Aguarde...</Text>
    </View>
  );
}
