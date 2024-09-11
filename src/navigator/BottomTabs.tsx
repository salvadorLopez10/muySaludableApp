import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { WorkoutPlanScreen } from '../views/workoutPlan/WorkoutPlanScreen';
import { MentalHealthScreen } from '../views/mentalHealth/MentalHealthScreen';
import { MealPlanScreen } from '../views/mealPlan/MealPlanScreen';
import { FinancialHealthScreen } from '../views/financialHealth/FinancialHealthScreen';
import { LateralMenu } from './LateralMenu';
import { Image, Text,View } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import MainMenuScreen from '../views/mainMenu/MainMenuScreen';

const Tab = createBottomTabNavigator();

export const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#faa029",
        tabBarStyle: {
          borderTopColor: "#faa029",
          borderTopWidth: 1,
          elevation: 0,
        },
        tabBarLabelStyle: {
          fontSize: 8,
        },
        tabBarIcon: ({ color, focused, size }) => {
          let iconName: any = "";

          switch (route.name) {
            case "LateralMenu":
              iconName = focused ? require("../../assets/Plan_Tab_Active.png") : require("../../assets/Plan_Tab.png");
              break;
            case "MealPlanScreen":
              iconName = focused ? require("../../assets/Plan_Tab_Active.png") : require("../../assets/Plan_Tab.png");
              break;
            case "WorkoutPlanScreen":
              iconName = focused ? require("../../assets/Salud_Fisica_Active.jpg") : require("../../assets/Salud_Fisica_Tab.png");
              break;
            case "MentalHealthScreen":

              iconName = focused ? require("../../assets/Salud_Mental_Active.jpg") : require("../../assets/Salud_Mental_Tab.png");
              break;
            case "FinancialHealthScreen":
              iconName = focused ? require("../../assets/Salud_Financiera_Active.jpg") : require("../../assets/Salud_Financiera_Tab.png");
              break;
          }

          return <Image style={{ width: 25, height: 25 }} source={iconName} />;
          //return <Icon name={iconName} size={25} color={color} />;

        },
      })}
    >
      {/* <Tab.Screen
        name="LateralMenu"
        component={LateralMenu}
        options={{ headerShown: false, title: "Perfil" }}
      /> */}
      <Tab.Screen
        name="MealPlanScreen"
        component={MainMenuScreen}
        options={{ headerShown: false, title: "Plan Alimenticio" }}
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
