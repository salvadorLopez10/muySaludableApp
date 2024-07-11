import React, { useEffect, useState } from "react";
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
import { UserProps } from "./MainMenuScreen";

const MainMenuViewModel = (  ) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [selectedPrinter, setSelectedPrinter] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [urlRecetario, setUrlRecetario] = useState("");

  useEffect(() => {
    getUrlRecetario();
  }, []);

  const getUrlRecetario = async () => {
    await MuySaludableApi.get("/config/url_recetario")
      .then((response) => {
        console.log(JSON.stringify(response.data.data, null, 2));
        setUrlRecetario(response.data.data);
      })
      .catch((error) => {
        console.log("Error al obtener url para descargar recetaario");
        console.log(error);
      });
  };

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

  const generateHTML = (userName: string) => {
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
            .pageRecomendaciones {
              width: 100%;
              height: 100%;
              position: relative;
              background-image: url('https://i.ibb.co/9cCGD1S/imagen-Fondo-PDFPlan.jpg');
              background-size: cover;
              margin: 0;
              padding: 0;
              background-color: #ffffff;
              display: flex;
              justify-content: center;
            }
            .titleRecomendacion{
              font-size: 24px;
              font-weight: bold;
              text-decoration: underline;
            }
            .contentRecomendaciones {
              text-align: justify;
              font-size: 18px;
            }
            .centerImage {
              display: block;
              margin-left: auto;
              margin-right: auto;
              width: 50%;
            }
            .textMedidas{
              font-size: 18px;
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
              <p class="user-name-text">${userName}</p>
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
            <div class="pageRecomendaciones">
              <div class="contentRecomendaciones">
                  <p class="titleRecomendacion">Guía de medidas</p>
                  <p class="textMedidas">Registra tus medidas antes y después para un seguimiento efectivo de tu progreso. Aquí te mostramos cómo tomar las medidas</p>
                  <ul>
                      <li><b>BÍCEPS:</b> Coloca la cinta alrededor de la parte más ancha del brazo.</li>
                      <li><b>PECHO:</b> Mide alrededor de la parte más ancha del pecho.</li>
                      <li><b>CINTURA:</b> Pasa la cinta por encima del ombligo para medir la cintura.</li>
                      <li><b>CADERA:</b> Coloca la cinta sobre la parte más ancha de tus glúteos.</li>
                      <li><b>MUSLO:</b> Mide alrededor de la parte más ancha del muslo.</li>
                      <li><b>PANTORRILA:</b> CColoca la cinta alrededor de la parte más ancha de la pantorrilla..</li>
                  </ul>
                  <p class="titleRecomendacion">Fotos:</p>
                  <p class="textMedidas">Ahora toma tus fotos para tener tu antes y después de acuerdo a los encuadres que a continuación se muestran.</p>
                  <img src="https://i.ibb.co/mX1dcXC/guia-medidas.jpg" alt="Imagen" class="centerImage">
              </div>
            </div>
            <div class="pageRecomendaciones">
              <div class="contentRecomendaciones">
                  <p class="titleRecomendacion">Recomendaciones</p>
                  <ul>
                      <li>Es importante comer cada 4 horas para acelerar el metabolismo. Si no estás acostumbrado a este hábito, intenta reducir gradualmente el tiempo entre comidas.</li>
                      <li>Evita el ayuno prolongado para evitar la pérdida de masa muscular.</li>
                      <li>Varía tus fuentes de proteínas incluyendo algunas de estas opciones: pollo, carne, atún, salmón o veganas/vegetarianas como legumbres, tofu, tempeh, seitan, y quinoa.</li>
                      <li>Asegúrate de tomar al menos 2 litros de agua al día. Puedes añadir un poco de chía para aumentar la sensación de saciedad y obtener vitaminas y minerales adicionales. También puedes optar por agua de jamaica o limón sin azúcar o con un mínimo de edulcorante.</li>
                      <li>Si experimentas mucha hambre entre comidas, puedes comer libremente verduras verdes.</li>
                      <li>Evita el consumo de alcohol, alimentos fritos, alimentos con azúcares añadidos, harinas, embutidos, jugos de frutas y productos lácteos, excepto queso panela y requesón.</li>
                      <li>Combina tu plan alimenticio con ejercicio regular, ya que es un excelente complemento para alcanzar tus objetivos.</li>
                      <li>Para controlar la ansiedad por la falta de azúcar, puedes optar por chocolate con 80% de cacao o frutas como la manzana.</li>
                  </ul>
                  <img src="https://i.ibb.co/Q87W0VY/plato-del-bien-comer-sin-fondo.png" alt="Imagen" class="centerImage">
              </div>
            </div>
            <div class="pageFrase">
              <div class="contentFraseMain">
                <p class="titleFrase">${userName}</p>
                <p class="contentFrase">La constancia y la disciplina son clave para lograr grandes cambios.</p>
                <p class="contentFrase">Visualiza dónde quieres estar al finalizar tu plan, cada día que pasa te acerca más a tus objetivos</p>
                <p class="finalFrase">¡Has dado el primer paso para cuidar tu salud, felicidades!</p>
              </div>
          </div>
        </body>
        </html>
  `;

    return html;
  }


  const printToFile = async ( userInfo: UserProps | undefined ) => {
    //On iOS/android prints the given html. On web prints the HTML from the current page.
    setLoading(true);
    let userName = ( userInfo?.nombre ) ? userInfo.nombre : "Usuario";
    let html = generateHTML(userName);
    const { uri } = await Print.printToFileAsync({ html });
    setLoading(false);
    console.log("File has been saved to:", uri);
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
  };

  const selectPrinter = async () => {
    const printer = await Print.selectPrinterAsync(); // iOS only
    setSelectedPrinter(printer);
  };

  const clickLinkRecetario = async () =>{
    console.log("LINK A RECETARIO");
    setLoading(true);
    const file_name = "Recetario_Muy_Saludable.pdf";
    const result = await FileSystem.downloadAsync(
      urlRecetario,
      FileSystem.documentDirectory + file_name
    ).then((response) => {
        setLoading(false);
        console.log("DESPUÉS DE RECETARIO");
        console.log(JSON.stringify(response, null, 2));
        if( response.status !== 200 ){
          alert("Se ha producido un error al descargar recetario. Favor de intentarlo más tarde");
        }else{
          saveRecetario(response.uri);
        }

      }).catch((error) => {
        setLoading(false);
        console.log(JSON.stringify(error,null,2));
        alert("Se ha producido un error al descargar recetario, favor de intentar más tarde");
      });    

  }

  const saveRecetario = (uri: string) => {
    shareAsync(uri);
  }

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

  const showLoading = () => {
    setLoading(true);
  }

  const hideLoading = () => {
    setLoading(false);
  }

  return {
    ...values,
    selectedPrinter,
    loading,
    onChange,
    handleLogout,
    //onPressButtonPDF,
    selectPrinter,
    printToFile,
    clickLinkRecetario,
    showLoading,
    hideLoading
  };
};

export default MainMenuViewModel;
