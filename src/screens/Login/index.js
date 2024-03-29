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
  Alert,
} from "react-native";
import Logo from "../../assets/logo.png";
import { Feather } from "@expo/vector-icons";

import { styles } from "./styles";
import { authenticateUser } from "../../services/BibleApi/requests";
import { savesUserInformation, getAllUsers } from "../../services/SQLite/user";

export default function Login() {
  const [hidePassword, setHidePassword] = useState(true);
  const [email, setEmail] = useState("edevaldo_cruz@hotmail.com");
  const [password, setPassword] = useState("4Bu4rGMYuH");
  const navigation = useNavigation();

  const scrollViewRef = useRef(null);
  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  const handlePressHome = () => {
    navigation.navigate("Home");
  };

  const handlePressBack = () => {
    navigation.navigate("Welcome");
  };

  const handlePressPassword = () => {
    navigation.navigate("RecoverPassword");
  };

  const onChangeEmail = (newEmail) => {
    setEmail(newEmail);
  };

  const onChangePassword = (newPassword) => {
    setPassword(newPassword);
  };

  async function getToken() {
    try {
      const result = await authenticateUser(email, password);
      if (result) {
        await savesUserInformation(result);
        navigation.navigate("Home");
      } else {
        Alert.alert("Email ou senha incorreta.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro, verifique as informações e tente novamente.");
    }
  }

  // async function fetchUsers() {
  //   try {
  //     const users = await getAllUsers();
  //     console.log(users);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

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
      <Text style={styles.title}>LOGIN</Text>

      <View style={styles.containerInputs}>
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
      </View>

      <TouchableOpacity
        onPress={handlePressPassword}
        style={styles.containerLinkRecover}
      >
        <Text style={styles.linkRecover}>Esqueci minha senha</Text>
      </TouchableOpacity>

      <View style={styles.viewBtn}>
        <TouchableOpacity
          style={styles.btn}
          //onPress={handlePressHome}
          onPress={getToken}
        >
          <Text style={styles.btnText}>ENTRAR</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handlePressBack} style={styles.containerLink}>
        <Text style={styles.link}>voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
