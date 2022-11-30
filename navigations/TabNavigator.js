import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import DoctorRxTopTapNavigator from "./DoctorRxTopTapNavigator";

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  const Navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={{
        //   headerRight: () => {
        //     return (
        //       <View>
        //         <TouchableOpacity
        //           onPress={() => Navigation.navigate("ChatCat")}
        //           style={{ paddingHorizontal: 20 }}
        //         >
        //           <Ionicons name="chatbubbles-outline" size={24} color="white" />
        //         </TouchableOpacity>
        //       </View>
        //     );
        //   },
        //   tabBarActiveTintColor: lightModColor.themeBackground,
        //   headerStyle: headerStyle,
        //   headerTintColor: lightModColor.headerFontColor,
        //   headerTitleAlign: "center",
        //   // headerTitle: "Share Ride",
        //   headerShadowVisible: true,
        //   tabBarHideOnKeyboard: true,
        //   // tabBarAllowFontScaling: true,
        //   tabBarVisibilityAnimationConfig: {
        //     hide: {
        //       config: {
        //         duration: 0,
        //       },
        //     },
        //     show: {
        //       config: {
        //         duration: 0,
        //       },
        //     },
        //   },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="DoctorRx"
        component={DoctorRxTopTapNavigator}
        options={{
          // tabBarIcon: (tabInfo) => {
          //   return (
          //     <FontAwesome
          //       name="home"
          //       size={24}
          //       color={
          //         tabInfo.focused ? lightModColor.themeBackground : "#4444"
          //       }
          //     />
          //   );
          // },
          headerTitle: "Rx",
          title: "Rx",
        }}
      />
      {/* <Tab.Screen
      name="Profile"
      component={Profile}
      options={{
        headerStyle: [headerStyle, { elevation: 0, shadowOpacity: 0 }],
        tabBarIcon: (tabInfo) => {
          return (
            <MaterialCommunityIcons
              name="account"
              size={24}
              color={
                tabInfo.focused ? lightModColor.themeBackground : "#4444"
              }
            />
          );
        },
      }}
    />
    <Tab.Screen
      name="My Trips"
      component={TopTabNavigator}
      options={{
        tabBarIcon: (tabInfo) => {
          return (
            <FontAwesome5
              name="car"
              size={24}
              color={
                tabInfo.focused ? lightModColor.themeBackground : "#4444"
              }
            />
          );
        },
        headerStyle: {
          backgroundColor: lightModColor.themeBackground,
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
    /> */}
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({});
