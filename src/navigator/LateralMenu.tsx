import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView } from "@react-navigation/drawer";
import { UserProfileScreen } from '../views/userProfile/UserProfileScreen';
import MainMenuScreen from "../views/mainMenu/MainMenuScreen";
import { Image, Text, Linking, Alert } from "react-native";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { ManageAccountScreen } from "../views/manageAccount/ManageAccountScreen";
import { PrivacyLegalScreen } from '../views/privacyLegal/PrivacyLegalScreen';
import { BottomTabs } from "./BottomTabs";
import Icon from "react-native-vector-icons/Ionicons";
import { StackNavigator } from "./StackNavigator";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthStore } from "../store/auth/useAuthStore";
import { SourcesReferencesScreen } from "../views/sourcesReferences/SourcesReferencesScreen";

const Drawer = createDrawerNavigator();

export const LateralMenu = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <InternalMenu {...props} />}>
      <Drawer.Screen
        name="Main"
        options={{ title: "Muy Saludable" }}
        component={BottomTabs}
      />
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
        name="SourcesReferencesScreen"
        options={{ title: "Fuentes y Referencias" }}
        component={SourcesReferencesScreen}
      />
      {/* <Drawer.Screen
        name="StackNavigator"
        options={{ headerShown: false }}
        component={StackNavigator}
      />  */}
    </Drawer.Navigator>
  );
}

const InternalMenu = ({navigation}: DrawerContentComponentProps) => {

  const handleOpenWA = () => {

    let phoneNumber = '525565282789'; // Número de teléfono con el código internacional, por ejemplo: 521 para México.
    let message = '¡Hola!, requiero asistencia para la App';

    // Construir la URL para abrir en WhatsApp
    //let url = `whatsapp://send?text=${encodeURIComponent(message)}&phone=${phoneNumber}`;
    let url =`http://api.whatsapp.com/send?phone=${phoneNumber}`;

    const phoneUrl = `tel:${phoneNumber}`;

    // Verificar si WhatsApp está instalado
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          // Si WhatsApp no está disponible, abrir la app de teléfono
          Linking.canOpenURL(phoneUrl)
            .then((supported) => {
              if (supported) {
                Linking.openURL(phoneUrl); // Abre la app de teléfono
              } else {
                Alert.alert(
                  'Error',
                  'No se puede abrir la aplicación de teléfono.'
                );
              }
            })
            .catch((error) =>
              console.error('Error al intentar abrir la app de teléfono', error)
            );
        }
      })
      .catch((error) => console.error('Error al abrir WhatsApp', error));

  }

  return (
    <View style={styles.container}>
      <DrawerContentScrollView style={styles.drawerScrollView}>
        {/* Logo */}
        <View style={styles.containerAvatar}>
          <Image
            source={require("../../assets/logoMuySaludableMR.png")}
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
              {/* <Icon name="home-outline" size={25} color="black" /> */}
              <Image style={{ width: 30, height: 30 }} source={require("../../assets/inicio.png")} />
              <Text style={styles.menuTexto}>Inicio</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuOptionContainer}
            onPress={() => navigation.navigate("UserProfileScreen")}
          >
            <View style={styles.menuOptionContent}>
              {/* <Icon name="person-circle-outline" size={25} color="black" /> */}
              <Image style={{ width: 30, height: 30 }} source={require("../../assets/Usuario.png")} />
              <Text style={styles.menuTexto}>Perfil de Usuario</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuOptionContainer}
            onPress={() => navigation.navigate("ManageAccountScreen")}
          >
            <View style={styles.menuOptionContent}>
              {/* <Icon name="cog-outline" size={25} color="black" /> */}
              <Image style={{ width: 30, height: 30 }} source={require("../../assets/Configuracion.png")} />
              <Text style={styles.menuTexto}>Administrar Cuenta</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuOptionContainer}
            onPress={() => navigation.navigate("SourcesReferencesScreen")}
          >
            <View style={styles.menuOptionContent}>
              {/* <Icon name="cog-outline" size={25} color="black" /> */}
              <Image style={{ width: 30, height: 30 }} source={require("../../assets/Aviso_Privacidad.png")} />
              <Text style={styles.menuTexto}>Fuentes y Referencias</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuOptionContainer}
            onPress={ handleOpenWA }
          >
            <View style={styles.menuOptionContent}>
              <Image style={{ width: 30, height: 30 }} source={require("../../assets/contactanos_menu.jpeg")} />
              <Text style={styles.menuTexto}>Contáctanos</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuOptionContainer}
            onPress={() => navigation.navigate("PrivacyLegalScreen")}
          >
            <View style={styles.menuOptionContent}>
              {/* <Icon name="newspaper-outline" size={25} color="black" /> */}
              <Image style={{ width: 30, height: 30 }} source={require("../../assets/Aviso_Privacidad.png")} />
              <Text style={styles.menuTexto}>Política de privacidad</Text>
            </View>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>

      {/* Opción para cerrar sesión */}
      <TouchableOpacity
        style={styles.logoutContainer}
        onPress={async () => {
          await AsyncStorage.removeItem("user");
          await AsyncStorage.removeItem("mealPlan");

          // Actualiza ambos valores en el estado
          await useAuthStore.setState({ status: "unauthenticated", user: undefined });

        }}
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
    height: 103,
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
    marginLeft: 10,
    fontSize: 16,
    //fontWeight: "bold",
    fontFamily: "Gotham-Medium"
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
    //fontWeight: "bold",
    fontFamily: "Gotham-Medium"
  },
});