import { StyleSheet } from "react-native";

const WorkoutStyles = StyleSheet.create({
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
  subtitleText: {
    marginTop: "5%",
    fontFamily: "Gotham-Ultra",
  },
  image: {
    width: 300,
    height: 300,
  },
  textRutinas: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Gotham-Ultra",
  },
});

export default WorkoutStyles;
