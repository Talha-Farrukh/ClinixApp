import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { AppTheme } from "../style/Color";
import PendingRxScreen from "../screens/Doctor/PendingRxScreen";
import CheckedRxScreen from "../screens/Doctor/CheckedRxScreen";
import PaidRxScreen from "../screens/Doctor/PaidRxScreen";

const DoctorRxTopTapNavigator = () => {
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
          name="PendingRxList"
          component={PendingRxScreen}
          options={{
            title: "Pending Rx",
          }}
        />
        <Tab.Screen
          name="CheckedRxList"
          component={CheckedRxScreen}
          options={{ title: "Checked Rx" }}
        />
        <Tab.Screen
          name="PaidRxList"
          component={PaidRxScreen}
          options={{ title: "Paid Rx" }}
        />
      </Tab.Group>
    </Tab.Navigator>
  );
};

export default DoctorRxTopTapNavigator;
