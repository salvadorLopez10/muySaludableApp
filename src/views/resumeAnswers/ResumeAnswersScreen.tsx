import React, { useState } from 'react'
import { useRoute, RouteProp } from "@react-navigation/native";
import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet, View, Image, ImageBackground, ScrollView, Text, TouchableOpacity } from 'react-native'
import { activityLevelSelect } from '../quiz/DataDropdown';
import { Alert } from 'react-native';
import { MuySaludableApi } from '../../api/MuySaludableApi';
import { ActivityIndicator } from 'react-native';

interface Props extends StackScreenProps<any, any> {}

interface foodListItem{
  id: string;
  label: string;
}


const ResumeAnswersScreen = ({route,navigation}:Props) => {
    
    console.log(route.params);
    const [loading, setLoading] = useState(false);

    const getLabelById = (id: string): string | undefined => {
        const selectedOption = activityLevelSelect.find(option => option.id === id);
        return selectedOption?.label;
    };

    const labelLevelActivity = getLabelById(route.params!.physicalActivity);

    const handleCorrect = () => {
        navigation.goBack()
    }
    const handleConfirm = () => {
      updateInfoUser();
    };

    const updateInfoUser = async() =>{
      
      var alimentos_evitar = "";
      if (route.params!.foodAvoidListFiltered.length > 0) {
        alimentos_evitar = route.params!.foodAvoidListFiltered.map((item:foodListItem) => item.id).join(", ");
      }
      
      const bodyUpdateUser = {
        nombre: route.params!.name,
        edad: route.params!.age,
        altura: route.params!.height,
        peso: route.params!.weight,
        sexo: route.params!.gender,
        actividad_fisica: route.params!.physicalActivity,
        tipo_dieta: route.params!.dietType,
        alimentos_evitar: alimentos_evitar,
        objetivo: route.params!.goal,
        estado_mexico: route.params!.stateMexico,
      };
      console.log("URL ACTUALIZAR PASSWORD");
      console.log(JSON.stringify(bodyUpdateUser,null,2));
      console.log(`/usuarios/${route.params!.idUser}`);
      showIndicator();
      //disableButton();
      const actualizaPassword = await MuySaludableApi.put(
        `/usuarios/${route.params!.idUser}`,
        bodyUpdateUser
      )
        .then((responseUser) => {
          closeIndicator();
          //enableButton();
          console.log("RESPUESTA USER CUESTIONARIO");
          console.log(JSON.stringify(responseUser, null, 2));

          Alert.alert(
            "Información",
            "Agradecemos tus respuestas.\nEn un periodo de 2 horas tendrás listo tu plan alimenticio para poder aprovechar de sus beneficios"
          );
          navigation.reset({
            index: 0,
            routes: [{ name: "LoginScreen" }],
          });
        })
        .catch((errorUser) => {
          //closeIndicator();
          //enableButton();
          console.log(
            "Mensaje de error en suscripción: ",
            errorUser.response.data.message
          );
        });
    }

    const showIndicator = () =>{
      setLoading(true);
    }

    const closeIndicator = () => {
      setLoading(false);
    };

    function LoadingAnimation() {
      return (
        <View style={styles.indicatorWrapper}>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={styles.indicatorText}>Cargando...</Text>
        </View>
      );
    }
    
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../assets/background_frutas_resumen.jpg")}
        style={styles.slide}
      >
        <View style={styles.containerTitle}>
          <Text style={styles.textTitle}>RESUMEN DE RESPUESTAS</Text>
        </View>
        {/* <View style={styles.logoContainer}>
          <Image
            source={require("../../../assets/logoMuySaludable.png")}
            style={styles.logoImage}
          />
        </View> */}

        <View style={styles.containerAnswer}>
          <ScrollView>
            <Text style={styles.textAnswer}>
              1. {route.params!.name as any}
            </Text>
            <Text style={styles.textAnswer}>2. {route.params!.age} años</Text>
            <Text style={styles.textAnswer}>
              3. {route.params!.height / 100} m
            </Text>
            <Text style={styles.textAnswer}>4. {route.params!.weight} kg</Text>
            <Text style={styles.textAnswer}>5. {route.params!.gender}</Text>
            <Text style={styles.textAnswer}>6. {labelLevelActivity}</Text>
            <Text style={styles.textAnswer}>7. {route.params!.dietType}</Text>
            <Text style={styles.textAnswer}>
              8.{" "}
              {route.params!.foodAvoidListFiltered.length > 0
                ? "Sin alergia y/o consumo cualquier alimento"
                : route
                    .params!.foodAvoidListFiltered.map(
                      (alimento: foodListItem) => alimento.label
                    )
                    .join(", ")}
            </Text>
            <Text style={styles.textAnswer}>9. {route.params!.goal}</Text>
            <Text style={styles.textAnswer}>
              10. {route.params!.stateMexico}
            </Text>
          </ScrollView>
        </View>

        <View style={styles.containerButtons}>
          <TouchableOpacity
            style={styles.correctButton}
            onPress={handleCorrect}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Corregir</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirm}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Confirmar
            </Text>
          </TouchableOpacity>
        </View>

        {loading && <LoadingAnimation />}
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
    //width: "80%",
    alignItems: "center",
    top: "10%",
  },
  textTitle: {
    color: "#55851f",
    fontSize: 24,
    //fontWeight: "bold",
    fontFamily: "Gotham-Ultra",
    alignSelf: "center",
  },
  containerAnswer: {
    //backgroundColor: "blue",
    width: "90%",
    height: "75%",
    alignItems: "center",
    top: "3%",
  },
  textAnswer: {
    //fontWeight: "bold",
    fontFamily: "Gotham-Medium",
    fontSize: 18,
    margin: 10,
    flexWrap: "wrap",
    color: "#2E2A21",
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
export default ResumeAnswersScreen;