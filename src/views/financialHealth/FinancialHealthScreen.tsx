import React from "react";
import { Text, View } from "react-native";
import styles from "./Styles";
import { Image } from "react-native";

export const FinancialHealthScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/SaludFinancieraBG.jpg")}
        style={styles.imageBackground}
      />
    </View>
  );
};
