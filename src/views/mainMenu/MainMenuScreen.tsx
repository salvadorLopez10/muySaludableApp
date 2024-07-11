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
    const body = {
      "tipo_dieta": "Todo",
      "objetivo": "Ganar masa muscular",
      "tmb":"3500",
      "alimentos_evitar":[]
    };

    console.log("INFORMACIÓN USUARIO");
    console.log(JSON.stringify(userInfo));
    console.log("STRING URL: " + "/planNutricional/"+userInfo?.id);
    showLoading();
    const resp = await MuySaludableApi.get("/planNutricional/"+userInfo?.id)
      .then((response) => {
        console.log("EL PLAN OBTENIDO DESDE PLAN NUTRICIONAL BD");
        console.log(JSON.stringify( response.data.data, null, 2 ));
        setPlanObj(JSON.parse(response.data.data.contenido));
        hideLoading();
      })
      .catch((error) => {

        hideLoading();
        console.log("Error al obtener plan");
        console.log(JSON.stringify(error, null, 2));
      });
  };

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

  const handlePrintToFile = (argumento: UserProps| undefined) => {
    printToFile(argumento);
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

        {/* <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.containerScroll}
        >
          <AccordionItem title="Detox">
            <AccordionItem
              title="Desayuno"
              colorContainer="rgba(250, 160, 41, 0.6)"
            >
              <View style={styles.containerTextOpcionTitle}>
                <Text style={styles.textTitleOpcion}>Opción 1</Text>
              </View>
              <View style={styles.containerTextOpcionTitle}>
                <Text style={styles.textTitleComida}>Omelette Verde:</Text>
              </View>
              <View style={styles.ingredienteContainer}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.textoComida}>
                  {" "}
                  1 huevo entero y 2 claras de huevo revuelto con 1/2 Calabaza o
                  Espinacas de Espárragos, 1/4 de Aguacate y 2 tortillas de
                  nopal o 1 de maíz
                </Text>
              </View>
              <View style={styles.containerTextOpcionTitle}>
                <Text style={styles.textTitleOpcion}>Opción 2</Text>
              </View>
              <View style={styles.containerTextOpcionTitle}>
                <Text style={styles.textTitleComida}>Omelette Azul:</Text>
              </View>
              <View style={styles.ingredienteContainer}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.textoComida}>
                  {" "}
                  1 huevo entero y 2 claras de huevo revuelto con 1/2 Calabaza o
                  Espinacas de Espárragos, 1/4 de Aguacate y 2 tortillas de
                  nopal o 1 de maíz
                </Text>
              </View>
              <View style={styles.containerTextOpcionTitle}>
                <Text style={styles.textTitleOpcion}>Opción 3</Text>
              </View>
              <View style={styles.containerTextOpcionTitle}>
                <Text style={styles.textTitleComida}>Huevos al gusto:</Text>
              </View>
              <View style={styles.ingredienteContainer}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.textoComida}>
                  {" "}
                  1 huevo entero y 2 claras de huevo revuelto con 1/2 Calabaza o
                  Espinacas de Espárragos, 1/4 de Aguacate y 2 tortillas de
                  nopal o 1 de maíz
                </Text>
              </View>
            </AccordionItem>
            <AccordionItem
              title="Colación 1"
              colorContainer="rgba(250, 160, 41, 0.6)"
            ></AccordionItem>
            <AccordionItem
              title="Comida"
              colorContainer="rgba(250, 160, 41, 0.6)"
            ></AccordionItem>
            <AccordionItem
              title="Colación 2"
              colorContainer="rgba(250, 160, 41, 0.6)"
            ></AccordionItem>
            <AccordionItem
              title="Cena"
              colorContainer="rgba(250, 160, 41, 0.6)"
            ></AccordionItem>
          </AccordionItem>

          <AccordionItem title="Mes 1">
            <AccordionItem
              title="Desayuno"
              colorContainer="rgba(250, 160, 41, 0.6)"
            >
              <View style={styles.containerTextOpcionTitle}>
                <Text style={styles.textTitleOpcion}>Opción 1</Text>
              </View>
              <View style={styles.containerTextOpcionTitle}>
                <Text style={styles.textTitleComida}>Omelette Verde:</Text>
              </View>
              <View style={styles.ingredienteContainer}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.textoComida}>
                  {" "}
                  1 huevo entero y 2 claras de huevo revuelto con 1/2 Calabaza o
                  Espinacas de Espárragos, 1/4 de Aguacate y 2 tortillas de
                  nopal o 1 de maíz
                </Text>
              </View>
              <View style={styles.containerTextOpcionTitle}>
                <Text style={styles.textTitleOpcion}>Opción 2</Text>
              </View>
              <View style={styles.containerTextOpcionTitle}>
                <Text style={styles.textTitleComida}>Omelette Azul:</Text>
              </View>
              <View style={styles.ingredienteContainer}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.textoComida}>
                  {" "}
                  1 huevo entero y 2 claras de huevo revuelto con 1/2 Calabaza o
                  Espinacas de Espárragos, 1/4 de Aguacate y 2 tortillas de
                  nopal o 1 de maíz
                </Text>
              </View>
              <View style={styles.containerTextOpcionTitle}>
                <Text style={styles.textTitleOpcion}>Opción 3</Text>
              </View>
              <View style={styles.containerTextOpcionTitle}>
                <Text style={styles.textTitleComida}>Huevos al gusto:</Text>
              </View>
              <View style={styles.ingredienteContainer}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.textoComida}>
                  {" "}
                  1 huevo entero y 2 claras de huevo revuelto con 1/2 Calabaza o
                  Espinacas de Espárragos, 1/4 de Aguacate y 2 tortillas de
                  nopal o 1 de maíz
                </Text>
              </View>
            </AccordionItem>
            <AccordionItem
              title="Colación 1"
              colorContainer="rgba(250, 160, 41, 0.6)"
            ></AccordionItem>
            <AccordionItem
              title="Comida"
              colorContainer="rgba(250, 160, 41, 0.6)"
            ></AccordionItem>
            <AccordionItem
              title="Colación 2"
              colorContainer="rgba(250, 160, 41, 0.6)"
            ></AccordionItem>
            <AccordionItem
              title="Cena"
              colorContainer="rgba(250, 160, 41, 0.6)"
            ></AccordionItem>
          </AccordionItem>

          <AccordionItem title="Mes 2">
            <AccordionItem
              title="Desayuno"
              colorContainer="rgba(250, 160, 41, 0.6)"
            >
              <View style={styles.containerTextOpcionTitle}>
                <Text style={styles.textTitleOpcion}>Opción 1</Text>
              </View>
              <View style={styles.containerTextOpcionTitle}>
                <Text style={styles.textTitleComida}>Omelette Verde:</Text>
              </View>
              <View style={styles.ingredienteContainer}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.textoComida}>
                  {" "}
                  1 huevo entero y 2 claras de huevo revuelto con 1/2 Calabaza o
                  Espinacas de Espárragos, 1/4 de Aguacate y 2 tortillas de
                  nopal o 1 de maíz
                </Text>
              </View>
              <View style={styles.containerTextOpcionTitle}>
                <Text style={styles.textTitleOpcion}>Opción 2</Text>
              </View>
              <View style={styles.containerTextOpcionTitle}>
                <Text style={styles.textTitleComida}>Omelette Azul:</Text>
              </View>
              <View style={styles.ingredienteContainer}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.textoComida}>
                  {" "}
                  1 huevo entero y 2 claras de huevo revuelto con 1/2 Calabaza o
                  Espinacas de Espárragos, 1/4 de Aguacate y 2 tortillas de
                  nopal o 1 de maíz
                </Text>
              </View>
              <View style={styles.containerTextOpcionTitle}>
                <Text style={styles.textTitleOpcion}>Opción 3</Text>
              </View>
              <View style={styles.containerTextOpcionTitle}>
                <Text style={styles.textTitleComida}>Huevos al gusto:</Text>
              </View>
              <View style={styles.ingredienteContainer}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.textoComida}>
                  {" "}
                  1 huevo entero y 2 claras de huevo revuelto con 1/2 Calabaza o
                  Espinacas de Espárragos, 1/4 de Aguacate y 2 tortillas de
                  nopal o 1 de maíz
                </Text>
              </View>
            </AccordionItem>
            <AccordionItem
              title="Colación 1"
              colorContainer="rgba(250, 160, 41, 0.6)"
            ></AccordionItem>
            <AccordionItem
              title="Comida"
              colorContainer="rgba(250, 160, 41, 0.6)"
            ></AccordionItem>
            <AccordionItem
              title="Colación 2"
              colorContainer="rgba(250, 160, 41, 0.6)"
            ></AccordionItem>
            <AccordionItem
              title="Cena"
              colorContainer="rgba(250, 160, 41, 0.6)"
            ></AccordionItem>
          </AccordionItem>
        </ScrollView> */}

        <PlanView objPlan={planObj} />

        {/* Solo disponible para Paquete Premium */}
        <LinkRecetario />

        {/* <TouchableOpacity style={styles.btnPDF} onPress={printToFile}> */}
        <TouchableOpacity
          style={styles.btnPDF}
          onPress={() => handlePrintToFile(userStatePlan)}
        >
          <Text style={styles.textBtnPDF}>EXPORTAR PLAN COMO PDF</Text>
        </TouchableOpacity>
      </ImageBackground>
      {loading && <LoadingAnimation />}
    </SafeAreaView>
  );
};

export default MainMenuScreen;
