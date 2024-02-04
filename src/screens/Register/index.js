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
import Colors from "../../constants/Colors";
import { newUser } from "../../services/BibleApi/requests";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const navigation = useNavigation();

  const scrollViewRef = useRef(null);
  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setHideConfirmPassword(!hideConfirmPassword);
  };

  const handlePress = () => {
    navigation.navigate("Welcome");
  };

  const onChangeName = (newName) => {
    setName(newName);
  };

  const onChangeEmail = (newEmail) => {
    setEmail(newEmail);
  };

  const onChangePassword = (newPassword) => {
    setPassword(newPassword);
  };

  const handlePressSalve = async () => {
    try {
      const result = await newUser(name, email, password, true);

      if (result && result.token) {
        navigation.navigate("Home");
      } else {
        Alert.alert(
          "Erro ao criar usuário. Verifique as informações preenchidas e tente novamente."
        );
      }
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      Alert.alert(
        "Ocorreu um erro ao criar o usuário. Por favor, tente novamente."
      );
    }
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

        <Text style={styles.title}>CADASTRAR</Text>
      </View>

      <View style={styles.containerInputs}>
        <Text style={styles.text}>Nome</Text>
        <TextInput
          style={styles.inputs}
          onChangeText={onChangeName}
          value={name}
        />

        <Text style={styles.text}>Email</Text>
        <TextInput
          style={styles.inputs}
          onChangeText={onChangeEmail}
          value={email}
        />
        <View style={styles.password}>
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
              color={Colors.background}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.confirm}>
          <Text style={styles.text}>Confirme sua senha</Text>
          <TextInput
            style={styles.inputs}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={hideConfirmPassword}
          />
          <TouchableOpacity
            style={styles.iconEye}
            onPress={toggleConfirmPasswordVisibility}
          >
            <Feather
              name={hideConfirmPassword ? "eye-off" : "eye"}
              size={20}
              color={Colors.background}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.viewBtn}>
        <TouchableOpacity
          disabled={
            name === "" ||
            email === "" ||
            password === "" ||
            password != confirmPassword
          }
          style={
            name === "" ||
            email === "" ||
            password === "" ||
            password != confirmPassword
              ? styles.btnDisabled
              : styles.btn
          }
          onPress={handlePressSalve}
        >
          <Text style={styles.btnText}>SALVAR</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handlePress} style={styles.containerLink}>
        <Text style={styles.link}>voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
