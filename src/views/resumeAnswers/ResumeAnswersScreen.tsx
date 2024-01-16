import React from 'react'
import { useRoute, RouteProp } from "@react-navigation/native";
import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet, View, Image, ImageBackground, ScrollView, Text, TouchableOpacity } from 'react-native'

interface Props extends StackScreenProps<any, any> {}


const ResumeAnswersScreen = ({route,navigation}:Props) => {

    console.log(route.params);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../assets/background_frutas_resumen.jpg")}
        style={styles.slide}
      >
        <View style={styles.containerTitle}>
          <Text style={styles.textTitle}>RESUMEN DE RESPUESTAS</Text>
        </View>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../../assets/logoMuySaludable.png")}
            style={styles.logoImage}
          />
        </View>

        <View style={styles.containerAnswer}>
          <ScrollView>
            <Text style={styles.textAnswer}>1. { route.params!.name as any}</Text>
            <Text style={styles.textAnswer}>2. {route.params!.age} años</Text>
            <Text style={styles.textAnswer}>3. {route.params!.height} cm</Text>
            <Text style={styles.textAnswer}>4. {route.params!.weight} kg</Text>
            <Text style={styles.textAnswer}>5. {route.params!.gender}</Text>
            <Text style={styles.textAnswer}>6. {route.params!.physicalActivity}</Text>
            <Text style={styles.textAnswer}>7. {route.params!.dietType}</Text>
            <Text style={styles.textAnswer}>8. {route.params!.dietType}</Text>
            <Text style={styles.textAnswer}>9. {route.params!.goal}</Text>
            <Text style={styles.textAnswer}>10. {route.params!.stateMexico}</Text>
          </ScrollView>
        </View>

        <View style={styles.containerButtons}>
          <TouchableOpacity style={styles.correctButton}>
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Corregir
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.confirmButton}>
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Confirmar
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  logoContainer: {
    position: "absolute",
    alignSelf: "center",
    top: "10%",
    opacity: 0.3,
  },
  logoImage: {
    width: 100,
    height: 100,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerTitle: {
    position: "absolute",
    width: "80%",
    alignItems: "center",
    top: "5%",
  },
  textTitle: {
    color: "#55851f",
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
  },
  containerAnswer: {
    //backgroundColor: "blue",
    width: "90%",
    height: "50%",
    alignItems: "center",
  },
  textAnswer: {
    fontWeight: "bold",
    margin: 10,
  },
  containerButtons: {
    flexDirection: "row",
    top: 40,
  },
  correctButton: {
    padding: 10,
    width: "40%",
    backgroundColor: "rgba(250, 160, 41,0.8)",
    alignItems: "center",
    //marginTop: 10,
    borderRadius: 15,
  },
  confirmButton: {
    padding: 10,
    width: "40%",
    backgroundColor: "rgba(85, 133, 31,0.8)",
    alignItems: "center",
    //marginTop: 10,
    borderRadius: 15,
  },
});
export default ResumeAnswersScreen;