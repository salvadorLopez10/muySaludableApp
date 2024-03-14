import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";
import useViewModel from "./ViewModel";
import { View } from "react-native";

const MainMenuScreen = () => {

  const [activeCircle, setActiveCircle] = useState("null");

  const {handleLogout} =useViewModel();

  const handleCirclePress = (circleText:string) => {
    setActiveCircle(circleText);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.generalInfoTitleText}>VIGENTE HASTA</Text>
        <Text style={styles.generalInfoSubtitleText}>20 DE FEBRERO 2024</Text>
      </View>

      <View style={styles.exportSection}>
        <View style={styles.buttonExportContainer}>
          <TouchableOpacity
            style={styles.exportButton}
            onPress={handleLogout}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              EXPORTAR PLAN COMO PDF
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.daysSection}>
            <TouchableOpacity onPress={() => handleCirclePress("Desayuno")}>
              <View style={styles.circle}>
                <Text style={styles.circleText}>Desayuno</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleCirclePress("Colación 1")}>
              <View style={styles.circle}>
                <Text style={styles.circleText}>Colación 1</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleCirclePress("Comida")}>
              <View style={styles.circle}>
                <Text style={styles.circleText}>Comida</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleCirclePress("Colación 2")}>
              <View style={styles.circle}>
                <Text style={styles.circleText}>Colación 2</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleCirclePress("Cena")}>
              <View style={styles.circle}>
                <Text style={styles.circleText}>Cena</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={styles.infoContainer}>
          {activeCircle && (
            <>
              <Text style={styles.infoText}>{activeCircle}:</Text>
              <Text style={styles.infoText}>Opción 1</Text>
              <Text style={styles.infoText}>Opción 2</Text>
              <Text style={styles.infoText}>Opción 3</Text>
              <Text style={styles.infoText}>Opción 4</Text>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    backgroundColor: "white",
  },
  titleContainer: {
    width: "100%",
    alignItems: "center",
  },
  generalInfoTitleText: {
    fontSize: 20,
    color: "#326807",
    fontWeight: "bold",
    marginVertical: 5,
  },
  generalInfoSubtitleText: {
    fontSize: 16,
    color: "#326807",
    fontWeight: "bold",
  },
  exportSection: {
    width: "100%",
    alignItems: "center",
  },
  buttonExportContainer: {
    width: "80%",
    alignItems: "center",
    marginTop: 15,
  },
  exportButton: {
    padding: 10,
    width: "100%",
    backgroundColor: "rgba(250, 160, 41,0.8)",
    alignItems: "center",
    //marginTop: 10,
    borderRadius: 15,
  },
  daysSection: {
    flexDirection: "row",
    //width: "80%",
    top: 10,
    //alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    //marginVertical: 10,
  },
  circle: {
    width: 80,
    height: 80,
    margin: 30,
    borderRadius: 35,
    backgroundColor: "#fcfdbd",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5, // Esta propiedad agrega sombra en Android
  },
  circleText: {
    color: "#55851f",
    textAlign: "center",
    fontWeight: "bold",
  },
  infoContainer: {
    padding: 20,
    width: "80%",
    backgroundColor: "#fcfdbd",
    borderWidth: 1,
    borderColor: "#55851F",
    marginTop: 20,
  },
  infoText: {
    fontSize: 18,
    color:"#326807",
    fontWeight: "bold",
    marginVertical:10
  },
});
export default MainMenuScreen;
