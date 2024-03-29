import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Welcome from "../screens/Welcome";
import Login from "../screens/Login";
import Register from "../screens/Register";
import RecoverPassword from "../screens/RecoverPassword";
import Home from "../screens/Home";
import Reader from "../screens/Reader";
import Annotation from "../screens/Annotation";
import Load from "../components/Load";

import { getUserActive } from "../services/SQLite/user";
import Favorite from "../screens/Favorite";
import ComponentsDrawer from "../components/Drawer";

const Drawer = createDrawerNavigator();

export default function AppRoutes() {
  const [userExists, setUserExists] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const user = await getUserActive();
        if (user && user.length > 0) {
          setUserExists(true);
          setId(user[0].id);
        }
        setDataLoaded(true);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUsers();
  }, []);

  if (!dataLoaded) {
    return <Load />;
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName={userExists ? "ComponentsDrawer" : "Welcome"}
      >
        <Drawer.Screen
          name="ComponentsDrawer"
          component={ComponentsDrawer}
          options={{ headerShown: false }}
          initialParams={{ userId: id }}
        />
        <Drawer.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }}
        />
        <Drawer.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Drawer.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Drawer.Screen
          name="RecoverPassword"
          component={RecoverPassword}
          options={{ headerShown: false }}
        />
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Drawer.Screen
          name="Reader"
          component={Reader}
          options={{ headerShown: false }}
        />
        <Drawer.Screen
          name="Annotation"
          component={Annotation}
          options={{ headerShown: false }}
        />
        <Drawer.Screen
          name="Favorite"
          component={Favorite}
          options={{ headerShown: false }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
