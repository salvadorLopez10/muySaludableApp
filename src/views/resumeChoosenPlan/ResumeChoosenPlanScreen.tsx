import React from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'

export const ResumeChoosenPlanScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/BackGroundFresas.png")}
        style={styles.imageBackground}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageBackground: {
    width: "100%",
    height: "100%",
  },
});
