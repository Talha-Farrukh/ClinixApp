import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { btn, btnText, center, row } from "../style/Style";
import { AppTheme } from "../style/Color";
import { AppState } from "../context/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

const DrawerComponent = () => {
  // const drawerRef = useRef(null);
  const { userDoc, setUser, setUserDoc, drawer } = AppState();
  const Navigation = useNavigation();
  console.log(userDoc);

  const logout = () => {
    Alert.alert("Confirm", "You want to Logout?", [
      {
        text: "No",
      },
      {
        text: "Yes",
        onPress: () => {
          AsyncStorage.removeItem("user")
            .then(() => setUser(null))
            .then(() => setUserDoc(null))
            .catch((e) => console.log(e));
        },
      },
    ]);
  };

  return (
    <View style={{ backgroundColor: AppTheme.themeBackground, flex: 1 }}>
      <SafeAreaView>
        {userDoc ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
              paddingHorizontal: 15,
              paddingVertical: 10,
            }}
          >
            <FontAwesome
              name="user-circle"
              size={70}
              color={AppTheme.themeFontColor}
            />
            <View
              style={{
                alignItems: "flex-start",
                justifyContent: "center",
                paddingLeft: 8,
              }}
            >
              <Text style={{ fontSize: 15, color: AppTheme.themeFontColor }}>
                {userDoc.userName}
              </Text>
              <Text style={{ fontSize: 15, color: AppTheme.themeFontColor }}>
                {userDoc.email}
              </Text>
            </View>
          </View>
        ) : (
          <View style={{ justifyContent: "center" }}>
            <ActivityIndicator size="large" color={AppTheme.themeFontColor} />
          </View>
        )}
        <View
          style={{
            paddingHorizontal: 25,
            paddingVertical: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              paddingVertical: 10,
              width: "100%",
              alignItems: "center",
              borderTopWidth: 1,
              // borderBottomWidth: 1,
              borderColor: AppTheme.themeFontColor,
            }}
            onPress={() => {
              Navigation.navigate("UpdateUser", { user: userDoc });
              drawer.current.closeDrawer();
            }}
          >
            <Text
              style={{
                fontSize: 15,
                padding: 10,
                color: AppTheme.themeFontColor,
              }}
            >
              Edit Profile
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Navigation.navigate("UserManagment");
              drawer.current.closeDrawer();
            }}
            style={{
              paddingVertical: 10,
              width: "100%",
              alignItems: "center",
              borderTopWidth: 1,
              // borderBottomWidth: 1,
              borderColor: AppTheme.themeFontColor,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                padding: 10,
                color: AppTheme.themeFontColor,
              }}
            >
              User Managment
            </Text>
          </TouchableOpacity>
          <View
            style={[
              btn,
              {
                padding: 10,
                marginTop: 20,
                backgroundColor: AppTheme.themeFontColor,
              },
            ]}
          >
            <TouchableOpacity onPress={() => logout()}>
              <Text
                style={[
                  btnText,
                  { fontSize: 15, color: AppTheme.themeBackground },
                ]}
              >
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* <StatusBar style="dark" /> */}
      </SafeAreaView>
    </View>
  );
};

export default DrawerComponent;

const styles = StyleSheet.create({});
