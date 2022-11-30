import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { AppTheme } from "../style/Color";

const PatientListComponent = (props) => {
  const Navigation = useNavigation();
  return (
    <View
      style={{
        marginVertical: 10,
      }}
    >
      <View
        style={{
          paddingHorizontal: 15,
          paddingVertical: 15,
          backgroundColor: "#e6e6ec",
          borderRadius: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            // marginLeft : 15
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "#ddf7f6",
                width: 50,
                height: 50,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 100,
              }}
            >
              <FontAwesome
                name="user"
                size={35}
                color={AppTheme.themeBackground}
              />
            </View>
            <View
              style={{
                marginLeft: 10,
              }}
            >
              <Text
                style={{
                  color: AppTheme.themeBackground,
                  fontFamily: "MonBold",
                }}
              >
                {props.name}
              </Text>
              <Text
                style={{
                  fontFamily: "MonMedium",
                }}
              >
                {props.phone}
              </Text>
            </View>
          </View>
          {!props.latest && (
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: AppTheme.themeBackground,
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                  borderRadius: 50,
                  alignItems: "center",
                  marginRight: 2,
                }}
                onPress={() =>
                  Navigation.navigate("AddRx", {
                    u_name: props.name,
                    u_phone: props.phone,
                    u_address: props.address ? props.address : "",
                  })
                }
              >
                <Text
                  style={{
                    color: AppTheme.themeFontColor,
                    fontFamily: "MonBold",
                  }}
                >
                  Rx
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        {props.address ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 5,
            }}
          >
            <Text
              style={{
                color: AppTheme.themeDarkFontColor,
                marginTop: 10,
                fontFamily: "MonBold",
              }}
            >
              <Ionicons
                name="location"
                size={18}
                color={AppTheme.themeBackground}
              />{" "}
            </Text>
            <Text
              style={{
                color: AppTheme.themeDarkFontColor,
                fontFamily: "MonRegular",
                marginTop: 10,
                // paddingHorizontal: 15,
              }}
            >
              {props.address.length > 35
                ? props.address.substring(0, 35) + "..."
                : props.address}
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default PatientListComponent;
