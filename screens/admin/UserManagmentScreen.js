import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Card, Paragraph, Title } from "react-native-paper";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../api/firebase";
import { AppTheme } from "../../style/Color";
import { btn } from "../../style/Style";
import { useNavigation } from "@react-navigation/native";

const UserManagmentScreen = () => {
  const Navigation = useNavigation();
  const [allUsers, setAllUsers] = useState();

  useEffect(() => {
    const collectionRef = collection(db, "Users");
    const q = query(collectionRef, orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setAllUsers(
        querySnapshot.docs.map((doc) => ({
          email: doc.data().email,
          password: doc.data().password,
          userName: doc.data().userName,
          firstName: doc.data().firstName,
          lastName: doc.data().lastName,
          isActive: doc.data().isActive,
          role: doc.data().role,
          phone: doc.data().phone,
          createdAt: doc.data().createdAt,
          createdBy: doc.data().createdBy,
        }))
      );
    });
    console.log(allUsers);
  }, []);

  const handleDelete = (id) => {
    const docRef = doc(db, "Users", id);

    Alert.alert("Confirm", `You want to delete : ${id}?`, [
      {
        text: "No",
      },
      {
        text: "Yes",
        onPress: () => {
          deleteDoc(docRef);
        },
      },
    ]);
  };

  return (
    <ScrollView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 10,
        }}
      >
        <Text style={{ fontSize: 20 }}>All Users</Text>
        <TouchableOpacity
          style={{
            backgroundColor: AppTheme.themeBackground,
            borderRadius: 10,
            paddingHorizontal: 15,
          }}
          onPress={() => Navigation.navigate("AddUsers")}
        >
          <Text
            style={{
              fontFamily: "MonMedium",
              fontSize: 14,
              marginVertical: 10,
              color: AppTheme.themeFontColor,
            }}
          >
            Add User
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        {allUsers ? (
          allUsers.map((user) => (
            <View
              style={{
                margin: 5,
                // borderWidth: 3,
                // borderColor: AppTheme.themeBackground,
                borderRadius: 10,
              }}
              key={user.email}
            >
              <Card
                style={{
                  backgroundColor: "#e6e6ec",
                }}
              >
                <Card.Content>
                  <Title
                    style={{
                      fontFamily: "MonMedium",
                    }}
                  >
                    Name : {user.userName}
                  </Title>
                  <Title
                    style={{
                      fontFamily: "MonMedium",
                    }}
                  >
                    Email : {user.email}
                  </Title>
                </Card.Content>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                  }}
                >
                  <Card.Actions>
                    <Button
                      color="red"
                      onPress={() => handleDelete(user.email)}
                    >
                      Delete
                    </Button>
                    <Button
                      color="blue"
                      onPress={() =>
                        Navigation.navigate("UpdateUser", {
                          user: user,
                        })
                      }
                    >
                      Edit
                    </Button>
                  </Card.Actions>
                </View>
              </Card>
            </View>
          ))
        ) : (
          <View>
            <ActivityIndicator size="large" color={AppTheme.themeBackground} />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default UserManagmentScreen;

const styles = StyleSheet.create({});
