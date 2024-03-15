import { StyleSheet } from "react-native";

const MainMenuStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  imageBackground: {
    // width: "100%",
    // height: "100%",
    flex: 1,
    //justifyContent: "center",
    alignItems: "center",
  },
  scroll: {
    flex: 1,
    width: "100%",
  },
  dataUserContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 15,
    //position: "absolute",
  },
  dataTitleContainer: {
    width: "80%",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  datosInfoBox: {
    width: "80%",
    alignItems: "center",
    backgroundColor: "#faa029",
    borderRadius: 10,
    padding: 20,
    top: 5,
    margin: 3,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  datosInfoTitle: {
    width: "80%",
    alignItems: "center",
    backgroundColor: "#faa029",
    //borderRadius: 10,
    padding: 10,
    top: 5,
    margin: 3,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  datosTitleText: {
    fontSize: 16,
    fontFamily: "Gotham-Ultra",
    marginVertical: 5,
    color: "#ffffff",
  },
  datosInfoText: {
    fontSize: 16,
    fontFamily: "Gotham-Ultra",
    marginVertical: 5,
    color: "#2E2A21",
  },
});

export default MainMenuStyles;
