import React, { useState, useEffect } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ImageBackground,
  Alert,
  ActivityIndicator,
} from "react-native";
import Swiper from "react-native-swiper";
import {
  goalOptionsSelect
} from "../quiz/DataDropdown";
import SelectField from "../../components/SelectField";
import { MuySaludableApi } from "../../api/MuySaludableApi";
import MultiSelectField from "../../components/MultiSelectField";
import { NotificationPush } from "../../utils/NotificationPush";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthStore } from "../../store/auth/useAuthStore";

interface Props extends StackScreenProps<any, any> {}

interface Alimentos {
  id: number;
  nombre: string;
  tipo: string;
  informacion_nutrimental: string;
  createdAt: string;
  updatedAt: string;
}

//Food representa la estructura de los elementos que se establecen en el campo select en donde se eleige los alimentos a los que se es alérgico
interface Food {
  label: string;
  id: string;
}

const QuizSummaryScreen = ({ route, navigation }: Props) => {
  console.log("QUIZ RESUMEN");
  console.log(route.params);
  const [idUser, setIdUser] = useState("");
  const [weight, setWeight] = useState("");
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState<string | undefined>("");

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
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const handleGoalSelect = (value: string) => {
    setGoal(value);
  };

  useEffect(() => {
    console.log("entra effect");
    setIdUser(route.params!.idUsuario);
  }, []);

  const [respuestas, setRespuestas] = useState(Array(10).fill(""));

  const handleRespuestaChange = (index: number, respuesta: string) => {
    const nuevasRespuestas = [...respuestas];
    nuevasRespuestas[index] = respuesta;
    setRespuestas(nuevasRespuestas);
  };

  const updateWeightGoalUser = async() =>{
    const bodyUpdateUser = {
      peso: weight,
      objetivo: goal,
      notification_token: expoPushToken ? expoPushToken : "",
    };
    console.log(JSON.stringify(bodyUpdateUser, null, 2));
    console.log(`/usuarios/${route.params!.userInfo.id}`);
    showIndicator();

    const actualizaPassword = await MuySaludableApi.put(
      `/usuarios/${route.params!.userInfo.id}`,
      bodyUpdateUser
    )
      .then((responseUser) => {
        console.log("RESPUESTA USER CUESTIONARIO");
        console.log(JSON.stringify(responseUser, null, 2));

        const calculaTMB = MuySaludableApi.get(
          `/usuarios/calculateTMB/${route.params!.userInfo.id}`
        )
          .then((responseTMB) => {
            console.log("RESPUESTA USER TMB");
            console.log(JSON.stringify(responseTMB, null, 2));

            closeIndicator();
            Alert.alert(
              "Información",
              "Agradecemos tus respuestas.\nEn un periodo de 2 horas tendrás listo tu plan alimenticio para poder aprovechar de sus beneficios"
            );
            
            scheduleNotification();

            resetLocalInfo();

            navigation.reset({
              index: 0,
              routes: [{ name: "LoginScreen" }],
            });
          })
          .catch((errorTMB) => {
            closeIndicator();
            //enableButton();
            console.log(
              "Mensaje de error al calcular TMB: ",
              errorTMB.response.data.message
            );
          });
      })
      .catch((errorUser) => {
        console.log(JSON.stringify(errorUser, null, 3));
        closeIndicator();
        //enableButton();
        console.log(
          "Mensaje de error en actualización: ",
          errorUser.response.data.message
        );
      });

  }

  const resetLocalInfo = async () => {
    
    await AsyncStorage.removeItem("user");

    useAuthStore.setState({ status: "unauthenticated" });
    useAuthStore.setState({ user: undefined });
    ;
  }

  const handleSubmit = () => {
    let textFieldsEmpty = "";

    if (weight.trim() == "") {
      textFieldsEmpty += "Peso\n";
    }

    if (goal.trim() == "") {
      textFieldsEmpty += "Objetivo\n";
    }

    if (textFieldsEmpty != "") {
      //Eliminando la última coma del string
      textFieldsEmpty = textFieldsEmpty.substring(
        0,
        textFieldsEmpty.length - 1
      );
      Alert.alert(
        "Para continuar, favor de ingresar la siguiente información:",
        textFieldsEmpty
      );

      return;
    }

    //Mandar submit para crear plan con base a los nuevos 2 valores
    Alert.alert(
      "Valores elegidos",
      "Se han elegido los siguientes valores:\nPeso: " +
        weight + " kg" +
        "\n" +
        "Objetivo: " + goal +
        "\n\n¿Deseas confirmar las información para poder generar tu nuevo plan alimenticio?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Confirmar",
          onPress:  () => {
            updateWeightGoalUser();
          },
        },
      ],
      { cancelable: false }
    );
  };

  const showIndicator = () => {
    setLoading(true);
  };

  const closeIndicator = () => {
    setLoading(false);
  };

  const scheduleNotification = async () => {
    console.log("SE PROCEDE A CALENDARIZAR PUSH NOTIFICATION");
    await schedulePushNotification(
      "¡Tu plan alimenticio ya está listo!",
      "Hemos generado tu plan alimenticio acorde a tus necesidades, por favor accede con tu usuario y contraseña para que lo puedas ver"
    );
  };


  const swiperRef = React.useRef<Swiper>(null);
  const goNext = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(1);
    }
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
      {/* <Swiper style={styles.swiper} loop={false} showsButtons={true}>
        {renderPreguntas()}
      </Swiper>
      <Button title="Enviar Respuestas" onPress={handleSubmit} /> */}
      <Swiper
        style={styles.wrapper}
        //activeDotColor="#FCFDBD"
        // showsButtons={true}
        loop={false}
        ref={swiperRef}
        scrollEnabled={true}
      >
        <ImageBackground
          source={require("../../../assets/background_manzana.jpg")}
          style={styles.slide}
        >
          <View style={styles.logoContainer}>
            <Image
              source={require("../../../assets/logoMuySaludable.png")}
              style={styles.logoImage}
            />
          </View>
          <View style={styles.containerText}>
            <Text style={styles.textTitle}>¡BIENVENIDO DE NUEVO!</Text>
            <View style={styles.contentText}>
              <Text style={styles.text2}>Gracias por renovar tu plan</Text>
              <Text style={styles.text2}>con nosotros.</Text>
              <Text style={styles.text2}>Para mantener actualizada</Text>
              <Text style={styles.text2}>tu información</Text>
              <Text style={styles.text2}>es necesario contestar</Text>
              <Text style={styles.text2}>las siguientes 2 preguntas</Text>
            </View>
          </View>
          <TouchableOpacity onPress={goNext} style={styles.styleBeginButton}>
            <Text style={{ color: "white", fontFamily: "Gotham-Medium" }}>
              Comenzar
            </Text>
          </TouchableOpacity>
        </ImageBackground>

        <ImageBackground
          source={require("../../../assets/fondoSlides.jpg")}
          style={styles.slide}
        >
          <Text style={styles.text}>Ingresa tu peso (kg)</Text>
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
          <Text style={styles.text}>¿Cuál es tu objetivo?</Text>
          <SelectField
            data={goalOptionsSelect}
            onItemSelected={handleGoalSelect}
          />
          <TouchableOpacity
            onPress={handleSubmit}
            style={styles.styleNextButton}
          >
            <Text style={{ color: "#2A261B", fontWeight: "bold" }}>
              Finalizar
            </Text>
          </TouchableOpacity>
          {loading && <LoadingAnimation />}
        </ImageBackground>
      </Swiper>
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
  preguntaContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {},
  containerTextInput: {
    margin: 10,
    borderRadius: 15,
    width: "80%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
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
    //backgroundColor: "white",
    color: "#2A261B",
    //fontWeight: "bold",
    fontFamily: "Gotham-Medium",
    padding: 10,
    //marginTop: 10,
    //28width: "30%",
    textAlign: "center",
  },
  containerText: {
    width: "90%",
    alignItems: "center",
  },
  contentText: {
    marginTop: 20,
    alignItems: "center",
  },
  styleBeginButton: {
    padding: 10,
    width: "80%",
    backgroundColor: "#FAA029",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 15,
    fontFamily: "Gotham-Medium",
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
  slide16: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F78291",
    alignItems: "center",
    //padding: 30,
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
  text2: {
    color: "#55851F",
    fontSize: 18,
    alignSelf: "center",
    fontFamily: "Gotham-Medium",
  },
  logoContainer: {
    position: "absolute",
    alignSelf: "center",
    top: "15%",
    padding: 10,
  },
  logoImage: {
    //width: 100,
    //height: 100,
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

export default QuizSummaryScreen;
