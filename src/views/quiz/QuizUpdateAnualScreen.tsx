import React, { useState, useEffect } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { View, Text, Button, StyleSheet, TextInput, Image, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import Swiper from "react-native-swiper";
import { activityLevelSelect, goalOptionsSelect } from './DataDropdown';
import SelectField from "../../components/SelectField";
import { MuySaludableApi } from "../../api/MuySaludableApi";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { ActivityIndicator } from "react-native";
import { NotificationPush } from "../../utils/NotificationPush";
import * as Notifications from "expo-notifications";
import AsyncStorage from '@react-native-async-storage/async-storage';
import useViewModelLogin from "../login/ViewModel";

interface Props extends StackScreenProps<any,any>{};

const QuizUpdateAnualScreen = ({route,navigation}: Props) => {

  const [weight, setWeight] = useState("");
  const [physicalActivity, setPhysicalActivity] = useState("");
  const [goal, setGoal] = useState("");

  const [loading, setLoading] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState<string | undefined>("");

  const { handleLogin } = useViewModelLogin();

  const { schedulePushNotification } = NotificationPush();


  const userInfo = useAuthStore((state) => state.user);

  const {
    notification,
    notificationListener,
    responseListener,
    setNotification,
    registerForPushNotificationsAsync,
  } = NotificationPush();

  useEffect(() => {
    // registerForPushNotificationsAsync().then((token) => {
    //   console.log("TOKEN: " + token);
    //   setExpoPushToken(token);
    // });

    // notificationListener.current =
    //   Notifications.addNotificationReceivedListener((notification) => {
    //     setNotification(notification);
    //   });

    // responseListener.current =
    //   Notifications.addNotificationResponseReceivedListener((response) => {
    //     console.log(response);
    //   });

    // return () => {
    //   Notifications.removeNotificationSubscription(
    //     notificationListener.current
    //   );
    //   Notifications.removeNotificationSubscription(responseListener.current);
    // };
    if( userInfo ){
        console.log("DENTRO DE QUIZ UPDATE");
        console.log(JSON.stringify(userInfo,null,2));
        setExpoPushToken(userInfo.notification_token);
    }
  }, []);

  const handlePhysicalActivitySelect = (value: string) => {
    setPhysicalActivity(value);
  };
  
  const handleGoalSelect = (value: string) => {
    setGoal(value);
  };

  useEffect(() => {
    
  }, []);

  const scheduleNotification = async () => {
    console.log("SE PROCEDE A CALENDARIZAR PUSH NOTIFICATION");
    await schedulePushNotification(
      "¡Tu plan alimenticio ya está listo!",
      "Hemos generado tu plan alimenticio acorde a tus necesidades, por favor accede con tu usuario y contraseña para que lo puedas ver."
    );
  };

  const swiperRef = React.useRef<Swiper>(null);
  const goNext = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(1);
    }
  };
  
  const handleSubmitUpdatePlanAnual = () => {
    console.log(JSON.stringify(userInfo,null,2));
    let textFieldsEmpty = "";

    if (weight.trim() == "") {
        textFieldsEmpty += "Peso\n";
      }

    if (physicalActivity.trim() == "") {
      textFieldsEmpty += "Nivel de Actividad Física\n";
    }

    if (goal.trim() == "") {
      textFieldsEmpty += "Objetivo\n";
    }

    // Alert.alert("Error", "Favor de ingresar Sexo");

    if( textFieldsEmpty != "" ){
      //Eliminando la última coma del string
      textFieldsEmpty = textFieldsEmpty.substring(0,textFieldsEmpty.length -1);
      Alert.alert("Para continuar, favor de ingresar la siguiente información:", textFieldsEmpty);

      return;
    }

    //Mandar a actrualizar información del usuario, actualizar fecha de compra del plan,
    const labelPhysicalActivity = getLabelById(physicalActivity);
    const msjAlert = "La información que ingresaste es la siguiente:\n\nPeso: "+weight+" kg\n\n"+labelPhysicalActivity+"\n\nObjetivo: "+goal+"\n\n¿Confirmas que la información es correcta para crear el nuevo plan?";

    Alert.alert('Confirmación', msjAlert, [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
            text: 'Confirmar', 
            onPress: async () => {
                //Se actualiza la fecha de compra de la suscripción
                //Actualiza información del usuario (peso, actividad física y Objetivo)
                //Calcula nuevo plan
                const bodyUpdateUser = {
                    peso: weight,
                    objetivo: goal,
                    actividad_fisica: physicalActivity
                  };
                  console.log(JSON.stringify(bodyUpdateUser, null, 2));
                  showIndicator();

                  const updateUsuario = await MuySaludableApi.put(
                    `/usuarios/${userInfo?.id}`,
                    bodyUpdateUser
                  ).then((responseUpdateUsuario:any)=>{

                    //Genera nuevo tmb
                    const calculaTMB = MuySaludableApi.get(
                        `/usuarios/calculateTMB/${responseUpdateUsuario.data.data.id}`
                      ).then((responseTMB:any) => {

                        console.log("RESPUESTA USER TMB");
                        console.log(JSON.stringify(responseTMB, null, 2));
            
                        //Calcular nuevo plan alimenticio y guardar en bd
                        const body = convertDataUserToGeneratePlanRenovacion(userInfo,goal,responseTMB.data.data);

                        const resp = MuySaludableApi.post("/usuarios/generatePlan",body)
                        .then((responsePlanGenerado:any) => {
                            console.log("RESPONSE GENERACIÓN PLAN");
                            console.log(JSON.stringify(responsePlanGenerado,null,2));
                            console.log("SE OBTUVO ID DE USARIO DESDE UPDATE *********");
                            console.log(responseUpdateUsuario.data.data.id);
                            //Obtener todos los planes Activos del usuario, para que en caso de que tenga, TODOS se establezcan INACTIVOS
                            MuySaludableApi.get(`/planNutricional/planesActivos/${responseUpdateUsuario.data.data.id}`)
                            .then(( responsePlanesActivos:any ) => {
                                console.log("RESPONSE PLAN GUARDADO CON EL USUARIO");
                                console.log(JSON.stringify(responsePlanesActivos,null,2));
                                if( responsePlanesActivos.data.data.length > 0 ){
                                    //Actualizar como inactivos cada uno de los planes ACTIVOS encontrados
                                    for (let index = 0; index < responsePlanesActivos.data.data.length; index++) {
                                        let planActivo = responsePlanesActivos.data.data[index];
                                        console.log("ELEMENTO PLAN ACTIVO");
                                        console.log(JSON.stringify(planActivo,null,2));
                                        let idPlanActivo = planActivo.id;

                                        const bodyUpdateInactivePlan = {
                                            activo: 0,
                                        };
                                        //Por cada uno de los planes encontrados se procede a desactivarlos
                                        MuySaludableApi.put(`planNutricional/${idPlanActivo}`,
                                            bodyUpdateInactivePlan
                                        ).then((responseInactivePlan:any) => {
                                            console.log("SE HA INACTIVADO EL PLAAAN ");
                                            console.log(JSON.stringify(responseInactivePlan,null,2));

                                        }).catch((errorInactivePlan:any) => {
                                            console.log("ERROR AL INACTIVAR PLAAAN ");
                                            console.log(JSON.stringify(errorInactivePlan,null,2));
                                        });
                                    }
                                }

                                const bodyPlanAlimenticio = buildBodyRenovacionToPlanNutricional(userInfo,responsePlanGenerado.data.data);

                                MuySaludableApi.post("/planNutricional", bodyPlanAlimenticio)
                                .then(( responsePlanNutricionalSaved:any ) => {
                                    console.log("RESPONSE PLAN GUARDADO CON EL USUARIO");
                                    console.log(JSON.stringify(responsePlanNutricionalSaved,null,1));
                                    
                                    //Actualiza fecha compra de la suscripción para mantener actualizada la suscripción del plan anual (se actualiza cada 2 meses)
                                    //fecha_compra = new Date().toISOString();
                                    const bodyUpdateFechaCompra = {
                                        fecha_compra: new Date().toISOString()
                                    };
                                    const actualizaSuscripcion = MuySaludableApi.put(
                                        `/suscripciones/${userInfo?.id_suscripcion}`,
                                        bodyUpdateFechaCompra
                                      ).then((responseUpdateFechaCompra:any) => {
                                        console.log("SE ACTUALIZA FECHA COMPRA");
                                        console.log(JSON.stringify( responseUpdateFechaCompra.data.data,null,2 ));

                                        // Alert.alert(
                                        //     "Información",
                                        //     "Agradecemos la actualización de tu información.\nEn un periodo de 2 horas tendrás listo tu plan alimenticio para poder aprovechar de sus beneficios"
                                        // );

                                        // closeIndicator();

                                        // scheduleNotification();

                                        // clearDataUser();

                                        // navigation.reset({
                                        //     index: 0,
                                        //     routes: [{ name: "LoginScreen" }],
                                        // });
                                        closeIndicator();

                                        Alert.alert(
                                          "Información", // Título de la alerta
                                          "Agradecemos tus respuestas.\nEn un periodo de 1 hora tendrás listo tu plan alimenticio actualizado para poder continuar tus beneficios.",
                                          [
                                            {
                                              text: "Confirmar",
                                              onPress: () => {
                      
                                                scheduleNotification();
                      
                                                AsyncStorage.removeItem("mealPlan");
                      
                                                handleLogin(responseUpdateUsuario.data.data.email, responseUpdateUsuario.data.data.password, loading, setLoading);
                                              },
                                            },
                                          ],
                                          { cancelable: false } // Evita que la alerta se cierre sin el botón
                                        );

                                      }).catch((errorUpdateActualizaFechaCompra:any) => {
                                            closeIndicator();

                                            console.log(
                                            "Mensaje de error al INACTIVAR suscripción: ",
                                            errorUpdateActualizaFechaCompra.response.data.message
                                            );
                                        });

                                }).catch((errorInsertPlanNutricional:any) => {
                                    console.log("ERROR AL GUARDAR PLAN CON USUARIO");
                                    console.log(JSON.stringify(errorInsertPlanNutricional,null,1));
                                    closeIndicator();
                                });
                            })
                            .catch((errorPlanesActivos:any) => {
                                console.log("Error al obtener planes activos");
                                console.log(JSON.stringify(errorPlanesActivos, null, 2));
                                closeIndicator();
                            
                            });
                        })
                        .catch((errorPlanGenerado:any) => {
                            console.log("Error al obtener plan");
                            console.log(JSON.stringify(errorPlanGenerado, null, 2));
                            closeIndicator();
                        
                        });

                      }).catch((errorTMB:any) => {
                        closeIndicator();
                        //enableButton();
                        console.log(
                          "Mensaje de error al calcular TMB: ",
                          errorTMB.response.data.message
                        );
                      });

                  }).catch((errorUpdateUsuario:any) => {
                  console.log("ERROR AL ACTUALIZAR USUARIO");
                  console.log(JSON.stringify(errorUpdateUsuario,null,1));
                  closeIndicator();
                });


            }
        },
      ]);

  };

    const clearDataUser = async () => {
        await AsyncStorage.removeItem("user");
        await AsyncStorage.removeItem("mealPlan");

        useAuthStore.setState({ status: "unauthenticated" });
        useAuthStore.setState({ user: undefined });
    }

    const getLabelById = (id: string): string | undefined => {
        const selectedOption = activityLevelSelect.find(option => option.id === id);
        return selectedOption?.label;
    };

    const convertDataUserToGeneratePlanRenovacion = ( objDataUser:any, goal:string, tmb: string ) => {
        var dietType = "";

        switch (objDataUser.tipo_dieta) {
        case "Todo tipo de alimentos":
            dietType = "Todo";
            break;

        case "Sin gluten":
            dietType = "GlutenFree";
            break;
        
        default:
            dietType = objDataUser.tipo_dieta;
            break;
        }

        //const arrayOfFoodAvoid: Item[] = objDataUser.alimentos_evitar.split(',');
        const arrayOfIdsFoods: string[] = objDataUser.alimentos_evitar.split(',').map((item: string) => item.trim());

        const resultBody = {
        "tipo_dieta": dietType,
        "objetivo": goal,
        "tmb":tmb,
        "alimentos_evitar": arrayOfIdsFoods
        };
        
        console.log("BODY GENERA PLAN");
        console.log(JSON.stringify(resultBody,null,2));

        return resultBody;
    }

    const buildBodyRenovacionToPlanNutricional = ( objDataUser:any, generatedPlan: any ) => {

        const today = new Date();
        // Obtener el día, mes y año
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript son 0-indexed
        const year = today.getFullYear();
        // Formatear la fecha como "DD/MM/YYYY"
        const formattedDate = `${day}/${month}/${year}`;
    
        return {
          "nombre": "Plan generado para "+ objDataUser.nombre + " " +formattedDate ,
          "id_usuario": objDataUser.id,
          "contenido": JSON.stringify(generatedPlan),
          "activo": 1 //Se agrega 1, para que el plan nazca como Activo
        }
    
      }

    function LoadingAnimation() {
        return (
        <View style={styles.indicatorWrapper}>
            <ActivityIndicator size="large" color="#ffffff" />
            <Text style={styles.indicatorText}>Cargando...</Text>
        </View>
        );
    }

    const showIndicator = () => {
        setLoading(true);
    };

    const closeIndicator = () => {
        setLoading(false);
    };

  return (
    <View style={styles.container}>

      <Swiper
        style={styles.wrapper}
        //activeDotColor="#FCFDBD"
        // showsButtons={true}
        loop={false}
        ref={swiperRef}
        scrollEnabled={true}
      >

        <ImageBackground
          source={require("../../../assets/fondoSlides.jpg")}
          style={styles.slide}
        >
          <Text style={styles.text}>Ingresa tu peso (kg)</Text>
          {/* <SelectField data={weightOptionsSelect} keyboardType="numeric" /> */}
          <View style={styles.containerTextInput}>
            <TextInput
              style={styles.textInputStyleEdad}
              keyboardType="numeric"
              placeholderTextColor="#d1cccc"
              placeholder="Peso"
              value={weight}
              onChangeText={(value) => setWeight(value)}
            />
          </View>
          <TouchableOpacity onPress={goNext} style={styles.styleNextButton}>
            <Text style={{ color: "#2A261B", fontWeight: "bold" }}>
              Siguiente
            </Text>
          </TouchableOpacity>
        </ImageBackground>

        <ImageBackground
          source={require("../../../assets/fondoSlides.jpg")}
          style={styles.slide}
        >
          <Text style={styles.text}>¿Cuál es el nivel de</Text>
          <Text style={styles.text}>actividad física que realizas?</Text>
          <SelectField
            data={activityLevelSelect}
            onItemSelected={handlePhysicalActivitySelect}
          />
          <TouchableOpacity onPress={goNext} style={styles.styleNextButton}>
            <Text style={{ color: "#2A261B", fontWeight: "bold" }}>
              Siguiente
            </Text>
          </TouchableOpacity>
        </ImageBackground>


        <ImageBackground
          source={require("../../../assets/fondoSlides.jpg")}
          style={styles.slide}
        >
          <Text style={styles.text}>¿Cuál es tu objetivo?</Text>
          <SelectField
            data={goalOptionsSelect}
            onItemSelected={handleGoalSelect}
          />
          <TouchableOpacity onPress={handleSubmitUpdatePlanAnual} style={styles.styleNextButton}>
            <Text style={{ color: "#2A261B", fontWeight: "bold" }}>
              Confirmar
            </Text>
          </TouchableOpacity>
        </ImageBackground>

      </Swiper>

      {loading && <LoadingAnimation />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    //padding: 16,
  },
  swiper: {
    flex: 1,
  },

  wrapper: {},
  containerTextInput: {
    margin: 10,
    borderRadius: 15,
    width: "80%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    //paddingHorizontal: 3,
    //padding: 5
  },
  textInputStyle: {
    color: "#2A261B",
    // fontWeight: "bold",
    padding: 10,
    //marginTop: 10,
    width: "80%",
    textAlign: "center",
    fontFamily: "Gotham-Medium",
  },
  textInputStyleEdad: {
    backgroundColor: "white",
    color: "#2A261B",
    //fontWeight: "bold",
    fontFamily: "Gotham-Medium",
    padding: 5,
    //marginTop: 10,
    width: "50%",
    textAlign: "center",
  },
  containerText: {
    width: "90%",
    alignItems: "center",
  },
  contentText: {
    marginTop: 20,
  },
  styleNextButton: {
    padding: 10,
    width: "80%",
    backgroundColor: "#FCFDBD",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 15,
  },
  nextButtonText: {
    color: "#2A261B",
    fontFamily: "Gotham-Medium",
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FAA029",
    alignItems: "center",
    //padding: 30,
  },
  imageBackground: {
    width: "100%",
    height: "100%",
  },
  textTitle: {
    color: "#55851f",
    fontSize: 18,
    //fontWeight: "bold",
    fontFamily: "Gotham-Ultra",
    alignSelf: "center",
  },
  text: {
    color: "white",
    fontSize: 18,
    //fontWeight: "bold",
    fontFamily: "Gotham-Ultra",
    alignSelf: "center",
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: "white",
    marginTop: 10,
    width: "60%",
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  selectedStyle: {
    borderRadius: 12,
  },
  containerSlide: {
    flex: 1,
  },
  containerTextLabel: {
    flexDirection: "row",
    alignItems: "baseline",
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

export default QuizUpdateAnualScreen;