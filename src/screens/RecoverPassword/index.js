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
  Modal,
  Button,
} from "react-native";
import Logo from "../../assets/logo.png";

import { styles } from "./styles";
import { RecoverPasswordUser } from "../../services/BibleApi/requests";

export default function RecoverPassword() {
  const [email, setEmail] = useState("");
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const [countdown, setCountdown] = useState(300);

  const handlePressBack = () => {
    navigation.navigate("Welcome");
  };

  const onChangeEmail = (newEmail) => {
    setEmail(newEmail);
  };

  const startCountdown = () => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      setCountdown(300);
    }, 300000);
  };

  const recoverPassword = async () => {
    try {
      await RecoverPasswordUser(email);
      setSuccessModalVisible(true);
      startCountdown();
      console.log("Solicitação de recuperação de senha enviada com sucesso!");
    } catch (error) {
      setErrorModalVisible(true);
      console.error("Erro ao solicitar recuperação de senha:", error.message);
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
          <TouchableOpacity onPress={recoverPassword} style={styles.btn}>
            <Text style={styles.btnText}>ENVIAR</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={handlePressBack}
          style={styles.containerLink}
        >
          <Text style={styles.link}>voltar</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={successModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContainerHeader}>
              <Text style={styles.modalTitle}>
                Uma nova senha foi enviada para o seu e-mail.
              </Text>
            </View>
            <View>
              <Text style={styles.modalText}>
                Por favor, verifique a caixa de entrada do seu e-mail. Se não
                encontrar, confira também na pasta de Spam ou Lixeira. Aguarde{" "}
                {Math.floor(countdown / 60)}:{countdown % 60} minutos antes de
                solicitar novamente.
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                setSuccessModalVisible(false);
                navigation.navigate("Welcome");
              }}
              style={styles.btnModal}
            >
              <Text style={styles.btnTextModal}>FECHAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={errorModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContainerHeader}>
              <Text style={styles.modalTitle}>E-mail não encontrado</Text>
            </View>
            <View>
              <Text style={styles.modalText}>
                Desculpe, o e-mail fornecido não foi encontrado no banco de
                dados. Por favor, verifique se o e-mail foi digitado
                corretamente ou considere cadastrar um novo usuário.
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                setSuccessModalVisible(false);
                navigation.navigate("Welcome");
              }}
              style={styles.btnModal}
            >
              <Text style={styles.btnTextModal}>FECHAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
