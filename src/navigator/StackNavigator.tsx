import "react-native-gesture-handler";
import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ChoosePlanScreen } from "../views/choosePlan/ChoosePlanScreen";
import { ResumeChoosenPlanScreen } from "../views/resumeChoosenPlan/ResumeChoosenPlanScreen";
import QuizScreen from "../views/quiz/QuizScreen";

const Stack = createStackNavigator();

export const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: true
    }}>
      {/* <Stack.Screen name="QuizScreen" component={QuizScreen} /> */}
      <Stack.Screen name="ChoosePlanScreen" component={ChoosePlanScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ResumeChoosenPlanScreen" component={ResumeChoosenPlanScreen} options={{headerTransparent: true, headerBackTitle:"", title:""}} />
    </Stack.Navigator>
  );
}
