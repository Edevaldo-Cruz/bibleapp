import { View, Image, TextInput, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";

import Logo from "../../../../assets/logo.png";

export default function HeaderSection() {
  return (
    <>
      <View style={styles.containerHeader}>
        <Image source={Logo} style={styles.image} />
        <TextInput style={styles.input} />
        <Ionicons name="settings-sharp" size={32} color="#99B8C4" />
      </View>
      <Text style={styles.text}>Seja bem-vindo(a){`\n`}Rosana!</Text>
      <View style={styles.viewBtn}>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>MINHA ANOTAÇÕES</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
