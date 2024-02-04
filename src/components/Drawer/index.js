import { Text, View, TouchableOpacity } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { styles } from "./styles";
import Home from "../../screens/Home";
import VersionSelect from "../Select";

export default function ComponentsDrawer() {
  const Drawer = createDrawerNavigator();
  const CustomDrawerContent = ({ navigation }) => (
    <View style={styles.container}>
      <View>
        <View>
          <View style={styles.user}>
            <Text style={styles.letterUser}>E</Text>
          </View>

          <View>
            <Text style={styles.nameUser}>Edevaldo Cruz Antonio</Text>
            <Text style={styles.annotationsUser}>10 anotações</Text>
          </View>

          <View style={styles.line}></View>
        </View>
        <Text style={styles.text}>Escolha a versão da biblia:</Text>
        <VersionSelect />
      </View>
      <View>
        <TouchableOpacity style={styles.btn}>
          <Text>Logoff</Text>
        </TouchableOpacity>
        <Text>**Desenvolvido por Edevaldo Cruz**</Text>
      </View>
    </View>
  );

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      drawerPosition="right"
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
}
