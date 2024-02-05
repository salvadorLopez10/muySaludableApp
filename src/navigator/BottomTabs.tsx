import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { WorkoutPlanScreen } from '../views/workoutPlan/WorkoutPlanScreen';
import { MentalHealthScreen } from '../views/mentalHealth/MentalHealthScreen';
import { MealPlanScreen } from '../views/mealPlan/MealPlanScreen';
import { FinancialHealthScreen } from '../views/financialHealth/FinancialHealthScreen';
import { LateralMenu } from './LateralMenu';
import { Text,View } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import MainMenuScreen from '../views/mainMenu/MainMenuScreen';

const Tab = createBottomTabNavigator();

export const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#faa029",
        tabBarStyle: {
          borderTopColor: "red",
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarLabelStyle: {
          fontSize: 8,
        },
        tabBarIcon: ({ color, focused, size }) => {
          let iconName: string = "";

          switch (route.name) {
            case "LateralMenu":
              iconName = "person";
              break;
            case "MealPlanScreen":
              iconName = "logo-apple";
              break;
            case "WorkoutPlanScreen":
              iconName = "fitness";
              break;
            case "MentalHealthScreen":
              iconName = "heart";
              break;
            case "FinancialHealthScreen":
              iconName = "cash";
              break;
          }

          //return <Text style={{color:color}} >{iconName}</Text>
          return <Icon name={iconName} size={25} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="LateralMenu"
        component={LateralMenu}
        options={{ headerShown: false, title: "Perfil" }}
      />
      <Tab.Screen
        name="MealPlanScreen"
        component={MainMenuScreen}
        options={{ headerShown: true, title: "Plan Alimenticio" }}
      />
      <Tab.Screen
        name="WorkoutPlanScreen"
        component={WorkoutPlanScreen}
        options={{ headerShown: false, title: "Rutinas" }}
      />
      <Tab.Screen
        name="MentalHealthScreen"
        component={MentalHealthScreen}
        options={{ headerShown: false, title: "Salud Mental" }}
      />
      <Tab.Screen
        name="FinancialHealthScreen"
        component={FinancialHealthScreen}
        options={{ headerShown: false, title: "Salud Financiera" }}
      />
    </Tab.Navigator>
  );
}
