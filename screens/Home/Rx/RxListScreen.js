import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { TextInput } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";
import { AppTheme } from "../../../style/Color";
import PatientListComponent from "../../../components/PatientListComponent";
import { useNavigation } from "@react-navigation/native";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../../api/firebase";
import RxListComponent from "../../../components/RxListComponent";

const RxListScreen = () => {
  const Navigation = useNavigation();
  const [allRx, setAllRx] = useState();
  const [search, setSearch] = useState("");

  //Search Logic
  const handleSearch = () => {
    return allRx.filter(
      (item) =>
        item.phone.includes(search) ||
        item.name.toLowerCase().includes(search.toLowerCase())
    );
  };

  //Database logic
  useEffect(() => {
    const collectionRef = collection(db, "Rx");
    const q = query(collectionRef, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setAllRx(
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
          status: doc.data().status,
        }))
      );
    });
  }, []);

  return (
    <View
      style={{
        padding: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            //   textAlign: "center",
            fontFamily: "MonBold",
            fontSize: 18,
            marginVertical: 10,
          }}
        >
          Rx List
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: AppTheme.themeBackground,
            borderRadius: 10,
            paddingHorizontal: 15,
          }}
          onPress={() =>
            Navigation.navigate("AddRx", {
              u_name: "",
              u_phone: "",
              u_address: "",
            })
          }
        >
          <Text
            style={{
              fontFamily: "MonMedium",
              fontSize: 14,
              marginVertical: 10,
              color: AppTheme.themeFontColor,
            }}
          >
            Add Rx
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput
        mode="outlined"
        label="Search"
        right={
          <TextInput.Icon
            name={() => (
              <Icon
                name={"search"}
                size={20}
                color={AppTheme.themeBackground}
              />
            )}
          />
        }
        style={{ marginVertical: 5 }}
        activeOutlineColor={AppTheme.themeBackground}
        value={search}
        onChangeText={(text) => setSearch(text)}
      />
      <ScrollView
        style={{
          height: 480,
        }}
      >
        {allRx ? (
          <View>
            {handleSearch().length > 0 ? (
              handleSearch().map((item, index) => (
                <RxListComponent
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
                  status={item.status}
                  latest={false}
                />
              ))
            ) : (
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "MonBold",
                  fontSize: 18,
                  marginVertical: 20,
                  color: AppTheme.themeDarkFontColor,
                  marginVertical: "60%",
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
              marginVertical: "60%",
            }}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default RxListScreen;

const styles = StyleSheet.create({});
