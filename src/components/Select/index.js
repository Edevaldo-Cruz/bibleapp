import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { updateVersion } from "../../services/SQLite/user";

export default function VersionSelect({ userId }) {
  const [selectedLanguage, setSelectedLanguage] = useState("nvi");

  const handleUpdateVersion = (value) => {
    updateVersion(userId, value);
  };

  return (
    <View>
      <RNPickerSelect
        placeholder={{ label: "Selecione...", value: null }}
        items={[
          { label: "Almeida Corrigida Fiel (ACF)", value: "acf" },
          { label: "Almeida Edição Revista e Atualizada (AA)", value: "apee" },
          { label: "Bíblia King James (KJV)", value: "kjv" },
          { label: "Bíblia Viva (BVE)", value: "bbe" },
          { label: "Nova Versão Internacional (NVI)", value: "nvi" },
          { label: "Bíblia Revista e Atualizada (RA)", value: "ra" },
          { label: "Reina-Valera 1960 (RVR)", value: "rvr" },
        ]}
        onValueChange={(value) => {
          setSelectedLanguage(value);
          handleUpdateVersion(value);
        }}
        style={pickerSelectStyles}
        value={selectedLanguage}
      />
      <Text>Linguagem selecionada: {selectedLanguage}</Text>
    </View>
  );
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
    width: "120%",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#FFF",
  },
  inputAndroid: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
    width: "120%",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#FFF",
  },
});
