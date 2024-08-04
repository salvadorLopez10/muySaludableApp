import "react-native-gesture-handler";
import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../views/login/LoginScreen";
import { LateralMenu } from "./LateralMenu";
import QuizUpdateAnualScreen from "../views/quiz/QuizUpdateAnualScreen";

interface Plan {
  id: number;
  nombre: string;
  resumen: string;
  descripcion_detallada: string;
  duracion_meses: string;
  precio: string;
  createdAt: string;
  updatedAt: string;
}

export type RootStackParams = {
  LoginScreen: undefined;
  ChoosePlanScreen: undefined;
  ResumeChoosenPlanScreen: { selectedPlan: Plan };
  PaymentScreen: {
    email: string;
    precio: string;
    plan: string;
    idPlan: number;
    fechaExpiracion: string;
  };
  QuizScreen: undefined;
  ResumeAnswersScreen: undefined;
  MainMenuScreen: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export const UpdateAnualPlanNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="QuizScreen"
        component={QuizUpdateAnualScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainMenuScreen"
        component={LateralMenu}
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
