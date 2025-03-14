import "react-native-gesture-handler";
import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ChoosePlanScreen } from "../views/choosePlan/ChoosePlanScreen";
import { ResumeChoosenPlanScreen } from "../views/resumeChoosenPlan/ResumeChoosenPlanScreen";
import QuizScreen from "../views/quiz/QuizScreen";
import { PaymentScreen } from "../views/payment/PaymentScreen";
import ResumeAnswersScreen from "../views/resumeAnswers/ResumeAnswersScreen";
import MainMenuScreen from "../views/mainMenu/MainMenuScreen";
import { LoginScreen } from "../views/login/LoginScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LateralMenu } from "./LateralMenu";
import { NewUserScreen } from "../views/newUser/NewUserScreen";

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
  LoginScreen: undefined,
  ChoosePlanScreen: undefined,
  ResumeChoosenPlanScreen: {selectedPlan: Plan},
  PaymentScreen: { email: string, precio: string, plan: string, idPlan: number, fechaExpiracion: string },
  QuizScreen: undefined,
  ResumeAnswersScreen: undefined,
  MainMenuScreen: undefined,
  NewUserScreen: undefined
};

const Stack = createStackNavigator<RootStackParams>();


export const StackNavigator = () => {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ChoosePlanScreen"
        component={ChoosePlanScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ResumeChoosenPlanScreen"
        component={ResumeChoosenPlanScreen}
        options={{
          headerTransparent: true,
          headerBackTitle: "",
          title: "",
        }}
      />
      <Stack.Screen
        name="PaymentScreen"
        component={PaymentScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="QuizScreen"
        component={QuizScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ResumeAnswersScreen"
        component={ResumeAnswersScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainMenuScreen"
        component={LateralMenu}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NewUserScreen"
        component={NewUserScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
