import React, { useEffect, useState } from "react";
import styles from "./Styles";
import { ActivityIndicator, ImageBackground, SafeAreaView, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import SaludMentalComponent from "./SaludMentalComponent";
import { MuySaludableApi } from "../../api/MuySaludableApi";

export const MentalHealthScreen = () => {

  const [contentMental, setContentMental] = useState("<title>SIN CONTENIDO</title>");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getContentSaludMental();
  }, []);

  const getContentSaludMental = async () => {
    setLoading(true);
    const resp = await MuySaludableApi.get("salud/salud_mental")
      .then((response) => {
        setContentMental(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log("Error contenido salud mental");
        console.log(JSON.stringify(error, null, 2));
      });
  };

  function LoadingAnimation() {
    return (
      <View style={styles.indicatorWrapper}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.indicatorText}>Cargando...</Text>
      </View>
    );
  }

  return (

    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../../../assets/SaludMentalBG.jpg")}
        style={styles.imageBackground}
      >
        <ScrollView>
        
          <SaludMentalComponent string={ contentMental } />
        
        </ScrollView>
        {loading && <LoadingAnimation />}
      </ImageBackground>
    </SafeAreaView>
  );
};
