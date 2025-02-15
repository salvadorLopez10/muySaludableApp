import "react-native-gesture-handler";
import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../views/login/LoginScreen";
import { NewUserScreen } from "../views/newUser/NewUserScreen";

export type RootStackParams = {
  LoginScreen: undefined;
  NewUserScreen: undefined
};

const Stack = createStackNavigator<RootStackParams>();

export const NewUserNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="NewUserScreen"
        component={NewUserScreen}
        options={{ headerShown: false }}
        />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
