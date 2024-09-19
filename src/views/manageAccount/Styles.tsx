import { StyleSheet } from "react-native";

const ManageAccountStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonDeleteContainer: {
    width: "80%",
    alignItems: "center",
    marginBottom: "10%",
  },
  containerRow: {
    padding: 10,
    //width: "100%",
    width: "80%",
    borderWidth: 1,
    borderColor: "rgba(250, 160, 41, 0.8)",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    alignItems: "center",
    //marginTop: 10,
    borderRadius: 15,
    //marginVertical: 10,
    marginBottom: "10%",
  },
  sectionRow: {
    width: "70%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonDelete: {
    padding: 15,
    width: "100%",
    borderWidth: 1,
    borderColor: "rgba(224, 26, 0, 0.8)",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    alignItems: "center",
    //marginTop: 10,
    borderRadius: 15,
    marginVertical: 10,
  },
  buttonSection: {
    padding: 15,
    width: "100%",
    borderWidth: 1,
    borderColor: "rgba(250, 160, 41, 0.8)",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    alignItems: "center",
    //marginTop: 10,
    borderRadius: 15,
    marginVertical: 10,
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

export default ManageAccountStyles;
