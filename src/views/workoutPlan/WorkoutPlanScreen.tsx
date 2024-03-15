import React from "react";
import styles from "./Styles";
import { Text, View } from "react-native";
import { Image } from "react-native";

export const WorkoutPlanScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/WorkoutBG.jpg")}
        style={styles.imageBackground}
      />
    </View>
  );
};
