import "react-native-gesture-handler";
import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ChoosePlanScreen } from "../views/choosePlan/ChoosePlanScreen";
import { ResumeChoosenPlanScreen } from "../views/resumeChoosenPlan/ResumeChoosenPlanScreen";

const Stack = createStackNavigator();

export const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="ChoosePlanScreen" component={ChoosePlanScreen} />
      <Stack.Screen name="ResumeChoosenPlanScreen" component={ResumeChoosenPlanScreen} />
    </Stack.Navigator>
  );
}
