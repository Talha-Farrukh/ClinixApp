import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { doc, getDoc, collection, query } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useToast } from "react-native-toast-notifications";
import { TextInput } from "react-native-paper";
import { db } from "../../api/firebase";
import { Statements } from "../../constant/constantStatement";
import { AppState } from "../../context/AppContext";
import { AppTheme } from "../../style/Color";
import { btn, btnText, heading } from "../../style/Style";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignInScreen = () => {
  const Navigation = useNavigation();
  const { height, width } = Dimensions.get("window");
  const { setUserDoc, setUser } = AppState();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [scureEntery, setScureEntery] = useState(true);

  // const phoneInput = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // useEffect(() => {
  //   setUser(null);
  //   setUserDoc(null);
  // }, []);

  const handleSubmit = () => {
    if (email === "" || password === "") {
      toast.show("Please fill those feilds", {
        type: "warning",
        placement: "bottom",
        duration: 3000,
        offset: 30,
        animationType: "slide-in",
      });
    } else {
      setEmail(email.replace(/\s+/g, ""));
      setIsLoading(true);
      const docRef = doc(db, "Users", email);
      const docSnap = getDoc(docRef).then((doc) => {
        if (doc.exists()) {
          if (
            doc.data().password === password &&
            doc.data().isActive === true
          ) {
            setUserDoc(doc.data());
            setUser(doc.data().email);
            AsyncStorage.setItem("user", JSON.stringify(email));
            // AsyncStorage.setItem("userDoc", JSON.stringify(doc.data()));
            setIsLoading(false);
            Navigation.navigate("Home");
          } else {
            setIsLoading(false);
            setUser(null);
            setUserDoc(null);
            toast.show("Password is incorrect", {
              type: "warning",
              placement: "bottom",
              duration: 3000,
              offset: 30,
              animationType: "slide-in",
            });
          }
        } else {
          setIsLoading(false);
          setUser(null);
          setUserDoc(null);
          toast.show("User not found", {
            type: "warning",
            placement: "bottom",
            duration: 3000,
            offset: 30,
            animationType: "slide-in",
          });
        }
      });
    }
  };

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View
          style={{
            height,
            backgroundColor: AppTheme.themeBackground,
          }}
        >
          <View style={{ height: "25%", marginHorizontal: "10%" }}>
            <TouchableOpacity
              style={{
                position: "absolute",
                top: 60,
                paddingLeft: 5,
                left: -10,
              }}
              onPress={() => Navigation.goBack()}
            >
              <Ionicons
                name="ios-arrow-back-outline"
                size={35}
                color={AppTheme.themeLightFontColor}
              />
            </TouchableOpacity>
            <Text
              style={[
                heading,
                { marginTop: "40%", color: AppTheme.themeFontColor },
              ]}
            >
              Sign in
            </Text>
          </View>
          <View
            style={{
              height: "80%",
              backgroundColor: AppTheme.themeFontColor,
              borderTopRightRadius: 16,
              borderTopLeftRadius: 16,
              paddingHorizontal: "10%",
            }}
          >
            <View style={{ marginVertical: 30 }}>
              <Text
                style={[
                  heading,
                  {
                    color: AppTheme.themeDark,
                    fontSize: 30,
                    marginBottom: 10,
                  },
                ]}
              >
                {Statements.SignInScreenHeaderStatement}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "MonMedium",
                  opacity: 0.5,
                }}
              >
                {Statements.SignInScreenSubHeaderStatement}
              </Text>
            </View>
            <KeyboardAvoidingView>
              <TextInput
                label="Email"
                mode="outlined"
                activeOutlineColor={AppTheme.themeBackground}
                value={email}
                onChangeText={(v) => setEmail(v)}
              />
              <TextInput
                label="Password"
                secureTextEntry={scureEntery}
                mode="outlined"
                style={{ marginVertical: 20 }}
                activeOutlineColor={AppTheme.themeBackground}
                value={password}
                onChangeText={(v) => setPassword(v)}
                right={<TextInput.Icon icon="eye" />}
                onPress={() => setScureEntery(!scureEntery)}
              />
            </KeyboardAvoidingView>

            <View>
              <TouchableOpacity
                disabled={
                  email.length == 0 || password.length == 0 || isLoading
                }
                style={[
                  btn,
                  {
                    opacity:
                      email.length == 0 || password.length == 0 || isLoading
                        ? 0.5
                        : 1,
                    alignSelf: "center",
                    marginVertical: 10,
                  },
                ]}
                onPress={() => {
                  handleSubmit();
                }}
              >
                {isLoading ? (
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ActivityIndicator
                      style={btnText}
                      size={"small"}
                      color="white"
                    />
                  </View>
                ) : (
                  <Text style={[btnText, { fontFamily: "MonBold" }]}>
                    Sign In
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default SignInScreen;
