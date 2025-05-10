import React, { useEffect, useState } from 'react'
import { useRoute, RouteProp } from "@react-navigation/native";
import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet, View, Image, ImageBackground, ScrollView, Text, TouchableOpacity } from 'react-native'
import { activityLevelSelect } from '../quiz/DataDropdown';
import { Alert } from 'react-native';
import { MuySaludableApi } from '../../api/MuySaludableApi';
import { ActivityIndicator } from 'react-native';
import { NotificationPush } from '../../utils/NotificationPush';
import * as Notifications from "expo-notifications";
import useViewModelLogin from "../login/ViewModel";
import LoadingAnimationPlan from '../mainMenu/LoadingAnimationPlan';


interface Props extends StackScreenProps<any, any> {}

interface foodListItem{
  id: string;
  label: string;
}


const ResumeAnswersScreen = ({route,navigation}:Props) => {
    console.log("PARAMETROS USUARIOO");
    console.log(route.params);
    const [loading, setLoading] = useState(false);
    const [expoPushToken, setExpoPushToken] = useState<string | undefined>("");

    const { handleLogin } = useViewModelLogin();

    const { schedulePushNotification } = NotificationPush();
      const {
        notification,
        notificationListener,
        responseListener,
        setNotification,
        registerForPushNotificationsAsync,
      } = NotificationPush();

      useEffect(() => {
        registerForPushNotificationsAsync().then((token) => {
          console.log("TOKEN: " + token);
          setExpoPushToken(token);
        });

        notificationListener.current =
          Notifications.addNotificationReceivedListener((notification) => {
            setNotification(notification);
          });

        responseListener.current =
          Notifications.addNotificationResponseReceivedListener((response) => {
            console.log(response);
          });

        return () => {
          Notifications.removeNotificationSubscription(
            notificationListener.current
          );
          Notifications.removeNotificationSubscription(
            responseListener.current
          );
        };
      }, []);

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

    const updateInfoUser = async () => {
      try {
        var alimentos_evitar = "";
        if (route.params!.foodAvoidListFiltered.length > 0) {
          alimentos_evitar = route.params!.foodAvoidListFiltered.map((item: foodListItem) => item.label).join(", ");
        }
    
        var alimentos_preferencia = "";
        if (route.params!.foodPreferenceListFiltered.length > 0) {
          alimentos_preferencia = route.params!.foodPreferenceListFiltered.map((item: foodListItem) => item.label).join(", ");
        }

        const bodyUpdateUser = {
          nombre: route.params!.name,
          fecha_nacimiento: route.params!.dateBirth,
          edad: route.params!.age,
          altura: route.params!.height,
          peso: route.params!.weight,
          sexo: route.params!.gender,
          actividad_fisica: route.params!.physicalActivity,
          tipo_dieta: route.params!.dietType,
          alimentos_preferencia,
          alimentos_evitar,
          objetivo: route.params!.goal,
          social_media: route.params!.socialMedia,
          estado_mexico: route.params!.stateMexico,
          notification_token: expoPushToken || "",
        };
    
        console.log("BODY ACTUALIZAR USUARIO:", JSON.stringify(bodyUpdateUser, null, 2));
        console.log("ENDPOINT:", `/usuarios/${route.params!.idUser}`);
    
        showIndicator();
    
        // Actualizamos usuario
        const responseUser = await MuySaludableApi.put(`/usuarios/${route.params!.idUser}`, bodyUpdateUser);
        console.log("Usuario actualizado correctamente:", responseUser.data);
    
        // Empezamos la generación del plan en background (no esperamos)
        generatePlanInBackground(route.params!.idUser, route.params);
    
        // Esperamos 3 segundos para cerrar el indicador y continuar
        setTimeout(() => {
          closeIndicator();
          Alert.alert(
            "Información",
            "Agradecemos tus respuestas.\nEn un periodo de 1 hora tendrás listo tu plan alimenticio para poder aprovechar de sus beneficios.",
            [
              {
                text: "Confirmar",
                onPress: () => {
                  console.log("click botón confirmar");
                  scheduleNotification();
                  handleLogin(responseUser.data.data.email, responseUser.data.data.password, loading, setLoading);
                },
              },
            ],
            { cancelable: false }
          );
        }, 3000); // 3 segundos
    
      } catch (error: any) {
        closeIndicator();
        console.log("Error en actualización de usuario:", error.response?.data?.message || error.message);
      }
    };

    const generatePlanInBackground = async (userId: string, params: any) => {
      try {
        const responseTMB = await MuySaludableApi.get(`/usuarios/calculateTMB/${userId}`);
        console.log("TMB calculado: ", responseTMB.data);
    
        const bodyGeneratePlan = convertDataUserToGeneratePlan(params, responseTMB.data.data);
        const responsePlanGenerado = await MuySaludableApi.post("/usuarios/generatePlanNew", bodyGeneratePlan);
        console.log("Plan generado: ", responsePlanGenerado.data);
    
        const bodyPlanAlimenticio = buildBodyToPlanNutricional(params, responsePlanGenerado.data.data);
        const responsePlanSaved = await MuySaludableApi.post("/planNutricional", bodyPlanAlimenticio);
        console.log("Plan nutricional guardado:", responsePlanSaved.data);
    
      } catch (error: any) {
        console.log("Error generando o guardando plan en background:", error.response?.data?.message || error.message);
        Alert.alert("Error generando o guardando plan en background:", error.response?.data?.message || error.message);
      }
    };
    

    const convertDataUserToGeneratePlan = ( objDataUser:any, tmb: string ) => {
      var dietType = "";

      switch (objDataUser.dietType) {
        case "Todo tipo de alimentos":
          dietType = "Todo";
          break;

        case "Sin gluten":
          dietType = "GlutenFree";
          break;
      
        default:
          dietType = objDataUser.dietType;
          break;
      }

      interface Item {
        id: string;
        label: string;
        grupo: string;
      };

      const arrayOfFoodAvoid: Item[] = objDataUser.foodAvoidListFiltered;
      const arrayOfIdsFoods: string[] = arrayOfFoodAvoid.map((item: Item) => item.id);
      
      const arrayOfFoodPreferenceAvoid: Item[] = objDataUser.foodPreferenceListFiltered;
      const arrayOfIdsPreferenceFoods: string[] = arrayOfFoodPreferenceAvoid.map((item: Item) => item.id);

      const resultBody = {
        "tipo_dieta": dietType,
        "objetivo": objDataUser.goal,
        "tmb":tmb,
        "alimentos_evitar": arrayOfIdsFoods,
        "alimentos_preferencia": arrayOfIdsPreferenceFoods
      };
      
      console.log("BODY GENERA PLAN");
      console.log(JSON.stringify(resultBody,null,2));

      return resultBody;
    }

    const buildBodyToPlanNutricional = ( objDataUser:any, generatedPlan: any ) => {

      const today = new Date();
      // Obtener el día, mes y año
      const day = String(today.getDate()).padStart(2, '0');
      const month = String(today.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript son 0-indexed
      const year = today.getFullYear();
      // Formatear la fecha como "DD/MM/YYYY"
      const formattedDate = `${day}/${month}/${year}`;

      return {
        "nombre": "Plan generado para "+ objDataUser.name + " " +formattedDate ,
        "id_usuario": objDataUser.idUser,
        "contenido": JSON.stringify(generatedPlan),
        "activo": 1 //Se agrega 1, para que el plan nazca como Activo
      }

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

    const scheduleNotification = async (  ) => {
      console.log("SE PROCEDE A CALENDARIZAR PUSH NOTIFICATION")
        await schedulePushNotification("¡Tu plan alimenticio ya está listo!","Hemos generado tu plan alimenticio acorde a tus necesidades, por favor accede con tu usuario y contraseña para que lo puedas ver.");
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
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.textAnswer}>
              1. {route.params!.name as any}
            </Text>
            {/* <Text style={styles.textAnswer}>2. {route.params!.age} años</Text> */}
            <Text style={styles.textAnswer}>2. {`${route.params!.dateBirth} - (${route.params!.age} años)`}</Text>
            <Text style={styles.textAnswer}>
              3. {route.params!.height / 100} m
            </Text>
            <Text style={styles.textAnswer}>4. {route.params!.weight} kg</Text>
            <Text style={styles.textAnswer}>5. {route.params!.gender}</Text>
            <Text style={styles.textAnswer}>6. {labelLevelActivity}</Text>
            <Text style={styles.textAnswer}>7. {route.params!.dietType}</Text>
            
            <Text style={styles.textAnswer}>
              8.{" "}
              {route.params!.foodAvoidListFiltered.length == 0
                ? "Sin alergia y/o consume cualquier alimento"
                : route
                    .params!.foodAvoidListFiltered.map(
                      (alimento: foodListItem) => alimento.label
                    )
                    .join(", ")}
            </Text>
            <Text style={styles.textAnswer}>
              9.{" "}
              {route.params!.foodPreferenceListFiltered.length == 0
                ? "Sin preferencia y/o consume cualquier alimento"
                : route
                    .params!.foodPreferenceListFiltered.map(
                      (alimento: foodListItem) => alimento.label
                    )
                    .join(", ")}
              
            </Text>
            <Text style={styles.textAnswer}>10. {route.params!.goal}</Text>
            <Text style={styles.textAnswer}>11. {route.params!.socialMedia}</Text>
            <Text style={styles.textAnswer}>12. {route.params!.stateMexico}</Text>
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

        {loading && <LoadingAnimationPlan />}
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
    top: "7%",
  },
  textTitle: {
    color: "#55851f",
    fontSize: 24,
    //fontWeight: "bold",
    fontFamily: "Gotham-Ultra",
    alignSelf: "center",
  },
  containerAnswer: {
    width: "85%",
    height: "55%",
    alignItems: "center",
    //top: "3%",
    //marginBottom: 50,
    bottom: "5%"
  },
  scrollContent: {
   // paddingBottom: 80, // Agrega espacio en la parte inferior del contenido
  },
  scrollContainer: {
    bottom: "10%"
  },
  textAnswer: {
    //fontWeight: "bold",
    fontFamily: "Gotham-Medium",
    fontSize: 18,
    margin: 10,
    flexWrap: "wrap",
    color: "#326807",
  },
  containerButtons: {
    flexDirection: "row",
    //paddingHorizontal: 10,           // Espaciado lateral (ajústalo según sea necesario)
    //marginBottom: "1%",
    top: "25%",
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