import React from "react";
import styles from "./Styles";
import { Image, Text, View } from "react-native";

export const MentalHealthScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/SaludMentalBG.jpg")}
        style={styles.imageBackground}
      />
    </View>
  );
};
