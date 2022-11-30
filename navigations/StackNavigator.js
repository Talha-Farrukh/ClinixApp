import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import React, { useEffect, useRef, useState } from "react";
import { DrawerLayoutAndroid, TouchableOpacity, View } from "react-native";
import { AppState } from "../context/AppContext";
import LandingScreen from "../screens/authentication/LandingScreen";
import SignInScreen from "../screens/authentication/SignInScreen";
import LoadingScreen from "../screens/shared/LoadingScreen";
import HomeScreen from "../screens/Home/HomeScreen";
import { AppTheme } from "../style/Color";
import { headerStyle } from "../style/Style";
import DrawerComponent from "../components/DrawerComponent";
import UserManagmentScreen from "../screens/admin/UserManagmentScreen";
import AddUsersScreen from "../screens/admin/AddUsersScreen";
import UpdateUserScreen from "../screens/admin/UpdateUserScreen";
import { Statements } from "../constant/constantStatement";
import PatientListScreen from "../screens/Home/Patient/PatientListScreen";
import AddNewPatientScreen from "../screens/Home/Patient/AddNewPatientScreen";
import TopTabNavigator from "./TopTabNavigator";
import AddRxScreen from "../screens/Home/Rx/AddRxScreen";
import TabNavigator from "./TabNavigator";
// import TabNavigator from "./TabNavigator";

const Stack = createStackNavigator();

const authStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="Sign In" component={SignInScreen} />
    </Stack.Navigator>
  );
};

const appStack = () => {
  const Navigation = useNavigation();
  const { user, setUser, setUserDoc, userDoc, drawer } = AppState();
  const [isLoading, setIsLoading] = useState(true);
  // const drawerRef = useRef(null);

  // useEffect(() => {
  //   if (!userDoc) {
  //     setIsLoading(true);
  //   } else if (userDoc) {
  //     setIsLoading(false);
  //   }
  // }, [userDoc]);

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerPosition="right"
      drawerWidth={250}
      renderNavigationView={() => <DrawerComponent />}
    >
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: AppTheme.themeBackground,
          },
          headerTintColor: AppTheme.themeFontColor,
          headerRight: () => {
            return (
              <View>
                <TouchableOpacity
                  onPress={() => drawer.current.openDrawer()}
                  style={{ paddingHorizontal: 20 }}
                >
                  <FontAwesome name="navicon" size={24} color="white" />
                </TouchableOpacity>
              </View>
            );
          },
          // gestureEnabled: true,
          // ...TransitionPresets.SlideFromRightIOS,
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: Statements.ClinixName,
          }}
        />
        <Stack.Screen
          name="UserManagment"
          component={UserManagmentScreen}
          options={{
            headerTitle: "User Managment",
          }}
        />
        <Stack.Screen
          name="AddUsers"
          component={AddUsersScreen}
          options={{
            headerTitle: "Signup",
          }}
        />
        <Stack.Screen
          name="UpdateUser"
          component={UpdateUserScreen}
          options={{
            headerTitle: "Update User",
          }}
        />

        {/* Patient Screens */}
        <Stack.Screen
          name="TopTabNavigator"
          component={TopTabNavigator}
          options={{
            headerTitle: "Reception",
          }}
        />
        <Stack.Screen
          name="AddPatient"
          component={AddNewPatientScreen}
          options={{
            headerTitle: "Add Patient",
          }}
        />
        <Stack.Screen
          name="AddRx"
          component={AddRxScreen}
          options={{
            headerTitle: "Rx",
          }}
        />
        <Stack.Screen
          name="DoctorRx"
          component={TabNavigator}
          options={{
            headerTitle: "Rx",
          }}
        />
      </Stack.Navigator>
    </DrawerLayoutAndroid>
  );
};

const LoadingStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Loading" component={LoadingScreen} />
    </Stack.Navigator>
  );
};

const StackNavigator = () => {
  const { user, isLoading } = AppState();

  return isLoading ? LoadingStack() : user ? appStack() : authStack();
};

export default StackNavigator;
