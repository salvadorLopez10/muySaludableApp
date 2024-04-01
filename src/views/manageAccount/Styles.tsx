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
    padding: 5,
    //width: "100%",
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
  }
});

export default ManageAccountStyles;
