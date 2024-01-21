import React from "react";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native";

const MainMenuScreen = () => {
  return <View style={styles.container}>
    <Text>HOLA</Text>
  </View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
export default MainMenuScreen;
