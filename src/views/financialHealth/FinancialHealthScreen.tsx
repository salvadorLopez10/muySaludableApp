import React, { useEffect, useState } from "react";
import { ImageBackground, SafeAreaView, ScrollView, Text, View } from "react-native";
import styles from "./Styles";
import { Image } from "react-native";
import SaludFinancieraComponent from "./SaludFinancieraComponent";
import { MuySaludableApi } from "../../api/MuySaludableApi";
export const FinancialHealthScreen = () => {
  const [contentFinancial, setContentFinancial] = useState("<title>SIN CONTENIDO</title>");

  useEffect(() => {

    getContentSaludFinanciera();
  }, [])
  
  const getContentSaludFinanciera = async () => {
    
      const resp = await MuySaludableApi.get("salud/salud_financiera").then((response)=>{
        setContentFinancial(response.data.data);

      }).catch( (error) => {
        console.log("Error contenido salud financiera");
        console.log(JSON.stringify(error,null,2));
      } );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../../../assets/SaludFinancieraBG.jpg")}
        style={styles.imageBackground}
      >
        <ScrollView>
        
          <SaludFinancieraComponent string={ contentFinancial } />
        
        </ScrollView>

      </ImageBackground>
    </SafeAreaView>
  );
};
