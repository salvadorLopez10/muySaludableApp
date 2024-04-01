import { StyleSheet } from "react-native";

const PrivacyLegalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    //width: "100%"
  },
  imageBackground: {
    // width: "100%",
    // height: "100%",
    flex: 1,
    //justifyContent: "center",
    alignItems: "center",
  },
  containerText: {
    margin: "10%",
    alignContent: "stretch",
  },
  textContent: {
    fontFamily: "Gotham-Book",
    textAlign: "justify",
  },
  subtitleText:{
    marginTop: "5%",
    fontFamily: "Gotham-Medium"
  }
});

export default PrivacyLegalStyles;
