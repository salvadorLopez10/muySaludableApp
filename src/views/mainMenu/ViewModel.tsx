import React, { useState } from "react";
import { MuySaludableApi } from "../../api/MuySaludableApi";
import { Alert, Linking } from "react-native";
import {
  useNavigation,
  NavigationProp,
  CommonActions,
} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootStackParams } from "../../navigator/StackNavigator";
import { useAuthStore } from "../../store/auth/useAuthStore";

import * as Permissions from "expo-permissions";
import * as Print from "expo-print";
import * as FileSystem from 'expo-file-system';

import { shareAsync } from "expo-sharing";

const MainMenuViewModel = (  ) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [selectedPrinter, setSelectedPrinter] = useState<any>();
  const [loading, setLoading] = useState(false);

  const onChange = (property: string, value: any) => {
    setValues({ ...values, [property]: value });
  };

  const handleLogout = async () => {
    console.log("CERRANDO SESSIÓN");

    await AsyncStorage.removeItem("user");

    useAuthStore.setState({status:"unauthenticated"});
    useAuthStore.setState({user:undefined});


    // navigation.dispatch(
    //   CommonActions.reset({
    //     index: 1,
    //     routes: [{ name: "LoginScreen" }],
    //   })
    // );
    //navigation.navigate();
  };

  const html = `
      <html>
     <head>
        <style>
          .page {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: row;
          }
          .halfImage {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background-image: url('https://i.ibb.co/NVHzjW2/imagen-PDF-Portada.jpg');
            background-size: cover;
            background-position: center;
          }
          .halfTitle {
            width: 80%;
            height: 100%;
            background-color: lightblue;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          .text {
            font-size: 24px;
            color: white;
            text-align: center;
          }
          .left {
            height: 100%;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          .logo {
            height: 200px;
            margin-left: 40%;
            margin-top: 30%;

          }
          .text-container {
            margin-left: 30;
            background-color: #b57828;
            padding: 5px;
            margin-bottom: 10px;
            align-items: center;
          }
          .big-text {
            margin-left: 30;
            font-size: 48px;
            color: #F9A02A;
          }
          .user-name-text {
            margin-left: 30;
            font-size: 24px;
            color: #F9A02A;
            text-align: center;
          }
          .pageMeal {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            background-image: url('https://i.ibb.co/9cCGD1S/imagen-Fondo-PDFPlan.jpg'); /* URL de la imagen de fondo */
            background-size: cover;
            display: flex;
            flex-direction: row;
            justify-content: space-between; /* Espacio entre columnas */
          }
          .column {
            width: calc(20% - 7px); /* 20% de ancho menos 5px de margen */
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            border: 2px solid black; /* Borde de 2px sólido negro */
            z-index: 1; /* Establecer el z-index */
          }
          .titleColumn {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 20px; /* Espacio entre título y columnas */
            z-index: 2; /* Ajustar el z-index del título */
            background-color: #F8911E; /* Fondo blanco para el título */
            padding: 5px; /* Añadir un poco de espacio alrededor del título */
          }
          .content {
            font-size: 18px;
            text-align: center;
          }
          .detailContent{
            font-size: 12px;
            text-align: center;
            margin:10;
          }
          .pageFrase {
            width: 100%;
            height: 100%;
            position: relative;
            background-image: url('https://i.ibb.co/7SqKswy/img-Fondo-PDF.jpg');
            background-size: cover;
            margin: 0;
            padding: 0;
            background-color: #ffffff;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          .contentFraseMain {
            text-align: center;
            color: white;
            font-size: 18px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
          .titleFrase{
            font-size: 36px;
            font-weight: bold;
          }
          .contentFrase{
             font-size: 24px;
          }
          .finalFrase{
              font-size: 30px;
          }

        </style>
      </head>
      
      <body>
        <div class="page">
          <div class="left">
            <img src="https://i.ibb.co/KsrVQqG/logo-Muy-Saludable-PDF.png" alt="logo" class="logo" />
            <div class="text-container">
              <p class="text">MUY SALUDABLE</p>
            </div>
            <p class="big-text">PLAN DE</p>
            <p class="big-text">ALIMENTACIÓN</p>
            <p class="user-name-text">{Nombre usuario}</p>
          </div>
          <div class="halfImage"></div>  
        </div>
        <div class="pageMeal">
              <div class="column">
                  <p class="titleColumn">Desayuno</p>
                  <p class="content">Opción Desayuno 1</p>
                  <p class="detailContent">1 huevo entero y 2 claras de huevo revuelto. 1/2 Calabaza o Espinacas o Espárragos. 1/4 de Aguacate.
                  2 tortillas de nopal o 1 de maíz
                  </p>
                  <p class="content">Opción Desayuno 2</p>
                  <p class="detailContent">1 huevo entero y 2 claras de huevo revuelto. 1/2 Calabaza o Espinacas o Espárragos. 1/4 de Aguacate.
                  2 tortillas de nopal o 1 de maíz
                  </p>
                  <p class="content">Opción Desayuno 3</p>
                  <p class="detailContent">1 huevo entero y 2 claras de huevo revuelto. 1/2 Calabaza o Espinacas o Espárragos. 1/4 de Aguacate.
                  2 tortillas de nopal o 1 de maíz
                  </p>
                  <p class="content">Opción Desayuno 4</p>
                  <p class="detailContent">1 huevo entero y 2 claras de huevo revuelto. 1/2 Calabaza o Espinacas o Espárragos. 1/4 de Aguacate.
                  2 tortillas de nopal o 1 de maíz
                  </p>
            </div>
            <div class="column">
              <p class="titleColumn">Colación 1</p>
              <p class="content">Opción Colación 1</p>
              <p class="detailContent">1 huevo entero y 2 claras de huevo revuelto. 1/2 Calabaza o Espinacas o Espárragos. 1/4 de Aguacate.
                  2 tortillas de nopal o 1 de maíz
                  </p>
              <p class="content">Opción Colación 2</p>
              <p class="detailContent">1 huevo entero y 2 claras de huevo revuelto. 1/2 Calabaza o Espinacas o Espárragos. 1/4 de Aguacate.
                  2 tortillas de nopal o 1 de maíz
                  </p>
              <p class="content">Opción Colación 3</p>
              <p class="detailContent">1 huevo entero y 2 claras de huevo revuelto. 1/2 Calabaza o Espinacas o Espárragos. 1/4 de Aguacate.
                  2 tortillas de nopal o 1 de maíz
                  </p>
              <p class="content">Opción Colación 4</p>
              <p class="detailContent">1 huevo entero y 2 claras de huevo revuelto. 1/2 Calabaza o Espinacas o Espárragos. 1/4 de Aguacate.
                  2 tortillas de nopal o 1 de maíz
                  </p>
            </div>
            <div class="column">
              <p class="titleColumn">Comida</p>
              <p class="content">Opción Comida 1</p>
              <p class="content">Opción Comida 2</p>
              <p class="content">Opción Comida 3</p>
              <p class="content">Opción Comida 4</p>
            </div>
            <div class="column">
              <p class="titleColumn">Colación 2</p>
              <p class="content">Opción Colación 1</p>
              <p class="content">Opción Colación 2</p>
              <p class="content">Opción Colación 3</p>
              <p class="content">Opción Colación 4</p>
            </div>
            <div class="column">
              <p class="titleColumn">Cena</p>
              <p class="content">Opción Cena 1</p>
              <p class="content">Opción Cena 2</p>
              <p class="content">Opción Cena 3</p>
              <p class="content">Opción Cena 4</p>
            </div>
          </div>
          <div class="pageFrase">
            <div class="contentFraseMain">
              <p class="titleFrase">SALVADOR LOPEZ</p>
              <p class="contentFrase">La disciplina es parte fundamental para lograr tus resultados.</p>
              <p class="contentFrase">No pienses en la meta larga, ve día a día y poco a poco verás resultados</p>
              <p class="finalFrase">CONFÍA EN TI, QUE TODO ES POSIBLE SI LO HACES CON LA MENTE Y EL CORAZÓN</p>
            </div>
        </div>
      </body>
      </html>
`;

  const onPressButtonPDF = async () => {
    console.log("PRESS PDF DESDE VIEW MODEL");

    await Print.printAsync({
      html,
      printerUrl: selectedPrinter?.url, // iOS only
    });
    // const hasPermission = await requestPermission();
    // if (!hasPermission) return;

    // const pdfUri = await generatePDF();
    // const fileUri = await savePDF(pdfUri);

    // // Abrir la ventana del navegador para descargar el PDF
    // Linking.openURL(fileUri);
  };

  const printToFile = async () => {
    //On iOS/android prints the given html. On web prints the HTML from the current page.
    setLoading(true);
    const { uri } = await Print.printToFileAsync({ html });
    setLoading(false);
    console.log("File has been saved to:", uri);
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });

  };

  const selectPrinter = async () => {
    const printer = await Print.selectPrinterAsync(); // iOS only
    setSelectedPrinter(printer);
  };


  // const requestPermission = async () =>{
  //   console.log("REQUESTPERMISSION");
  //   const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  //   if (status !== "granted") {
  //     alert("Se requieren permisos para guardar el archivo.");
  //     return false;
  //   }
  //   return true;

  // }

  // const generatePDF = async () => {
  //   const htmlContent = `<h1>Mi PDF</h1><p>Este es el contenido de mi PDF.</p>`;

  //   // Opciones de impresión
  //   const options = {
  //     html: htmlContent,
  //   };

  //   // Generar el PDF
  //   const { uri } = await Print.printToFileAsync(options);
  //   return uri;
  // }

  // const savePDF = async(uri:any) => {
  //   const folder = `${FileSystem.documentDirectory}pdfs`;
  //   await FileSystem.makeDirectoryAsync(folder, { intermediates: true });
  //   const fileUri = `${folder}/archivo.pdf`;
  //   await FileSystem.moveAsync({
  //     from: uri,
  //     to: fileUri,
  //   });
  //   return fileUri;
  // }

  return {
    ...values,
    selectedPrinter,
    loading,
    onChange,
    handleLogout,
    onPressButtonPDF,
    selectPrinter,
    printToFile
  };
};

export default MainMenuViewModel;
