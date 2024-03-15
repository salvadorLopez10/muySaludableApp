import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";
import useViewModel from "./ViewModel";
import styles from "./Styles";
import { Image,View } from "react-native";
import { ImageBackground } from "react-native";

const MainMenuScreen = () => {


  return (
    <View style={styles.container}>
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
        <ScrollView style={styles.scroll}>
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
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default MainMenuScreen;
