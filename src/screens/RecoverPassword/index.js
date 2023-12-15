import React, { useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  ScrollView,
  Keyboard,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from "react-native";
import Logo from "../../assets/logo.png";

import { styles } from "./styles";

export default function RecoverPassword() {
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  const scrollViewRef = useRef(null);

  const handlePressBack = () => {
    navigation.navigate("Welcome");
  };

  const onChangeEmail = (newEmail) => {
    setEmail(newEmail);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (event) => {
        const keyboardHeight = event.endCoordinates.height;
        const scrollDistance = 0.5;

        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({
            y: keyboardHeight * scrollDistance,
            animated: true,
          });
        }
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({ y: 0, animated: true });
        }
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <ScrollView
      ref={scrollViewRef}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.containerImage}>
        <Image source={Logo} style={styles.image} />
      </View>
      <Text style={styles.title}>ESQUECEU SUA SENHA?</Text>
      <Text style={styles.text}>
        Não se preocupe! Acontece. Por favor, insira o endereço de e-mail
        vinculado à sua conta
      </Text>

      <View style={styles.containerInput}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.inputs}
          onChangeText={onChangeEmail}
          value={email}
        />
      </View>

      <View>
        <View style={styles.viewBtn}>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>ENTRAR</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={handlePressBack}
          style={styles.containerLink}
        >
          <Text style={styles.link}>voltar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
