import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface PlanInfoProps {
  planName: null | string | undefined;
}

const PlanContent: React.FC<PlanInfoProps> = ({ planName }) => {

  const renderContent = () => {
    switch (planName) {
      case "Paquete Clásico":
        return (
          <Text style={styles.text}>
            Esta sección no está disponible para{"\n"} PLAN BÁSICO
          </Text>
        );
      case "Paquete Intermedio":
        return <Text style={styles.text}>Tienes acceso a 1 rutina</Text>;
      case "Paquete Premium":
        return <Text style={styles.text}>Tienes acceso a 2 rutinas</Text>;
      default:
        return <Text style={styles.text}>Plan no reconocido</Text>;
    }
  };

  return <View>{renderContent()}</View>;
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //justifyContent: "center",
    //alignItems: "center",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Gotham-Ultra"
  },
});

export default PlanContent;
