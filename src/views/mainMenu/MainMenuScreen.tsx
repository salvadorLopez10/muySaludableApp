import React, { PropsWithChildren, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, ScrollView, SafeAreaView, Button, Platform, ActivityIndicator } from "react-native";
import useViewModel from "./ViewModel";
import styles from "./Styles";
import { Image, View, Alert, Linking } from "react-native";
import { ImageBackground } from "react-native";
import AccordionItem from "./AccordionItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PlanView from './PlanView';
import { MuySaludableApi } from "../../api/MuySaludableApi";
import { useAuthStore } from "../../store/auth/useAuthStore";

export interface UserProps {
  id: number;
  nombre: null | string;
  email: null | string;
  password: null | string;
  edad: null | string;
  altura: null | string;
  peso: null | string;
  sexo: null | string;
  actividad_fisica: null | string;
  tipo_dieta: null | string;
  alimentos_evitar: null | string;
  objetivo: null | string;
  estado_mexico: null | string;
  activo: boolean;
  createdAt: Date;
  updatedAt: Date;
  id_plan_alimenticio: number;
  nombre_plan: null | string;
  tmb: null | string;
}

const MainMenuScreen = () => {

  const [userStatePlan, setUserStatePlan] = useState<UserProps>();
  const [numberMonths, setNumberMonths] = useState("");
  const [caloriesPlan, setCaloriesPlan] = useState("");
  const [planObj, setPlanObj] = useState({});
  const [showMealPlanElements, setShowMealPlanElements] = useState(false);
  //const [monthsArray, setMonthsArray] = useState([]);

  const monthsArray: Number[] = [];

  const { loading, printToFile, clickLinkRecetario, showLoading, hideLoading } = useViewModel();

  const userInfo = useAuthStore((state) => state.user);

  useEffect(() => {
    const getInfoUserPlan = async () => {
      const user = await AsyncStorage.getItem("user");

      if (user != null) {
        setUserStatePlan( JSON.parse(user));
        setNumberMonths(JSON.parse(user).duracion_meses);
      }
      console.log(JSON.stringify(user, null, 3));
    };
    getInfoUserPlan();
    getMealPlan();
    calculateCaloriesForPlan();
  }, []);

  const getMealPlan = async () => {
    // Antes de mostrar Plan, validamos que ya se haya cumplido el tiempo para mostrar el Plan
    //Validamos que el plan exista en el almacenamiento local
    showLoading();
    const mealPlanLocal = await AsyncStorage.getItem("mealPlan");
    //console.log("MEAL PLAN LOCAL");
    //console.log(JSON.stringify(mealPlanLocal,null,1));
    if( mealPlanLocal == null ){
      console.log("ENTRA CONSUMO API");
      
      const resp = await MuySaludableApi.get("/planNutricional/"+userInfo?.id)
        .then((response) => {
          //Antes de establecer el plan en pantalla, validamos que se hayan cumplido las 2 horas de "espera" (tiempo en lo que el plan está listo)
          const showMealPlan = validateShowMealPlan(response.data.data.createdAt);

          if( showMealPlan ){ //Ya se cumplió el tiempo de espera para la creación del plan
            setShowMealPlanElements(true);
            AsyncStorage.setItem("mealPlan", JSON.stringify(response.data.data) );
    
            console.log("EL PLAN OBTENIDO DESDE PLAN NUTRICIONAL BD");
            console.log(JSON.stringify( response.data.data, null, 2 ));
            setPlanObj(JSON.parse(response.data.data.contenido));
          }else{
            //Aún no se cumplen las 2 horas
            setShowMealPlanElements(false);
          }
          
          hideLoading();
          
        })
        .catch((error) => {
  
          hideLoading();
          console.log("Error al obtener plan");
          console.log(JSON.stringify(error, null, 2));
        });
    }else{ //Se tiene información del plan en AsyncStorage
      console.log("ENTRA CONSUMO ASYNCSTORAGE");
      console.log("Contenido local");
      console.log(JSON.stringify(mealPlanLocal,null,1));
      console.log("JSON PARSE");
      //console.log(JSON.stringify(JSON.parse(mealPlanLocal).createdAt,null,2));
      const showMealPlan = validateShowMealPlan(JSON.parse(mealPlanLocal).createdAt);
      if( showMealPlan ){
        setShowMealPlanElements(true);
        setPlanObj(JSON.parse(JSON.parse(mealPlanLocal).contenido));
      }else{
        setShowMealPlanElements(false);
      }
      hideLoading();
    }
  
  };

  const validateShowMealPlan = ( dateCreated: string ): Boolean => {
    console.log("ENTRA VALIDACIÓN VISTA PLAN");
    console.log(dateCreated);
    const createdAtDate = new Date(dateCreated);
    const createdAtPlus2Hours = new Date(createdAtDate.getTime() + 2 * 60 * 60 * 1000); // Sumar 2 horas en milisegundos
    // Obtener la fecha y hora actual
    const now = new Date();
    //const now = new Date(2024, 7, 29, 2, 58, 24);

    console.log("comparación:"),
    console.log("Creación: " + dateCreated, " Más 2: "+createdAtPlus2Hours, " actual: "+ now)

    if (now >= createdAtPlus2Hours) {
      console.log("RETURN TRUE");
      return true;
    } else {
      console.log("RETURN false");
      return false;
    }
  }

  const calculateCaloriesForPlan = () => {
    const calorias = ajustarCaloriasPorObjetivo(Number(userInfo?.tmb), userInfo?.objetivo);
    setCaloriesPlan(calorias.toFixed(2).toString());
  }

  const ajustarCaloriasPorObjetivo = (tmb: number, objetivo: string | null | undefined): number => {
    switch (objetivo) {
        case 'Bajar de peso':
            return tmb * 0.8; // Reducir en 20%
        case 'Mantenimiento':
            return tmb; // Mismo que la TMB
        case 'Ganar masa muscular':
            return tmb * 1.2; // Incrementar en 20%
        default:
            throw new Error('Objetivo no válido');
    }
}

  const calculateContainerMonths = ( months: string ) => {
    const months_number = Number(months);

    for (let index = 0; index < months_number; index++) {
      monthsArray.push(index);
      
    }
  }

  const handlePrintToFile = (argumento: UserProps| undefined, planObj:any) => {
    printToFile(argumento, planObj);
  };

  function LoadingAnimation() {
    return (
      <View style={styles.indicatorWrapper}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.indicatorText}>Cargando...</Text>
      </View>
    );
  }

  function LinkRecetario() {
    if( userStatePlan?.nombre_plan == "Paquete Premium" || userStatePlan?.nombre_plan == "Paquete Anual" ){
      return (
        <TouchableOpacity style={styles.btnLinkRecetario} onPress={clickLinkRecetario}>
          <Text style={styles.textBtnPDF}>DESCARGAR RECETARIO</Text>
        </TouchableOpacity>
      );
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* <Image
        source={require("../../../assets/MealPlanBG.jpg")}
        style={styles.imageBackground}
      /> */}
      <ImageBackground
        source={require("../../../assets/MealPlanBG.jpg")}
        style={styles.imageBackground}
      >
        <View style={styles.dataTitleContainer}>
              <View style={styles.datosInfoTitle}>
                <Text style={styles.datosTitleText}>PLAN GENERADO</Text>
                {/* <Text style={styles.datosTitleText}>{numberMonths}</Text> */}
              </View>
            </View>

        { showMealPlanElements ? (
          <>
            <View style={styles.contentTitleContainer}>
              <View style={styles.contentInfoTitle}>
                <Text style={styles.contentTitleText}>
                  CON BASE A TU OBJETIVO
                </Text>
                <Text style={styles.contentTitleText}>
                  {" "}
                  SE HA GENERADO UN PLAN DE
                </Text>
                <Text style={styles.contentTitleCalories}>
                  {" "}
                  { caloriesPlan } CALORÍAS
                </Text>
              </View>
            </View>

            <View style={styles.contentTitleContainer}>
              <View style={styles.contentInstructionTitle}>
                <Text style={styles.contentInstructionText}>
                  DA CLIC EN LA SECCIÓN QUE DESEES
                </Text>
                <Text style={styles.contentInstructionText}>
                  {" "}
                  PARA DESPLEGAR EL CONTENIDO DE
                </Text>
                <Text style={styles.contentInstructionText}>
                  TU PLAN ALIMENTICIO
                </Text>
              </View>
            </View>

            <PlanView objPlan={planObj} planContratado={userInfo?.nombre_plan} />

            {/* Solo disponible para Paquete Premium */}
            <LinkRecetario />
              <TouchableOpacity
                style={styles.btnPDF}
                onPress={() => handlePrintToFile(userStatePlan, planObj)}
              >
                <Text style={styles.textBtnPDF}>EXPORTAR PLAN COMO PDF</Text>
              </TouchableOpacity>
        
          </>

          ): 
          (
            <View style={styles.containerSinPlan}>
              <Text style={styles.centeredTextSinPlan}>Seguimos trabajando para</Text>
              <Text style={styles.centeredTextSinPlan}>tener el plan ideal para ti.</Text>
              <Text style={styles.centeredTextSinPlan}>Por favor vuelve a consultar</Text>
              <Text style={styles.centeredTextSinPlan}>más tarde</Text>
            </View>
          ) 
        }
        
        
      </ImageBackground>
      {loading && <LoadingAnimation />}
    </SafeAreaView>
  );
};

export default MainMenuScreen;
