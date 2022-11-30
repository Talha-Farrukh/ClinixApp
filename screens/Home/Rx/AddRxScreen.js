import { useNavigation, useRoute } from "@react-navigation/native";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
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
import { MaskedTextInput } from "react-native-mask-text";
import { RadioButton, TextInput } from "react-native-paper";
import { useToast } from "react-native-toast-notifications";
import { db } from "../../../api/firebase";
import { AppState } from "../../../context/AppContext";
import { AppTheme } from "../../../style/Color";
import uuid from "react-native-uuid";

const AddRxScreen = () => {
  const route = useRoute();
  const { u_name, u_phone, u_address } = route.params;

  const { userDoc } = AppState();
  const toast = useToast();
  const Navigation = useNavigation();
  const [checked, setChecked] = useState(true);
  var today = new Date();
  today =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(u_name);
  const [address, setAdress] = useState(u_address);
  const [phone, setPhone] = useState(u_phone);
  const [age, setAge] = useState("");
  const [temperature, setTemperature] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [height, setHeight] = useState("");
  const [suger, setSuger] = useState("");
  const [weight, setWeight] = useState("");
  const [status, setStatus] = useState();

  //Validation
  const handleSubmit = () => {
    setLoading(true);
    addPatient();
  };

  // DataBase Logic
  const addPatient = () => {
    const collref = collection(db, "Rx");
    const rxData = {
      rxID: "Rx-" + uuid.v4().toString(),
      name: name,
      phone: phone,
      age: age,
      temperature: temperature,
      address: address,
      weight: weight,
      height: height,
      bloodPressure: bloodPressure,
      bloodGroup: bloodGroup,
      suger: suger,
      createdAt: new Date(),
      createdFormatDate: today,
      createdBy: {
        name: userDoc.userName,
        email: userDoc.email,
        role: userDoc.role.role,
      },
      status: {
        statusId: 0,
        statusName: "Pending",
      },
    };
    addDoc(collref, rxData)
      .then(() => {
        toast.show("Rx added successfully", {
          type: "success",
          placement: "bottom",
          duration: 3000,
          offset: 30,
          animationType: "slide-in",
        });
        setLoading(false);
        Navigation.goBack();
      })
      .catch((error) => {
        toast.show(error.message, {
          type: "danger",
          placement: "bottom",
          duration: 3000,
          offset: 30,
          animationType: "slide-in",
        });
        setLoading(false);
      });
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
          Patient Information
        </Text>
        <KeyboardAvoidingView>
          <TextInput
            label="Name"
            mode="outlined"
            style={{ marginVertical: 5 }}
            activeOutlineColor={AppTheme.themeBackground}
            value={name}
            onChangeText={(v) => setName(v)}
          />
          <TextInput
            label="Phone"
            mode="outlined"
            style={{ marginVertical: 5 }}
            activeOutlineColor={AppTheme.themeBackground}
            value={phone}
            onChangeText={(v) => setPhone(v)}
            maxLength={11}
            keyboardType="phone-pad"
            // render={(props) => (
            //   <MaskedTextInput
            //     {...props}
            //     type="phone"
            //     mask="03999999999"
            //     style={{
            //       // paddingHorizantal: 10,
            //       marginLeft: 13,
            //       height: 55,
            //       fontSize: 16,
            //     }}
            //     keyboardType="phone-pad"
            //   />
            // )}
          />
          <TextInput
            label="Address"
            mode="outlined"
            style={{ marginVertical: 5 }}
            activeOutlineColor={AppTheme.themeBackground}
            value={address}
            onChangeText={(v) => setAdress(v)}
            multiline={true}
            numberOfLines={5}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 5,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Additional Info
            </Text>
            <RadioButton
              value="second"
              status={checked ? "checked" : "unchecked"}
              onPress={() => setChecked(checked ? false : true)}
            />
          </View>
          {checked && (
            <>
              <TextInput
                label="Age"
                mode="outlined"
                style={{ marginVertical: 5 }}
                activeOutlineColor={AppTheme.themeBackground}
                value={age}
                onChangeText={(v) => setAge(v)}
                keyboardType="phone-pad"
                render={(props) => (
                  <MaskedTextInput
                    {...props}
                    mask="999"
                    style={{
                      // paddingHorizantal: 10,
                      marginLeft: 13,
                      height: 55,
                      fontSize: 16,
                    }}
                  />
                )}
              />
              <TextInput
                label="Temperature"
                mode="outlined"
                style={{ marginVertical: 5 }}
                activeOutlineColor={AppTheme.themeBackground}
                value={temperature}
                onChangeText={(v) => setTemperature(v)}
                keyboardType="number-pad"
              />
              <TextInput
                label="Weight"
                mode="outlined"
                style={{ marginVertical: 5 }}
                activeOutlineColor={AppTheme.themeBackground}
                value={weight}
                onChangeText={(v) => setWeight(v)}
                keyboardType="number-pad"
              />
              <TextInput
                label="Height"
                mode="outlined"
                style={{ marginVertical: 5 }}
                activeOutlineColor={AppTheme.themeBackground}
                value={height}
                onChangeText={(v) => setHeight(v)}
                keyboardType="number-pad"
              />
              <TextInput
                label="Blood Group"
                mode="outlined"
                style={{ marginVertical: 5 }}
                activeOutlineColor={AppTheme.themeBackground}
                value={bloodGroup}
                onChangeText={(v) => setBloodGroup(v)}
              />
              <TextInput
                label="Blood Pressure (120/80)"
                mode="outlined"
                style={{ marginVertical: 5 }}
                activeOutlineColor={AppTheme.themeBackground}
                value={bloodPressure}
                onChangeText={(v) => setBloodPressure(v)}
                render={(props) => (
                  <MaskedTextInput
                    {...props}
                    type="Blood Pressure"
                    mask="999/999"
                    style={{
                      // paddingHorizantal: 10,
                      marginLeft: 13,
                      height: 55,
                      fontSize: 16,
                    }}
                    keyboardType="number-pad"
                  />
                )}
              />
              <TextInput
                label="Suger"
                mode="outlined"
                style={{ marginVertical: 5 }}
                activeOutlineColor={AppTheme.themeBackground}
                value={suger}
                onChangeText={(v) => setSuger(v)}
                keyboardType="numbers-and-punctuation"
              />
            </>
          )}
          {/* <Text
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
        /> */}
          <TouchableOpacity
            style={{
              backgroundColor: AppTheme.themeBackground,
              width: "100%",
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
              marginVertical: 10,
              opacity: !name ? 0.5 : 1,
            }}
            disabled={!name}
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
                Submit
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

export default AddRxScreen;

const styles = StyleSheet.create({});
