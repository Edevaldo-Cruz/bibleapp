import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Welcome from "../screens/Welcome";
import Login from "../screens/Login";
import Register from "../screens/Register";
import RecoverPassword from "../screens/RecoverPassword";
import Home from "../screens/Home";
import Reader from "../screens/Reader";
import Annotation from "../screens/Annotation";
import Load from "../components/Load";

import { getUser } from "../services/SQLite/user";
import Favorite from "../screens/Favorite";

const Stack = createStackNavigator();
export default function AppRoutes() {
  const [userExists, setUserExists] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const user = await getUser();
        if (user && user.length > 0) {
          setUserExists(true);
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
      <Stack.Navigator>
        {userExists ? (
          <>
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
          </>
        ) : (
          <>
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
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
