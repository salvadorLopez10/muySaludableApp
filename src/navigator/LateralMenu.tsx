import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView } from "@react-navigation/drawer";
import { UserProfileScreen } from '../views/userProfile/UserProfileScreen';
import MainMenuScreen from "../views/mainMenu/MainMenuScreen";
import { Image, Text } from "react-native";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { ManageAccountScreen } from "../views/manageAccount/ManageAccountScreen";
import { PrivacyLegalScreen } from '../views/privacyLegal/PrivacyLegalScreen';
import { BottomTabs } from "./BottomTabs";
import Icon from "react-native-vector-icons/Ionicons";

const Drawer = createDrawerNavigator();

export const LateralMenu = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <InternalMenu {...props} />}>
      <Drawer.Screen
        name="UserProfileScreen"
        options={{ title: "Perfil del Usuario" }}
        component={UserProfileScreen}
      />
      <Drawer.Screen
        name="ManageAccountScreen"
        options={{ title: "Administrar Cuenta" }}
        component={ManageAccountScreen}
      />
      <Drawer.Screen
        name="PrivacyLegalScreen"
        options={{ title: "Privacidad y aviso legal" }}
        component={PrivacyLegalScreen}
      />
      <Drawer.Screen
        name="Main"
        options={{ title: "Inicio" }}
        component={BottomTabs}
      />
    </Drawer.Navigator>
  );
}

const InternalMenu = ({navigation}: DrawerContentComponentProps) => {
  return (
    <View style={styles.container}>
      <DrawerContentScrollView style={styles.drawerScrollView}>
        {/* Logo */}
        <View style={styles.containerAvatar}>
          <Image
            source={require("../../assets/logoMuySaludable.png")}
            style={styles.avatar}
          />
        </View>
        {/* Línea divisoria */}
        <View style={styles.divider} />

        {/* Opciones del menú */}
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuOptionContainer}
            onPress={() => navigation.navigate("Main")}
          >
            <View style={styles.menuOptionContent}>
              <Icon name="home-outline" size={25} color="black" />
              <Text style={styles.menuTexto}>Inicio</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuOptionContainer}
            onPress={() => navigation.navigate("UserProfileScreen")}
          >
            <View style={styles.menuOptionContent}>
              <Icon name="person-circle-outline" size={25} color="black" />
              <Text style={styles.menuTexto}>Perfil de Usuario</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuOptionContainer}
            onPress={() => navigation.navigate("ManageAccountScreen")}
          >
            <View style={styles.menuOptionContent}>
              <Icon name="cog-outline" size={25} color="black" />
              <Text style={styles.menuTexto}>Administrar Cuenta</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuOptionContainer}
            onPress={() => navigation.navigate("PrivacyLegalScreen")}
          >
            <View style={styles.menuOptionContent}>
              <Icon name="newspaper-outline" size={25} color="black" />
              <Text style={styles.menuTexto}>Privacidad y aviso legal</Text>
            </View>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>

      {/* Opción para cerrar sesión */}
      <TouchableOpacity
        style={styles.logoutContainer}
        onPress={() => console.log("Cerrar sesión")}
      >
        <Icon name="exit-outline" size={25} color="black" />
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerScrollView: {
    flex: 1,
  },
  containerAvatar: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  avatar: {
    width: 100,
    height: 100,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    marginVertical: 10,
  },
  menuContainer: {
    marginTop: 10,
  },
  menuOptionContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  menuOptionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuTexto: {
    marginLeft: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "lightgray",
  },
  logoutText: {
    marginLeft: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
});