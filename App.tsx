import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StackNavigator } from "./src/navigator/StackNavigator";
import { LateralMenu } from './src/navigator/LateralMenu';
import { BottomTabs } from './src/navigator/BottomTabs';
import { useFonts } from "expo-font";
import { Alert, Text, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthStore } from './src/store/auth/useAuthStore';
import * as Notifications from "expo-notifications";
import UserProfileStackNavigator from './src/navigator/UserProfileStackNavigator';
import { QuizNavigator } from "./src/navigator/QuizNavigator";
import { MuySaludableApi } from "./src/api/MuySaludableApi";
import { UpdateAnualPlanNavigator } from "./src/navigator/UpdateAnualPlanNavigator";
import { NewUserNavigator } from "./src/navigator/NewUserNavigator";


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [showUpdateMessage, setShowUpdateMessage] = useState(false);
  const [navigatorComponent, setNavigatorComponent] = useState(<View><Text>Cargando...</Text></View>);


  const [fontsLoaded, fontError] = useFonts({
    "Gotham-Ultra": require("./assets/fonts/Gotham-Ultra.otf"),
    "Gotham-Book": require("./assets/fonts/Gotham-Book.otf"),
    "Gotham-Thin": require("./assets/fonts/Gotham-Thin.otf"),
    "Gotham-Medium": require("./assets/fonts/Gotham-Medium.otf"),
    "Gotham-BlackItalic": require("./assets/fonts/Gotham-BlackItalic.otf"),
  });

  const status = useAuthStore((state) => state.status);
  const userInfo = useAuthStore((state) => state.user);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const user = await AsyncStorage.getItem("user");
  
      console.log("getInfoUser");
      console.log(JSON.stringify(user, null, 1));
  
      if (user != null) {
        const parsedUser = JSON.parse(user);
        useAuthStore.setState({
          status: "authenticated",
          user: parsedUser, 
        });
      } else {
        useAuthStore.setState({
          status: "unauthenticated",
          user: undefined,  // Cambiar a `null` en lugar de `undefined`
        });
      }
    };
  
    fetchUserInfo();
  }, []);

  useEffect(() => {
    console.log("Estado actualizado - status:", status, "userInfo:", userInfo);
    if (userInfo !== null ) {
      //console.log("EFFECT RENDERNAVIGATOR");
      renderNavigator();
    }
  }, [userInfo, status]);

  const getInfoUser = async () => {
    const user = await AsyncStorage.getItem("user");
    if (user != null) {
      const parsedUser = JSON.parse(user);
      useAuthStore.setState({ status: "authenticated" });
      useAuthStore.setState({ user: parsedUser });      
    }
  };

  const isExpiratedPlan = (fechaExpiracion: string | undefined) => {
    //fechaExpiracion = "2024-08-04T05:59:00.000Z";
    const currentDate = new Date();
    if(fechaExpiracion !== undefined){
      const expirationDate = new Date(fechaExpiracion);
      if (currentDate > expirationDate) {
        return true;
      }
    }

    return false;
  };

  const validate2meses = async () => {
    var actualizaPlan = false;
    try {
      const response = await MuySaludableApi.get(`/suscripciones/${userInfo?.id_suscripcion}`);
      //console.log(JSON.stringify(response, null, 2));
      const fechaCompra = response.data.data.fecha_compra;
      const fechaActual = new Date();

      if (fechaCompra !== undefined) {
        const fechaCompraSuscripcion = new Date(fechaCompra);
        console.log("COMPARANDO ACTUAL: " + fechaActual + " COMPARANDO CREACIÓN: " + fechaCompraSuscripcion);
        const diferenciaMeses = fechaActual.getMonth() - fechaCompraSuscripcion.getMonth() + (12 * (fechaActual.getFullYear() - fechaCompraSuscripcion.getFullYear()));
        console.log("diff meses: " + diferenciaMeses);
        if (diferenciaMeses >= 2) {
          console.log("YA HAN PASADO 2 MESES");
          actualizaPlan = true;
        }
      }
    } catch (error) {
      console.log("Error al obtener la suscripción");
      console.log(error);
    }
    return actualizaPlan;
  };

  const renderNavigator = async () => {
    console.log("RENDER NAVIGATOR");

    if (!userInfo) {
      console.log("STACKNAVIGATOR"); //Stack para compra de plan (usuario nuevo)
      setNavigatorComponent(<StackNavigator />);
    }else if( status == 'userWithoutSuscription' ){ //Es string ya que cuando se hace login con un usuario sin sucripción, el valor que se guarda en userInfo es el email del usuario
      //Mostramos la pantalla de nuevo usuario sin suscripción
      console.log("NewUserNavigator");
      setNavigatorComponent(<NewUserNavigator/>);

    }else if (isExpiratedPlan(userInfo.fecha_expiracion)) {  //isExpiratedPlan("2024-05-11T05:59:00.000Z") -  isExpiratedPlan(userInfo.fecha_expiracion)
      console.log("UserProfileStackNavigator"); //Stack para renovación de plan
      setNavigatorComponent(<UserProfileStackNavigator />);
    } else if (!userInfo.nombre && status !== 'unauthenticated') { //Stack para completar cuestionario (EL USUARIO NO COMPLETÓ EL CUESTIONARIO CORRECTAMENTE)
      console.log("QUIZ NAVIGATOR");
      setNavigatorComponent(<QuizNavigator />);
    } else {
      if (userInfo.nombre_plan == "4. PLAN ANUAL") {
        console.log("TIENE PLAN ANUAL, PROCEDEMOS A VALIDAR SI YA PASARON 2 MESES, PARA QUE EN CASO DE QUE SEA ASÍ, SE PROCEDE A VALIDAR");
        const actualizaPlan = await validate2meses();
        console.log("RESPUESTA ACTUALIZA PLAN: " + actualizaPlan);
        if (actualizaPlan) {
          Alert.alert(
            "Actualizar plan alimenticio",
            "Para mantener actualizado tu plan alimenticio, es necesario actualizar información de tu perfil.\n¡Te invitamos a contestar las siguientes preguntas!",
            [
              {
                text: "Actualizar información",
                onPress: () => setNavigatorComponent(<UpdateAnualPlanNavigator />),
              },
            ],
            { cancelable: false }
          );
        }
        setNavigatorComponent(<LateralMenu />);
      } else {
        console.log("LateralMenu"); //Stack con usuario logueado
        setNavigatorComponent(<LateralMenu />);
      }
    }
  }

  if( !fontsLoaded ){
    console.log("SIN FUENTES");
    return <View>
      <Text></Text>
    </View>
  }

  return (
    // <NavigationContainer>
    //   {
    //      //status !== "authenticated" ? <StackNavigator /> : <LateralMenu />
    //     // <BottomTabs />
    //     renderNavigator()
    //   }
    //   {/* <BottomTabs /> */}
    //   {/* <StackNavigator /> */}
    //   {/* <LateralMenu /> */}
    // </NavigationContainer>
    <NavigationContainer>
      {showUpdateMessage && (
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, backgroundColor: 'yellow', padding: 10 }}>
          <Text>Han pasado 2 meses desde tu última actualización. ¡Es momento de actualizar tu plan!</Text>
        </View>
      )}
      {navigatorComponent}
    </NavigationContainer>
  );
}