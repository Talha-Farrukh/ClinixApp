import { View, Text } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PatientListScreen from "../screens/Home/Patient/PatientListScreen";
import RxListScreen from "../screens/Home/Rx/RxListScreen";
import { AppTheme } from "../style/Color";
import { useNavigation } from "@react-navigation/native";

export default function TopTabNavigator() {
  const Tab = createMaterialTopTabNavigator();
  const Navigation = useNavigation();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: AppTheme.themeBackground,
        },
        tabBarLabelStyle: {
          color: AppTheme.themeLightFontColor,
        },
        tabBarIndicatorStyle: {
          backgroundColor: AppTheme.themeLightFontColor,
        },
      }}
    >
      <Tab.Group>
        <Tab.Screen
          name="PatientList"
          component={PatientListScreen}
          options={{
            title: "Patients",
          }}
        />
        <Tab.Screen
          name="RxList"
          component={RxListScreen}
          options={{ title: "Rx" }}
        />
      </Tab.Group>
    </Tab.Navigator>
  );
}
