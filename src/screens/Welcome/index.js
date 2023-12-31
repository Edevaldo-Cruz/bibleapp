import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View, Image } from "react-native";
import Logo from "../../assets/logo.png";

import { styles } from "./styles";

export default function Welcome() {
  const navigation = useNavigation();

  const handlePressLogin = () => {
    navigation.navigate("Login");
  };

  const handlePressRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerImage}>
        <Image source={Logo} style={styles.image} />
      </View>
      <View style={styles.containerText}>
        <Text style={styles.text}>
          Bem-vindo(a) ao Biblia em maos! Que a luz das Sagradas Escrituras
          ilumine o seu caminho e enriqueça o seu dia. Vamos começar a jornada
          espiritual juntos!
        </Text>
      </View>

      <View style={styles.containerBtn}>
        <TouchableOpacity style={styles.btnLogin} onPress={handlePressLogin}>
          <Text style={styles.btnText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnRegister}
          onPress={handlePressRegister}
        >
          <Text style={styles.btnText}>CADASTRAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
