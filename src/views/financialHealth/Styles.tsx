import { StyleSheet } from "react-native";

const FinancialHealthStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    //width: "100%"
  },
  containerScroll:{
    //flex: 1,
    marginTop: '6%'
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
  subtitleText: {
    marginTop: "5%",
    fontFamily: "Gotham-Medium",
  },
  titleText: {
    marginTop: "5%",
    fontSize: 24,
    fontFamily: "Gotham-Ultra",
    textAlign: "center",
  },
  image: {
    width: 300,
    height: 300,
  },
  indicatorWrapper: {
    flex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(100, 100, 100, 0.6)",
  },
  indicatorText: {
    fontSize: 18,
    marginTop: 12,
    color: "#ffffff",
    fontFamily: "Gotham-Medium",
  },
});

export default FinancialHealthStyles;
