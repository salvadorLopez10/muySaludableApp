import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView } from "@react-navigation/drawer";
import { UserProfileScreen } from '../views/userProfile/UserProfileScreen';
import MainMenuScreen from "../views/mainMenu/MainMenuScreen";
import { Image, Text } from "react-native";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";

const Drawer = createDrawerNavigator();

export const LateralMenu = () => {
  return (
    <Drawer.Navigator
        drawerContent={ (props) => <InternalMenu { ...props }/> }
    >
      <Drawer.Screen
        name="UserProfileScreen"
        options={{ title: "Perfil del Usuario" }}
        component={UserProfileScreen}
      />
      <Drawer.Screen
        name="MainMenuScreen"
        options={{ title: "Plan Alimenticio" }}
        component={MainMenuScreen}
      />
    </Drawer.Navigator>
  );
}

const InternalMenu = ({navigation}: DrawerContentComponentProps) => {
  return (
    <DrawerContentScrollView>
        {/* Estilos del avatar */}
        <View style={styles.containerAvatar}>
            <Image
            source={ require("../../assets/logoMuySaludable.png") }
            style={styles.avatar}
            />
        </View>

      {/* Opciones del menú */}
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuOpcionContainer}
            onPress={() => navigation.navigate("UserProfileScreen")}
        >
            <Text style={styles.menuTexto}>Perfil de Usuario</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuOpcionContainer}
            onPress={() => navigation.navigate("MainMenuScreen")}
        >
            <Text style={styles.menuTexto}>Plan Alimenticio</Text>
        </TouchableOpacity>
      </View>
    

    </DrawerContentScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  containerAvatar: {
    alignItems: "center",
    marginTop: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  menuContainer: {
    marginVertical: 30,
    marginHorizontal: 50,
  },
  menuOpcionContainer:{
   marginVertical:20 
  },
  menuTexto: {
    fontSize: 18,
  },
});