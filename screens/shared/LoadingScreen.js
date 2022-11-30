import { StatusBar } from "expo-status-bar";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import { AppTheme } from "../../style/Color";

const LoadingScreen = () => {
  return (
    <View
      style={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" color={AppTheme.themeBackground} />
      <StatusBar style="auto" />
    </View>
  );
};

export default LoadingScreen;
