import React from 'react'
import { StyleSheet } from 'react-native';
import { Text, View, ScrollView,Image, TouchableOpacity } from "react-native";

export const UserProfileScreen = () => {

    const handleDeleteAccount = () => {
      console.log("SEGURO QUE DESEAS BORRAR TU CUENTA?");
    };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../../assets/logoMuySaludable.png")}
          style={styles.logoImage}
        />
      </View>

       <ScrollView>
            <View style={styles.generalInfoContainer}>
                <Text style={styles.generalInfoTitleText}>SALVADOR LOPEZ BALLEZA</Text>
                <Text style={styles.generalInfoSubtitleText}>jslb_cafcb10@hotmail.com</Text>
            </View>

            <View style={styles.infoUserContainer}>
                <View style={styles.dataUserBox}>
                    <Text style={styles.dataUser}>31 años</Text>
                </View>
                <View style={styles.dataUserBox}>
                    <Text style={styles.dataUser}>183 cm</Text>
                </View>
                <View style={styles.dataUserBox}>
                    <Text style={styles.dataUser}>110 kg</Text>
                </View>
            </View>

            <View style={styles.statusSuscriptionContainer}>
                <Text style={styles.suscriptionText}>SUSCRIPCIÓN ACTIVA</Text>
                <Text style={styles.suscriptionPlan}>PLAN PREMIUM</Text>
            </View>

            <View style={styles.dataUserContainer}>
                <View style={styles.datosInfoBox}>
                    <Text style={styles.datosInfoText}>OBJETIVO:</Text>
                    <Text style={styles.datosInfoText}>Eliminar grasa</Text>
                </View>
            </View>

            <View style={styles.dataUserContainer}>
                <View style={styles.datosInfoBox}>
                    <Text style={styles.datosInfoText}>TIPO DE DIETA:</Text>
                    <Text style={styles.datosInfoText}>Todo tipo de alimentos</Text>
                </View>
            </View>

            <View style={styles.dataUserContainer}>
                <View style={styles.datosInfoBox}>
                    <Text style={styles.datosInfoText}>NIVEL DE ACTIVIDAD FíSICA:</Text>
                    <Text style={styles.datosInfoText}>Ejercicio moderado</Text>
                </View>
            </View>
            <View style={styles.dataUserContainer}>
                <View style={styles.datosInfoBox}>
                    <Text style={styles.datosInfoText}>ALIMENTOS A EVITAR:</Text>
                    <Text style={styles.datosInfoText}>JAMÓN</Text>
                </View>
            </View>

            <View style={styles.footer}>
                <View style={styles.buttonDeleteContainer}>
                    <TouchableOpacity style={styles.buttonDelete} onPress={ handleDeleteAccount }>
                        <Text style={{ color: "red" }}>Eliminar cuenta</Text>
                    </TouchableOpacity>
                </View>
            </View>
       </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    //justifyContent: "center",
  },
  logoContainer: {
    marginVertical: 20,
    alignSelf: "center",
    //top: "10%",
  },
  logoImage: {
    // width: 100,
    //height: 100,
  },
  generalInfoContainer: {
    width: "100%",
    alignItems: "center",
  },
  generalInfoTitleText: {
    fontSize: 20,
    color: "#326807",
    //fontWeight: "bold",
    marginVertical: 5,
    fontFamily: "Gotham-Ultra",
  },
  generalInfoSubtitleText: {
    fontSize: 16,
    color: "#326807",
    //fontWeight: "bold",
    fontFamily: "Gotham-Ultra",
  },
  infoUserContainer: {
    flexDirection: "row",
    width: "80%",
    top: 10,
    alignItems: "center",
    margin: "10%",
    marginVertical: 10,
  },
  dataUserBox: {
    width: "33%",
    alignItems: "center",
    backgroundColor: "#faa029",
    borderRadius: 10,
    padding: 5,
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
  dataUser: {
    fontSize: 16,
    //fontWeight: "bold",
    marginVertical: 5,
    color: "#ffff",
    fontFamily: "Gotham-Medium",
  },
  statusSuscriptionContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 15,
  },
  suscriptionText: {
    fontSize: 18,
    color: "#326807",
    //fontWeight: "bold",
    marginVertical: 3,
    fontFamily: "Gotham-Ultra",
  },
  suscriptionPlan: {
    fontSize: 18,
    color: "#326807",
    //fontWeight: "bold",
    marginVertical: 3,
    textDecorationLine: "underline",
    fontFamily: "Gotham-Ultra",
  },
  dataUserContainer: {
    width: "100%",
    alignItems: "center",
  },
  datosInfoBox: {
    width: "80%",
    alignItems: "center",
    backgroundColor: "#faa029",
    borderRadius: 10,
    padding: 5,
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
  datosInfoText: {
    fontSize: 16,
    //fontWeight: "bold",
    marginVertical: 5,
    color: "#ffff",
    fontFamily: "Gotham-Medium",
  },
  footer: {
    width: "100%",
    alignItems: "center",
  },
  buttonDeleteContainer: {
    width: "80%",
    alignItems: "center",
  },
  buttonDelete: {
    padding: 10,
    width: "100%",
    borderWidth: 1,
    borderColor: "rgba(224, 26, 0, 0.8)",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    alignItems: "center",
    //marginTop: 10,
    borderRadius: 15,
    marginVertical: 10,
  },
});