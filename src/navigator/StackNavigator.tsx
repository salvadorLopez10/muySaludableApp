import "react-native-gesture-handler";
import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ChoosePlanScreen } from "../views/choosePlan/ChoosePlanScreen";
import { ResumeChoosenPlanScreen } from "../views/resumeChoosenPlan/ResumeChoosenPlanScreen";
import QuizScreen from "../views/quiz/QuizScreen";
import { PaymentScreen } from "../views/payment/PaymentScreen";
import ResumeAnswersScreen from "../views/resumeAnswers/ResumeAnswersScreen";
import MainMenuScreen from "../views/mainMenu/MainMenuScreen";

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
  ChoosePlanScreen: undefined,
  ResumeChoosenPlanScreen: {selectedPlan: Plan},
  PaymentScreen: { email: string, precio: string },
  QuizScreen: undefined,
  ResumeAnswersScreen: undefined,
  MainMenuScreen: undefined
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
        name="ChoosePlanScreen"
        component={ChoosePlanScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ResumeChoosenPlanScreen"
        component={ResumeChoosenPlanScreen}
        options={{ headerTransparent: true, headerBackTitle: "", title: "" }}
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
        component={MainMenuScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
