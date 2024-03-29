import React, { PropsWithChildren, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, ScrollView, SafeAreaView, Button } from "react-native";
import useViewModel from "./ViewModel";
import styles from "./Styles";
import { Image,View } from "react-native";
import { ImageBackground } from "react-native";
import AccordionItem from "./AccordionItem";


const MainMenuScreen = () => {

  const onPressPDF = () =>{
    
    console.log("PRESS PDF");
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
            <Text style={styles.datosTitleText}>PLAN DETOX</Text>
          </View>
        </View>
        {/* <ScrollView style={styles.scroll}>
          <View style={styles.dataUserContainer}>
            <View style={styles.datosInfoBox}>
              <Text style={styles.datosInfoText}>DESAYUNO</Text>
            </View>
          </View>

          <View style={styles.dataUserContainer}>
            <View style={styles.datosInfoBox}>
              <Text style={styles.datosInfoText}>COLACIÓN 1</Text>
            </View>
          </View>

          <View style={styles.dataUserContainer}>
            <View style={styles.datosInfoBox}>
              <Text style={styles.datosInfoText}>COMIDA</Text>
            </View>
          </View>

          <View style={styles.dataUserContainer}>
            <View style={styles.datosInfoBox}>
              <Text style={styles.datosInfoText}>COLACIÓN 2</Text>
            </View>
          </View>

          <View style={styles.dataUserContainer}>
            <View style={styles.datosInfoBox}>
              <Text style={styles.datosInfoText}>CENA</Text>
            </View>
          </View>
        </ScrollView> */}
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.containerScroll}
        >
          <AccordionItem title="Desayuno">
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
                Espinacas de Espárragos, 1/4 de Aguacate y 2 tortillas de nopal
                o 1 de maíz
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
                Espinacas de Espárragos, 1/4 de Aguacate y 2 tortillas de nopal
                o 1 de maíz
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
                Espinacas de Espárragos, 1/4 de Aguacate y 2 tortillas de nopal
                o 1 de maíz
              </Text>
            </View>
          </AccordionItem>
          <AccordionItem title="Colación 1">
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
                Espinacas de Espárragos, 1/4 de Aguacate y 2 tortillas de nopal
                o 1 de maíz
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
                Espinacas de Espárragos, 1/4 de Aguacate y 2 tortillas de nopal
                o 1 de maíz
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
                Espinacas de Espárragos, 1/4 de Aguacate y 2 tortillas de nopal
                o 1 de maíz
              </Text>
            </View>
          </AccordionItem>
          <AccordionItem title="Comida">
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
                Espinacas de Espárragos, 1/4 de Aguacate y 2 tortillas de nopal
                o 1 de maíz
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
                Espinacas de Espárragos, 1/4 de Aguacate y 2 tortillas de nopal
                o 1 de maíz
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
                Espinacas de Espárragos, 1/4 de Aguacate y 2 tortillas de nopal
                o 1 de maíz
              </Text>
            </View>
          </AccordionItem>
          <AccordionItem title="Colación 2">
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
                Espinacas de Espárragos, 1/4 de Aguacate y 2 tortillas de nopal
                o 1 de maíz
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
                Espinacas de Espárragos, 1/4 de Aguacate y 2 tortillas de nopal
                o 1 de maíz
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
                Espinacas de Espárragos, 1/4 de Aguacate y 2 tortillas de nopal
                o 1 de maíz
              </Text>
            </View>
          </AccordionItem>
          <AccordionItem title="Cena">
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
                Espinacas de Espárragos, 1/4 de Aguacate y 2 tortillas de nopal
                o 1 de maíz
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
                Espinacas de Espárragos, 1/4 de Aguacate y 2 tortillas de nopal
                o 1 de maíz
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
                Espinacas de Espárragos, 1/4 de Aguacate y 2 tortillas de nopal
                o 1 de maíz
              </Text>
            </View>
          </AccordionItem>
        </ScrollView>
        <TouchableOpacity style={styles.btnPDF} onPress={onPressPDF}>
          <Text style={styles.textBtnPDF}>EXPORTAR PLAN COMO PDF</Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default MainMenuScreen;
