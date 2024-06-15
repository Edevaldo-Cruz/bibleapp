import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

import Welcome from "../screens/Welcome";
import Login from "../screens/Login";
import Register from "../screens/Register";
import RecoverPassword from "../screens/RecoverPassword";
import Home from "../screens/Home";
import Reader from "../screens/Reader";
import Annotation from "../screens/Annotation";
import Favorite from "../screens/Favorite";
import ModalConfig from "../components/ModalConfig";
import Load from "../components/Load";

import { getUserActive } from "../services/SQLite/user";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

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
      <Drawer.Navigator>
        <Drawer.Screen name="ComponentsDrawer" options={{ headerShown: false }}>
          {(props) => <MainStack {...props} userExists={userExists} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

function MainStack({ userExists }) {
  return (
    <Stack.Navigator initialRouteName={userExists ? "Home" : "Welcome"}>
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RecoverPassword"
        component={RecoverPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Reader"
        component={Reader}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Annotation"
        component={Annotation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Favorite"
        component={Favorite}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ComponentsDrawer"
        component={ModalConfig}
        options={{ headerShown: false }}
        // , initialParams: { userId: id }
      />
    </Stack.Navigator>
  );
}
