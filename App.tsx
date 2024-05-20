import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StackNavigator } from "./src/navigator/StackNavigator";
import { LateralMenu } from './src/navigator/LateralMenu';
import { BottomTabs } from './src/navigator/BottomTabs';
import { useFonts } from "expo-font";
import { Alert, Text, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthStore } from './src/store/auth/useAuthStore';
import * as Notifications from "expo-notifications";
import UserProfileStackNavigator from './src/navigator/UserProfileStackNavigator';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [userPlanActive, setUserPlanActive] = useState("1");
  const [authenticated, setAuthenticated] = useState(false);

  const [fontsLoaded, fontError] = useFonts({
    "Gotham-Ultra": require("./assets/fonts/Gotham-Ultra.otf"),
    "Gotham-Book": require("./assets/fonts/Gotham-Book.otf"),
    "Gotham-Thin": require("./assets/fonts/Gotham-Thin.otf"),
    "Gotham-Medium": require("./assets/fonts/Gotham-Medium.otf"),
    "Gotham-BlackItalic": require("./assets/fonts/Gotham-BlackItalic.otf"),
  });

  const status = useAuthStore((state) => state.status);
  const userInfo = useAuthStore((state) => state.user);

  useEffect(() => {
    getInfoUser();
  }, []);

  const getInfoUser = async () => {
    const user = await AsyncStorage.getItem("user");

    if (user != null) {
      useAuthStore.setState({ status: "authenticated" });
      useAuthStore.setState({ user: JSON.parse(user) });
    }
  };

  if( !fontsLoaded ){
    console.log("SIN FUENTES");
    return <View>
      <Text>No se cargaron las fuentes</Text>
    </View>
  }


 const renderNavigator = () => {
  console.log("RENDER NAVIGATOR");
  console.log(JSON.stringify(userInfo,null,2))
   if (!userInfo) {
    console.log("STACKNAVIGATOR")
     return <StackNavigator />;
   } else if (isExpiratedPlan(userInfo.fecha_expiracion)) { //isExpiratedPlan("2024-05-11T05:59:00.000Z")
    console.log("UserProfileStackNavigator");
     return <UserProfileStackNavigator />;
   } else {
    console.log("LateralMenu");
     return <LateralMenu />;
   }
 };
  const isExpiratedPlan = (fechaExpiracion: string) => {
    console.log("ENTRA COMPARACION DE FECHAS");
    const currentDate = new Date();
    const expirationDate = new Date(fechaExpiracion);

    console.log(currentDate, expirationDate);

    if (currentDate > expirationDate) {
      return true;
    }

    return false;
  };

  return (
    <NavigationContainer>
      {
         //status !== "authenticated" ? <StackNavigator /> : <LateralMenu />
        // <BottomTabs />
        renderNavigator()
      }
      {/* <BottomTabs /> */}
      {/* <StackNavigator /> */}
      {/* <LateralMenu /> */}
    </NavigationContainer>
  );
}