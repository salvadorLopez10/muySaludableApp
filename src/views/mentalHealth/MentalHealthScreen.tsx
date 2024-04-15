import React, { useEffect, useState } from "react";
import styles from "./Styles";
import { Image, ImageBackground, SafeAreaView, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import SaludMentalComponent from "./SaludMentalComponent";
import { MuySaludableApi } from "../../api/MuySaludableApi";

export const MentalHealthScreen = () => {

  const [contentMental, setContentMental] = useState("<title>SIN CONTENIDO</title>");

  useEffect(() => {
    getContentSaludMental();
  }, []);

  const getContentSaludMental = async () => {
    const resp = await MuySaludableApi.get("salud/salud_mental")
      .then((response) => {
        setContentMental(response.data.data);
      })
      .catch((error) => {
        console.log("Error contenido salud mental");
        console.log(JSON.stringify(error, null, 2));
      });
  };

  return (

    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../../../assets/SaludMentalBG.jpg")}
        style={styles.imageBackground}
      >
        <ScrollView>
        
          <SaludMentalComponent string={ contentMental } />
        
        </ScrollView>

      </ImageBackground>
    </SafeAreaView>
  );
};
