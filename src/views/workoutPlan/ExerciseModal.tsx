import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity,
  Button,
} from "react-native";

interface ExerciseModalProps {
  visible: boolean;
  level: "PRINCIPIANTE" | "INTERMEDIO" | "AVANZADO";
  //planName: "Paquete Clásico" | "Paquete Intermedio" | "Paquete Premium" | "Paquete Anual";
  planName: null | string | undefined;
  onClose: () => void;
  onCardPress: (videoUri: string, title: string, description: string) => void;
}

const ExerciseModal = ({ visible, level , planName, onClose, onCardPress }: ExerciseModalProps) => {

    const exercises = {
      PRINCIPIANTE: [
        {
          title: "CARDIOVASCULAR",
          description:"Mejora resistencia, quema calorías y salud del corazón. Ideal para aumentar energía.",
          image: require("../../../assets/imagen_rutinas.jpg"),
          videoUri: "https://muysaludable.com.mx/PrincipianteCardio.mp4",
        },
        {
          title: "FUERZA (TREN INFERIOR Y SUPERIOR)",
          description:"Fortalece los principales grupos musculares. Ideal para desarrollar fuerza y tono.",
          image: require("../../../assets/imagen_rutinas.jpg"),
          videoUri: "https://muysaludable.com.mx/PrincipianteFuerza.mp4",
        },
        {
          title: "ABDOMEN",
          description:"Fortalece y tonifica el abdomen. Ideal para mejorar estabilidad del core y reducir grasa abdominal.",
          image: require("../../../assets/imagen_rutinas.jpg"),
          videoUri: "https://muysaludable.com.mx/PrincipianteAbdomen.mp4",
        },
      ],
      INTERMEDIO: [
        {
            title: "CARDIOVASCULAR",
          description:"Aumenta resistencia, quema de calorías y salud del corazón. Ideal para un reto mayor.",
          image: require("../../../assets/imagen_rutinas.jpg"),
          videoUri: "https://muysaludable.com.mx/IntermedioCardio.mp4",
        },
        {
          title: "FUERZA (TREN INFERIOR Y SUPERIOR)",
          description:"Desarrolla fuerza y tono muscular. Ideal para aumentar la intensidad.",
          image: require("../../../assets/imagen_rutinas.jpg"),
          videoUri: "https://muysaludable.com.mx/IntermedioFuerza.mp4",
        },
        {
          title: "ABDOMEN",
          description:"Fortalece y tonifica el abdomen. Ideal para un mayor reto en el core.",
          image: require("../../../assets/imagen_rutinas.jpg"),
          videoUri: "https://muysaludable.com.mx/IntermedioAbdomen.mp4",
        },
      ],
      AVANZADO: [
        {
          title: "CARDIOVASCULAR",
          description:"Maximiza resistencia, capacidad aeróbica y anaeróbica, y quema de calorías. Ideal para desafíos intensos.",
          image: require("../../../assets/imagen_rutinas.jpg"),
          videoUri: "https://muysaludable.com.mx/AvanzadoCardio.mp4",
        },
        {
          title: "FUERZA (TREN INFERIOR Y SUPERIOR)",
          description:"Maximiza fuerza y tono muscular. Ideal para aumentar intensidad y complejidad.",
          image: require("../../../assets/imagen_rutinas.jpg"),
          videoUri: "https://muysaludable.com.mx/AvanzadoFuerza.mp4",
        },
        {
          title: "ABDOMEN",
          description:"Maximiza fuerza y definición del abdomen. Ideal para ejercicios desafiantes.",
          image: require("../../../assets/imagen_rutinas.jpg"),
          videoUri: "https://muysaludable.com.mx/AvanzadoAbdomen.mp4",
        },
      ],
    };


    const isSectionDisabled = (title: string) => {
      if (planName === "Paquete Clásico") {
        return true;
      } else if (planName === "Paquete Intermedio" && title !== "ABDOMEN") {
        return true;
      }
      return false;
    };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>

          <ScrollView style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.headerText}>{level}</Text>
            </View>

            {exercises[level].map((exercise, index) => (
              <View
                key={index}
                style={[
                  styles.card,
                  isSectionDisabled(exercise.title) && styles.disabledCard,
                ]}
              >
                {/* {isSectionDisabled(exercise.title) && (
                  <View style={styles.overlay} />
                )} */}
                <TouchableOpacity
                  disabled={isSectionDisabled(exercise.title)}
                  style={styles.touchableCard}
                  onPress={() =>
                    onCardPress(
                      exercise.videoUri,
                      exercise.title,
                      exercise.description
                    )
                  }
                >
                  <Image source={exercise.image} style={styles.image} />
                  {isSectionDisabled(exercise.title) && (
                    <View style={styles.overlay}>
                      <Text style={styles.overlayText}>
                        VIDEO NO DISPONIBLE EN TU SUSCRIPCIÓN
                      </Text>
                    </View>
                  )}

                  <View style={styles.textContainer}>
                    <Text style={styles.title}>{exercise.title}</Text>
                    <Text style={styles.description}>
                      {exercise.description}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 10,
    borderRadius: 10,
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 10,
    marginTop: 50,
  },
  closeButtonText: {
    color: "#FF7F00",
    fontSize: 16,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    //backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#faa029",
    paddingVertical: 10,
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
    width: "80%",
    borderRadius: 15,
  },
  headerText: {
    fontSize: 16,
    fontFamily: "Gotham-Ultra",
    marginVertical: 5,
    color: "#2E2A21",
  },
  card: {
    flexDirection: "row",
    padding: 15,
    marginBottom: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    position: "relative",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    zIndex: 1,
  },
  overlayText: {
    color: "#ffffff",
    fontSize: 14,
    //
    fontFamily: "Gotham-Ultra",
    textAlign: "center",
  },
  touchableCard: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    zIndex: 2,
  },
  disabledCard: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
  textContainer: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontFamily: "Gotham-Ultra",
    color: "#2E2A21",
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    fontFamily: "Gotham-Book",
    textAlign: "justify",
  },
});

export default ExerciseModal;
