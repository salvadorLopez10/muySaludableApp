import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StackNavigator } from "./src/navigator/StackNavigator";
import { LateralMenu } from './src/navigator/LateralMenu';
import { BottomTabs } from './src/navigator/BottomTabs';

export default function App() {
  
  const [userPlanActive, setUserPlanActive] = useState('1');

  return (
    <NavigationContainer>
      {
        userPlanActive == "0" ? 
          <StackNavigator /> : 
          // <LateralMenu />
          <BottomTabs />
      }
      {/* <BottomTabs /> */}
      {/* <StackNavigator /> */}
      {/* <LateralMenu /> */}
    </NavigationContainer>
  );
}