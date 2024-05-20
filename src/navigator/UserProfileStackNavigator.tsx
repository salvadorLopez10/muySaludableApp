import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { UserProfileScreen } from "../views/userProfile/UserProfileScreen";
import { ChoosePlanScreen } from "../views/choosePlan/ChoosePlanScreen";
import { ResumeChoosenPlanScreen } from "../views/resumeChoosenPlan/ResumeChoosenPlanScreen";
import { PaymentScreen } from "../views/payment/PaymentScreen";
import { useAuthStore } from "../store/auth/useAuthStore";
import { Alert } from "react-native";
import QuizSummaryScreen from "../views/quizSummary/QuizSummaryScreen";
import { LoginScreen } from "../views/login/LoginScreen";

const Stack = createStackNavigator();

const UserProfileStackNavigator = () => {
    
  return (
    <Stack.Navigator initialRouteName="ChoosePlanScreen">
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
        name="QuizSummaryScreen"
        component={QuizSummaryScreen}
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

export default UserProfileStackNavigator;
