import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

export default function BibleButtonsSection({
  sendDataToParent,
  dataFromChildA,
}) {
  const [title, setTitle] = useState("Velho Testamento");
  const [filter, setFilter] = useState("VT");

  const sendToParent = () => {
    sendDataToParent(filter);
  };

  const oldTestament = () => {
    setTitle("Velho Testamento");
    setFilter("VT");
    sendDataToParent("VT");
  };

  const newTestament = () => {
    setTitle("Novo Testamento");
    setFilter("NT");
    sendDataToParent("NT");
  };

  useEffect(() => {
    setFilter(dataFromChildA);
  }, [dataFromChildA]);

  return (
    <>
      <View style={styles.containerBtnBible}>
        <Text style={styles.title}>BIBLIA</Text>
        <View style={styles.containerBtn}>
          <TouchableOpacity
            style={
              title === "Velho Testamento"
                ? styles.btnActivated
                : styles.btnDeactivated
            }
            onPress={oldTestament}
          >
            <Text style={styles.textDeactivated}>Velho Testamento</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              title === "Novo Testamento"
                ? styles.btnActivated
                : styles.btnDeactivated
            }
            onPress={newTestament}
          >
            <Text style={styles.textActivated}>Novo Testamento</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <Text style={styles.titleDinamic}>{title}</Text>
      </View>
    </>
  );
}
