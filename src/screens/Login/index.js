import React from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import Logo from "../../assets/logo.png";

import { styles } from "./styles";

export default function Login() {
  return (
    <View style={styles.container}>
      <Image source={Logo} />
      <Text style={styles.text}>
        Bem-vindo(a) ao Biblia em maos! Que a luz das Sagradas Escrituras
        ilumine o seu caminho e enriqueça o seu dia. Vamos começar a jornada
        espiritual juntos!
      </Text>
      <TouchableOpacity style={styles.btnLogin}>
        <Text style={styles.btnText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnRegister}>
        <Text style={styles.btnText}>CADASTRAR</Text>
      </TouchableOpacity>
    </View>
  );
}
