import React, { useState, useEffect } from "react";
import { FlatList, View } from "react-native";

import { styles } from "./styles";
import HeaderSection from "./Components/HeaderSection";
import LatestReadings from "./Components/LatestReadings";
import BibleButtonsSection from "./Components/BibleButtonsSection";
import Books from "./Components/Books";

import { getUser } from "../../services/SQLite/user";

export default function Home() {
  const [filter, setFilter] = useState("VT");
  const [nameUser, setNameUser] = useState("");
  const [token, setToken] = useState("");
  const [id, setId] = useState();

  const sections = [
    { key: "header", component: <HeaderSection nameUser={nameUser} /> },
    { key: "latestReadings", component: <LatestReadings id={id} /> },
    {
      key: "bibleButtons",
      component: (
        <BibleButtonsSection
          sendDataToParent={(data) => setFilter(data)}
          filter={filter}
        />
      ),
    },
    {
      key: "books",
      component: <Books receivedData={filter} token={token} id={id} />,
    },
  ];

  useEffect(() => {
    async function fetchUsers() {
      try {
        const users = await getUser();
        if (users.length > 0) {
          const { id, name, token } = users[0];
          setNameUser(name);
          setToken(token);
          setId(id);
        } else {
          console.log("Nenhum usuário encontrado");
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchUsers();
  }, []);

  return (
    <FlatList
      style={styles.container}
      data={sections}
      renderItem={({ item }) => <View>{item.component}</View>}
      keyExtractor={(item) => item.key}
    />
  );
}
