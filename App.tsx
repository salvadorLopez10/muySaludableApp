import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StackNavigator } from "./src/navigator/StackNavigator";
import { LateralMenu } from './src/navigator/LateralMenu';
import { BottomTabs } from './src/navigator/BottomTabs';
import { useFonts } from "expo-font";
import { Text, View } from "react-native";

export default function App() {
  const [userPlanActive, setUserPlanActive] = useState("1");
  const [fontsLoaded, fontError] = useFonts({
    "Gotham-Ultra": require("./assets/fonts/Gotham-Ultra.otf"),
    "Gotham-Book": require("./assets/fonts/Gotham-Book.otf"),
    "Gotham-Thin": require("./assets/fonts/Gotham-Thin.otf"),
    "Gotham-Medium": require("./assets/fonts/Gotham-Medium.otf"),
    "Gotham-BlackItalic": require("./assets/fonts/Gotham-BlackItalic.otf"),
  });

  if( !fontsLoaded ){
    console.log("SIN FUENTES");
    return <View>
      <Text>No se cargaron las fuentes</Text>
    </View>
  }
  
  

  return (
    <NavigationContainer>
      {
        userPlanActive == "1" ? 
          <StackNavigator /> : 
          <LateralMenu />
          // <BottomTabs />
      }
      {/* <BottomTabs /> */}
      {/* <StackNavigator /> */}
      {/* <LateralMenu /> */}
    </NavigationContainer>
  );
}