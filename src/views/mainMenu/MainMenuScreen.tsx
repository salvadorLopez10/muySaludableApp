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
import FloatingButton from "../../components/FloatingButton";

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

export interface Recomendacion{
  id: number;
  objetivo: string;
  titulo: string;
  descripcion: string;
  image_url: string;
  orden: number;
  visible: boolean;
}

const MainMenuScreen = () => {

  const [userStatePlan, setUserStatePlan] = useState<UserProps>();
  const [numberMonths, setNumberMonths] = useState("");
  const [caloriesPlan, setCaloriesPlan] = useState("");
  const [planObj, setPlanObj] = useState({});
  const [showMealPlanElements, setShowMealPlanElements] = useState(false);
  const [recomendaciones, setRecomendaciones] = useState<Recomendacion[]>([]);
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
    getMealPlan(false);
    calculateCaloriesForPlan();
    getRecomendaciones();
  }, []);

  const getMealPlan = async ( fromVerify: boolean ) => {
    // Antes de mostrar Plan, validamos que ya se haya cumplido el tiempo para mostrar el Plan
    //Validamos que el plan exista en el almacenamiento local
    showLoading();
    const mealPlanLocal = await AsyncStorage.getItem("mealPlan");
    //console.log("MEAL PLAN LOCAL");
    //console.log(JSON.stringify(mealPlanLocal,null,1));
    if( mealPlanLocal == null || fromVerify ){
      console.log("ENTRA CONSUMO API");
      
      const resp = await MuySaludableApi.get("/planNutricional/"+userInfo?.id)
        .then((response:any) => {
          //Antes de establecer el plan en pantalla, validamos que se hayan cumplido 1 hora de "espera" (tiempo en lo que el plan está listo)
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
            //Solo mosrtras alerta cuando se dió click en el botón, es decir, no se debe de mostrar la alerta al inicio
            if( fromVerify ){
              Alert.alert("Información", "Aún estamos trabajando en la creación de tu plan alimenticio.\nTe notificaremos cuando esté listo.\n¡Gracias por tu paciencia!");
            }
          }
          
          hideLoading();
          
        })
        .catch((error:any) => {
  
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
    const createdAtPlus1Hour = new Date(createdAtDate.getTime() + 1 * 60 * 60 * 1000); // Sumar 1 hora en milisegundos
    // Obtener la fecha y hora actual
    const now = new Date();
    //const now = new Date(2024, 8, 5, 2, 58, 24);

    console.log("comparación:"),
    console.log("Creación: " + dateCreated, " Más 1: "+createdAtPlus1Hour, " actual: "+ now)

    if (now >= createdAtPlus1Hour) {
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

  const getRecomendaciones = async () => {
    const resp = await MuySaludableApi.get("/recomendaciones")
      .then((response: any) => {
        console.log("RECOMENDACIONES");
        console.log(JSON.stringify(response.data.recomendaciones, null, 2));
        setRecomendaciones(response.data.recomendaciones);
      })
      .catch((error:any) => {
        console.log("Error al obtener recomendaciones");
        console.log(JSON.stringify(error, null, 2));
      });
  }

  const ajustarCaloriasPorObjetivo = (tmb: number, objetivo: string | null | undefined): number => {

    console.log("EL OBJETIVO: " + objetivo);
    switch (objetivo) {
      case 'Bajar grasa y comer saludable':
        return Number(tmb) - 500; // Déficit estándar
      case 'Low Carb y definición muscular':
        return Number(tmb) - 300; // Déficit más leve
      case 'Mantenimiento':
        return Number(tmb); // Sin ajuste
      case 'Subir masa muscular':
        return Number(tmb) + 500; // Superávit calórico
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
    if( userStatePlan?.nombre_plan == "3. PLAN PREMIUM" || userStatePlan?.nombre_plan == "4. PLAN ANUAL" ){
      return (
        <TouchableOpacity style={styles.btnLinkRecetario} onPress={clickLinkRecetario}>
          <Text style={styles.textBtnPDF}>DESCARGAR RECETARIO</Text>
        </TouchableOpacity>
      );
    }
  }

  function verifyShowMealPlan(){
    getMealPlan(true);
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

        { showMealPlanElements ? (
          <>
            <View style={styles.dataTitleContainer}>
              {/* <View style={styles.datosInfoTitle}>
                <Text style={styles.datosTitleText}>PLAN GENERADO</Text>
                 <Text style={styles.datosTitleText}>{numberMonths}</Text> 
              </View> */}
            </View>
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
                  { Math.round(Number(caloriesPlan)) } CALORÍAS
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
            <View style={styles.buttonContainer}>

              <LinkRecetario />
              <TouchableOpacity
                style={[
                  styles.btnPDF,
                  !(userStatePlan?.nombre_plan == "3. PLAN PREMIUM" || userStatePlan?.nombre_plan == "4. PLAN ANUAL") 
                    ? styles.btnFullWidth 
                    : null
                ]}
                onPress={() => handlePrintToFile(userStatePlan, planObj)}
              >
                <Text style={styles.textBtnPDF}>EXPORTAR PLAN EN PDF</Text>
              </TouchableOpacity>
            </View>
        
          </>

          ): 
          (
            <View style={styles.containerSinPlan}>
              <View style={styles.containerTitle}>
                <Text style={styles.centeredTextSinPlan}>Seguimos trabajando para</Text>
                <Text style={styles.centeredTextSinPlan}>tener el plan ideal para ti.</Text>
              </View>
              <View style={styles.logoContainer}>
                <Image
                  source={require("../../../assets/logoMuySaludableMR.png")}
                  style={styles.logoImage}
                />
              </View>
              {/* <Text style={styles.centeredTextContentNewLineSinPlan}>{ "\n" }</Text> */}
              <Text style={styles.centeredTextContentSinPlan}>Por favor vuelve a consultar más tarde.</Text>
              <Text style={styles.centeredTextContentSinPlan}>Recuerda esperar 1 hora una vez</Text>
              <Text style={styles.centeredTextContentSinPlan}>realizada tu compra.</Text>

              <Text style={styles.centeredTextContentNewLineSinPlan}>{ "\n" }</Text>
              <Text style={styles.centeredTextContentSinPlan}>Pasando ese periodo podrás verificar</Text>
              <Text style={styles.centeredTextContentSinPlan}>dando clic en el</Text>
              <Text style={styles.centeredTextContentSinPlan}>siguiente botón.</Text>
              

              <TouchableOpacity style={styles.btnVerify} onPress={verifyShowMealPlan}>
                <Text style={styles.textVerify}>VERIFICAR NUEVAMENTE</Text>
              </TouchableOpacity>
            </View>
          ) 
        }
        
        
      </ImageBackground>

      {
        showMealPlanElements && 
        <FloatingButton
          iconName="add"
          backgroundColor="#326807"
          recommendaciones={recomendaciones}
        />
      }
      
      {loading && <LoadingAnimation />}
    </SafeAreaView>
  );
};

export default MainMenuScreen;
