import React, { useState, useEffect } from "react";
import { Alert, FlatList, View } from "react-native";
import { useNavigation, DrawerActions } from "@react-navigation/native";

import { styles } from "./styles";
import HeaderSection from "./Components/HeaderSection";
import LatestReadings from "./Components/LatestReadings";
import BibleButtonsSection from "./Components/BibleButtonsSection";
import Books from "./Components/Books";

import { getUser } from "../../services/SQLite/user";
import Load from "../../components/Load";

export default function Home() {
  const [filter, setFilter] = useState("VT");
  const [nameUser, setNameUser] = useState("");
  const [token, setToken] = useState("");
  const [id, setId] = useState();
  const [dataLoaded, setDataLoaded] = useState(false);
  const navigation = useNavigation();

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const sections = [
    { key: "header", component: <HeaderSection nameUser={nameUser} /> },
    {
      key: "latestReadings",
      component: <LatestReadings receivedData={filter} token={token} id={id} />,
    },
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
          setDataLoaded(true);
        } else {
          console.log("Nenhum usuário encontrado");
          setDataLoaded(true);
        }
      } catch (error) {
        console.error(error);
        setDataLoaded(true);
      }
    }
    fetchUsers();
  }, []);

  if (!dataLoaded) {
    return <Load />;
  }

  return (
    <FlatList
      style={styles.container}
      data={sections}
      renderItem={({ item }) => (
        <View>{React.cloneElement(item.component, { openDrawer })}</View>
      )}
      keyExtractor={(item) => item.key}
    />
  );
}
