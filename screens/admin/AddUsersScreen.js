import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-paper";
import SelectDropdown from "react-native-select-dropdown";
import { useToast } from "react-native-toast-notifications";
import { db } from "../../api/firebase";
import { AppState } from "../../context/AppContext";
import { AppTheme } from "../../style/Color";

const AddUsersScreen = () => {
  const { userDoc } = AppState();
  const toast = useToast();
  const Navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phone, setPhone] = useState();
  const [role, setRole] = useState();
  const [status, setStatus] = useState();

  const roles = [
    "SuperAdmin",
    "Doctor",
    "Resepionist",
    "Accountant",
    "MedicalStaff",
  ];
  const rolesId = ["1", "2", "3", "4", "5"];

  // **************** Database logic ****************
  const handleSubmit = () => {
    // const collectionRef = collection(db, "Users");
    const docRef = doc(db, "Users", email);
    const data = {
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      email: email.replace(/\s+/g, ""),
      password: password,
      phone: phone,
      role: {
        roleId: rolesId[roles.indexOf(role)],
        role: role,
      },
      isActive: status === "Active" ? true : false,
      createdAt: new Date(),
      createdBy: {
        userName: userDoc.userName,
        email: userDoc.email,
      },
    };

    setLoading(true);
    getDoc(docRef).then((doc) => {
      if (doc.exists()) {
        toast.show("User already exists", {
          type: "warning",
          placement: "bottom",
          duration: 3000,
          offset: 30,
          animationType: "slide-in",
        });
        setLoading(false);
      } else {
        setDoc(docRef, data)
          .then(() => {
            toast.show("User added successfully", {
              type: "success",
              placement: "bottom",
              duration: 3000,
              offset: 30,
              animationType: "slide-in",
            });
            Navigation.goBack();
          })
          .catch((error) => {
            toast.show(error.message, {
              type: "error",
              placement: "bottom",
              duration: 3000,
              offset: 30,
              animationType: "slide-in",
            });
            setLoading(false);
          });
      }
    });
    // addDoc(collectionRef, data)
    //   .then(
    //     toast.show("User added successfully", {
    //       type: "success",
    //       placement: "bottom",
    //       duration: 3000,
    //       offset: 30,
    //       animationType: "slide-in",
    //     })
    //   )
    //   .catch((error) => {
    //     toast.show(error.message, {
    //       type: "error",
    //       placement: "bottom",
    //       duration: 3000,
    //       offset: 30,
    //       animationType: "slide-in",
    //     });
    //   });
  };

  return (
    <ScrollView>
      <View style={{ padding: 10 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginTop: 5,
          }}
        >
          User Details
        </Text>
        <KeyboardAvoidingView>
          <TextInput
            label="First Name"
            mode="outlined"
            style={{ marginVertical: 5 }}
            activeOutlineColor={AppTheme.themeBackground}
            value={firstName}
            onChangeText={(v) => setFirstName(v)}
          />
          <TextInput
            label="Last Name"
            mode="outlined"
            style={{ marginVertical: 5 }}
            activeOutlineColor={AppTheme.themeBackground}
            value={lastName}
            onChangeText={(v) => setLastName(v)}
          />
          <TextInput
            label="User Name"
            mode="outlined"
            style={{ marginVertical: 5 }}
            activeOutlineColor={AppTheme.themeBackground}
            value={userName}
            onChangeText={(v) => setUserName(v)}
          />
          <TextInput
            label="Email"
            mode="outlined"
            style={{ marginVertical: 5 }}
            activeOutlineColor={AppTheme.themeBackground}
            value={email}
            onChangeText={(v) => setEmail(v)}
          />
          <TextInput
            label="Password"
            secureTextEntry={true}
            mode="outlined"
            style={{ marginVertical: 5 }}
            activeOutlineColor={AppTheme.themeBackground}
            value={password}
            onChangeText={(v) => setPassword(v)}
          />
          <TextInput
            label="Phone"
            mode="outlined"
            style={{ marginVertical: 5 }}
            activeOutlineColor={AppTheme.themeBackground}
            value={phone}
            onChangeText={(v) => setPhone(v)}
            keyboardType="phone-pad"
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginTop: 5,
            }}
          >
            Roles
          </Text>
          <SelectDropdown
            data={roles}
            buttonStyle={{
              width: "100%",
              marginVertical: 5,
              borderColor: "black",
              borderWidth: 0.5,
              borderRadius: 5,
            }}
            buttonTextStyle={{ fontSize: 15 }}
            // dropdownStyle={{ height: "70%" }}
            dropdownIconPosition="right"
            // defaultValue={pickUp}
            renderDropdownIcon={() => (
              <AntDesign
                name="downcircleo"
                size={20}
                color={AppTheme.themeBackground}
              />
            )}
            onSelect={(text) => setRole(text)}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginTop: 5,
            }}
          >
            Status
          </Text>
          <SelectDropdown
            data={["Active", "Inactive"]}
            buttonStyle={{
              width: "100%",
              marginVertical: 5,
              borderColor: "black",
              borderWidth: 0.5,
              borderRadius: 5,
            }}
            buttonTextStyle={{ fontSize: 15 }}
            // dropdownStyle={{ height: "70%" }}
            dropdownIconPosition="right"
            // defaultValue={pickUp}
            renderDropdownIcon={() => (
              <AntDesign
                name="downcircleo"
                size={20}
                color={AppTheme.themeBackground}
              />
            )}
            onSelect={(text) => setStatus(text)}
          />
          <TouchableOpacity
            style={{
              backgroundColor: AppTheme.themeBackground,
              width: "100%",
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
              marginVertical: 10,
              opacity: !(
                firstName &&
                lastName &&
                userName &&
                email &&
                password &&
                phone &&
                role &&
                status
              )
                ? 0.5
                : 1,
            }}
            disabled={
              !(
                firstName &&
                lastName &&
                userName &&
                email &&
                password &&
                phone &&
                role &&
                status
              )
            }
            onPress={handleSubmit}
          >
            {!loading ? (
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Signup
              </Text>
            ) : (
              <View>
                <ActivityIndicator size="large" color="white" />
              </View>
            )}
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
};

export default AddUsersScreen;

const styles = StyleSheet.create({});
