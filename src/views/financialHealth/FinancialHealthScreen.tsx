import React, { useEffect, useState } from "react";
import { ActivityIndicator,ImageBackground, SafeAreaView, ScrollView, Text, View } from "react-native";
import styles from "./Styles";
import { Image } from "react-native";
import SaludFinancieraComponent from "./SaludFinancieraComponent";
import { MuySaludableApi } from "../../api/MuySaludableApi";


export const FinancialHealthScreen = () => {
  const [contentFinancial, setContentFinancial] = useState("<title>SIN CONTENIDO</title>");
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    getContentSaludFinanciera();
  }, [])
  
  const getContentSaludFinanciera = async () => {
    setLoading(true);
      const resp = await MuySaludableApi.get("salud/salud_financiera").then((response:any)=>{
        setContentFinancial(response.data.data);
        setLoading(false);

      }).catch( (error:any) => {
        setLoading(false);
        console.log("Error contenido salud financiera");
        console.log(JSON.stringify(error,null,2));
      } );
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
        source={require("../../../assets/SaludFinancieraBG.jpg")}
        style={styles.imageBackground}
      >
        <ScrollView>
        
          <SaludFinancieraComponent string={ contentFinancial } />
        
        </ScrollView>
        {loading && <LoadingAnimation />}
      </ImageBackground>
    </SafeAreaView>
  );
};
