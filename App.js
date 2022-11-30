import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import { DrawerLayoutAndroid, LogBox, StyleSheet } from "react-native";
import "react-native-gesture-handler";
import { ToastProvider } from "react-native-toast-notifications";
import DrawerComponent from "./components/DrawerComponent";
import { AppProvider, AppState } from "./context/AppContext";
import StackNavigator from "./navigations/StackNavigator";
LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();

export default function App() {
  const [loaded] = useFonts({
    MonLight: require("./assets/fonts/Montserrat-Light.ttf"),
    MonRegular: require("./assets/fonts/Montserrat-Regular.ttf"),
    MonMedium: require("./assets/fonts/Montserrat-Medium.ttf"),
    MonBold: require("./assets/fonts/Montserrat-Bold.ttf"),
  });
  if (!loaded) {
    return null;
  }

  return (
    <AppProvider>
      <ToastProvider style={{ marginBottom: 45 }}>
        <NavigationContainer>
          <StackNavigator />
          <ExpoStatusBar style="light" />
        </NavigationContainer>
      </ToastProvider>
      <StatusBar style="light" />
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
