import { useNavigation } from "@react-navigation/native";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { db } from "../../api/firebase";
import PatientListComponent from "../../components/PatientListComponent";
import { AppTheme } from "../../style/Color";
import { Resbutton } from "../../style/Style";

const HomeScreen = () => {
  const Navigation = useNavigation();
  const [allPatients, setPatients] = useState();
  // var today = new Date();
  // today =
  //   today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  //Database logic
  useEffect(() => {
    var today = new Date();
    today =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

    const collectionRef = collection(db, "Patients");
    const q1 = query(collectionRef, where("createdFormatDate", "==", today));
    // const q2 = query(q1, orderBy("createdAt"));
    const unsubscribe = onSnapshot(q1, (querySnapshot) => {
      setPatients(
        querySnapshot.docs.map((doc) => ({
          name: doc.data().name,
          phone: doc.data().phone,
          age: doc.data().age,
          temperature: doc.data().temperature,
          address: doc.data().address,
          weight: doc.data().weight,
          height: doc.data().height,
          bloodGroup: doc.data().bloodGroup,
          bloodPressure: doc.data().bloodPressure,
          suger: doc.data().suger,
          createdAt: doc.data().createdAt,
          createdBy: doc.data().createdBy,
          createdFormatDate: doc.data().createdFormatDate,
        }))
      );
    });
    console.log(allPatients);
  }, []);
  return (
    <ScrollView
      style={{
        padding: 10,
      }}
    >
      <Text
        style={{
          textAlign: "center",
          fontFamily: "MonBold",
          fontSize: 18,
          marginVertical: 10,
        }}
      >
        Responsibilities
      </Text>
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={Resbutton}
            onPress={() => Navigation.navigate("DoctorRx")}
          >
            <Text
              style={{
                color: AppTheme.themeFontColor,
              }}
            >
              Doctor
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={Resbutton}>
            <Text
              style={{
                color: AppTheme.themeFontColor,
              }}
            >
              Accounts
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Resbutton}
            onPress={() => Navigation.navigate("TopTabNavigator")}
          >
            <Text
              style={{
                color: AppTheme.themeFontColor,
              }}
            >
              Resception
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={Resbutton}>
            <Text
              style={{
                color: AppTheme.themeFontColor,
              }}
            >
              Medicine
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text
        style={{
          textAlign: "center",
          fontFamily: "MonBold",
          fontSize: 18,
          marginVertical: 10,
        }}
      >
        Latest Patients
      </Text>
      {allPatients ? (
        <View>
          {allPatients.length > 0 ? (
            allPatients.map((item, index) => (
              <PatientListComponent
                key={index}
                name={item.name}
                phone={item.phone}
                age={item.age}
                temperature={item.temperature}
                address={item.address}
                weight={item.weight}
                height={item.height}
                bloodGroup={item.bloodGroup}
                bloodPressure={item.bloodPressure}
                suger={item.suger}
                createdAt={item.createdAt}
                createdBy={item.createdBy}
                latest={true}
              />
            ))
          ) : (
            <Text
              style={{
                textAlign: "center",
                fontFamily: "MonRegular",
                fontSize: 18,
                marginVertical: "50%",
                color: AppTheme.themeDarkFontColor,
              }}
            >
              No Patients Found
            </Text>
          )}
        </View>
      ) : (
        <ActivityIndicator
          size="large"
          color={AppTheme.themeBackground}
          style={{
            marginVertical: "50%",
          }}
        />
      )}
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
