import { FontAwesome, Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { AppTheme } from "../style/Color";
import { Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const RxListComponent = (props) => {
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
          //   paddingVertical: 15,
          paddingBottom: 15,
          backgroundColor: "#e6e6ec",
          borderRadius: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            // marginBottom: 10,
          }}
        >
          <Text
            style={{
              fontFamily: "MonBold",
              fontSize: 20,
              color: AppTheme.themeBackground,
              padding: 10,
            }}
          >
            Rx
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              // justifyContent: "flex-end",
            }}
          >
            {props.status.statusId == 0 ? (
              <>
                <Octicons name="dot-fill" size={24} color="orange" />
                <Text
                  style={{
                    fontSize: 18,
                    color: "orange",
                    marginLeft: 3,
                    alignSelf: "center",
                  }}
                >
                  Pending
                </Text>
              </>
            ) : props.statusId == 1 ? (
              <>
                <Octicons name="dot-fill" size={24} color="blue" />
                <Text
                  style={{
                    fontSize: 18,
                    color: "blue",
                    marginLeft: 3,
                    alignSelf: "center",
                  }}
                >
                  Checked
                </Text>
              </>
            ) : props.statusId == 2 ? (
              <>
                <Octicons name="dot-fill" size={24} color="green" />
                <Text
                  style={{
                    fontSize: 18,
                    color: "green",
                    marginLeft: 3,
                    alignSelf: "center",
                  }}
                >
                  Paid
                </Text>
              </>
            ) : (
              <>
                <Octicons name="dot-fill" size={24} color="black" />
                <Text
                  style={{
                    fontSize: 18,
                    color: "black",
                    marginLeft: 3,
                    alignSelf: "center",
                  }}
                >
                  No Status
                </Text>
              </>
            )}
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            // justifyContent: "space-between",
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
        </View>
        {props.address ? (
          <View
            style={{
              flexDirection: "row",
              // justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 5,
            }}
          >
            <Text
              style={{
                color: AppTheme.themeDarkFontColor,
                marginTop: 10,
                fontFamily: "MonBold",
                // paddingHorizontal: 15,
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

export default RxListComponent;
