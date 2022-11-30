import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { btn, btnText, center } from "../../style/Style";
import { useNavigation } from "@react-navigation/native";
import { AppTheme } from "../../style/Color";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Statements } from "../../constant/constantStatement";
const LandingScreen = () => {
  const Navigation = useNavigation();

  return (
    <SafeAreaView style={{ backgroundColor: AppTheme.themeBackground }}>
      <View
        style={[
          center,
          {
            height: "50%",
          },
        ]}
      >
        <Image
          source={require("../../assets/Images/landing.png")}
          style={{ height: 350, width: 350 }}
        />
      </View>
      <View
        style={{
          height: "50%",
          marginHorizontal: "10%",
          justifyContent: "space-evenly",
        }}
      >
        <Text
          style={{
            color: AppTheme.themeLightFontColor,
            textAlign: "left",
            fontSize: 34,
            fontWeight: "bold",
            fontFamily: "MonBold",
          }}
        >
          Welcome
        </Text>
        <Text
          style={{
            color: AppTheme.themeLightFontColor,
            fontSize: 24,
            fontFamily: "MonRegular",
            lineHeight: 35,
          }}
        >
          {Statements.LandingScreenStatement}
        </Text>
        <TouchableOpacity
          style={[btn, { backgroundColor: "white", alignSelf: "center" }]}
          onPress={() => Navigation.navigate("Sign In")}
        >
          <Text
            style={[
              btnText,
              {
                color: AppTheme.themeBackground,
                fontWeight: "bold",
                fontFamily: "MonBold",
              },
            ]}
          >
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
      <StatusBar
        style="light"
        backgroundColor={AppTheme.themeBackground}
        animated
      />
    </SafeAreaView>
  );
};

export default LandingScreen;
