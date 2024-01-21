import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StackNavigator } from "./src/navigator/StackNavigator";
import { LateralMenu } from './src/navigator/LateralMenu';

export default function App() {
  return (
    <NavigationContainer>
      {/* <StackNavigator /> */}
      <LateralMenu />
    </NavigationContainer>
  );
}
