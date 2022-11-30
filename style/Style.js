import { AppTheme } from "../style/Color";

export const center = {
  justifyContent: "center",
  alignItems: "center",
};
export const heading = {
  color: AppTheme.headerFontColor,
  textAlign: "left",
  fontSize: 30,
  fontWeight: "bold",
  fontFamily: "MonBold",
};
export const btn = {
  padding: 15,
  width: "60%",
  backgroundColor: AppTheme.themeBackground,
  borderRadius: 40,
};
export const headerStyle = {
  backgroundColor: AppTheme.themeBackground,
};
export const btnText = {
  color: "#ffff",
  textAlign: "center",
  textAlignVertical: "center",
  fontSize: 20,
};

export const itemCenter = {
  justifyContent: "center",
  alignItems: "center",
};

export const row = {
  flexDirection: "row",
  justifyContent: "space-between",
};

export const availableRideLocaBox = {
  justifyContent: "flex-start",
  borderColor: "#4444",
  borderWidth: 0.5,
  padding: 10,
  borderRadius: 5,
  backgroundColor: "#ffff",
};

export const availableRideHeading = {
  textAlign: "center",
  fontWeight: "bold",
  fontSize: 18,
  marginBottom: 10,
  fontStyle: "normal",
};

export const dropDownStyle = {
  width: "100%",
  height: 41,
  borderColor: "#4444",
  borderWidth: 0.5,
  borderRadius: 5,
  backgroundColor: "#ffff",
};

export const Resbutton = {
  backgroundColor: AppTheme.themeBackground,
  height: 75,
  width: 75,
  padding: 5,
  borderRadius: 10,
  justifyContent: "center",
  alignItems: "center",
};

export const Months = [
  { name: "January", short: "Jan" },
  { name: "February", short: "Feb" },
  { name: "March", short: "Mar" },
  { name: "April", short: "Apr" },
  { name: "May", short: "May" },
  { name: "June", short: "Jun" },
  { name: "July", short: "Jul" },
  { name: "August", short: "Aug" },
  { name: "September", short: "Sep" },
  { name: "October", short: "Oct" },
  { name: "November", short: "Nov" },
  { name: "December", short: "Dec" },
];
