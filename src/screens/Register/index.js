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
import { Feather } from "@expo/vector-icons";

import { styles } from "./styles";

export default function Login() {
  const [hidePassword, setHidePassword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const scrollViewRef = useRef(null);
  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  const handlePress = () => {
    navigation.navigate("Welcome");
  };

  const onChangeEmail = (newEmail) => {
    setEmail(newEmail);
  };

  const onChangePassword = (newPassword) => {
    setPassword(newPassword);
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
      <Text style={styles.title}>CADASTRAR</Text>
      <Text style={styles.text}>Email</Text>
      <TextInput
        style={styles.inputs}
        onChangeText={onChangeEmail}
        value={email}
      />
      <Text style={styles.text}>Senha</Text>
      <TextInput
        style={styles.inputs}
        onChangeText={onChangePassword}
        value={password}
        secureTextEntry={hidePassword}
      />
      <TouchableOpacity
        style={styles.iconEye}
        onPress={togglePasswordVisibility}
      >
        <Feather
          name={hidePassword ? "eye-off" : "eye"}
          size={20}
          color="#334F59"
          onPress={togglePasswordVisibility}
        />
      </TouchableOpacity>
      <Text style={styles.text}>Confirme sua senha</Text>
      <TextInput
        style={styles.inputs}
        onChangeText={onChangePassword}
        value={password}
        secureTextEntry={hidePassword}
      />
      <TouchableOpacity
        style={styles.iconEye}
        onPress={togglePasswordVisibility}
      >
        <Feather
          name={hidePassword ? "eye-off" : "eye"}
          size={20}
          color="#334F59"
          onPress={togglePasswordVisibility}
        />
      </TouchableOpacity>

      <View style={styles.viewBtn}>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>SALVAR</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handlePress} style={styles.containerLink}>
        <Text style={styles.link}>voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
