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

interface UserProps {
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
  const [planObj, setPlanObj] = useState({});
  //const [monthsArray, setMonthsArray] = useState([]);

  const monthsArray: Number[] = [];

  const { loading, onPressButtonPDF, printToFile, clickLinkRecetario } = useViewModel();

  const onPressPDF = async() => {
    console.log("CLICK");
  };

  // const requestPermission = async () => {
  //   console.log("REQUESTPERMISSION");
  //   const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  //   if (status !== "granted") {
  //     alert("Se requieren permisos para guardar el archivo.");
  //     return false;
  //   }
  //   return true;
  // };

  // const generatePDF = async () => {
  //   const htmlContent = `<h1>Mi PDF</h1><p>Este es el contenido de mi PDF.</p>`;

  //   // Opciones de impresión
  //   const options = {
  //     html: htmlContent,
  //   };

  //   // Generar el PDF
  //   const { uri } = await Print.printToFileAsync(options);
  //   return uri;
  // };

  // const savePDF = async (uri: any) => {
  //   const folder = `${FileSystem.documentDirectory}pdfs`;
  //   await FileSystem.makeDirectoryAsync(folder, { intermediates: true });
  //   const fileUri = `${folder}/archivo.pdf`;
  //   await FileSystem.moveAsync({
  //     from: uri,
  //     to: fileUri,
  //   });
  //   return fileUri;
  // };


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
  }, []);

  const getMealPlan = async () => {
    const body = {
    "duracion": "zurdo@mail.com",
    "tipo_dieta": "zurdo@mail.com",
    "alimentos_evitar": "zurdo@mail.com",
    "objetivo": "zurdo@mail.com",
    "tmb": "zurdo@mail.com"
    }
    const resp = await MuySaludableApi.post("usuarios/generatePlan",body)
      .then((response) => {
        setPlanObj(response.data.data);
      })
      .catch((error) => {
        console.log("Error al obtener plan");
        console.log(JSON.stringify(error, null, 2));
      });
  };

  const calculateContainerMonths = ( months: string ) => {
    const months_number = Number(months);

    for (let index = 0; index < months_number; index++) {
      monthsArray.push(index);
      
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

        {/* <TouchableOpacity style={styles.btnPDF} onPress={onPressButtonPDF}> */}
        <TouchableOpacity style={styles.btnPDF} onPress={printToFile}>
          <Text style={styles.textBtnPDF}>EXPORTAR PLAN COMO PDF</Text>
        </TouchableOpacity>
      </ImageBackground>
      {loading && <LoadingAnimation />}
    </SafeAreaView>
  );
};

export default MainMenuScreen;
