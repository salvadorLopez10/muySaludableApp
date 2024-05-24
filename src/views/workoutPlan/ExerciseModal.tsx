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
  onClose: () => void;
}

const ExerciseModal = ({ visible, onClose }: ExerciseModalProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
        <View style={styles.modalContainer}>
            
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
            
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>PRINCIPIANTE</Text>
                </View>

                <View style={styles.card}>
                    <Image
                    source={require("../../../assets/imagen_rutinas.jpg")}
                    style={styles.image}
                    />
                    <View style={styles.textContainer}>
                    <Text style={styles.title}>CARDIOVASCULAR</Text>
                    <Text style={styles.description}>
                        Mejora la resistencia cardiovascular, quema calorías y aumenta
                        la salud del corazón. Ideal para principiantes que desean
                        mejorar su estado físico general y nivel de energía.
                    </Text>
                    </View>
                </View>

                <View style={styles.card}>
                    <Image
                    source={require("../../../assets/imagen_rutinas.jpg")}
                    style={styles.image}
                    />
                    <View style={styles.textContainer}>
                    <Text style={styles.title}>FUERZA SUPERIOR E INFERIOR</Text>
                    <Text style={styles.description}>
                        Mejora la resistencia cardiovascular, quema calorías y aumenta
                        la salud del corazón. Ideal para principiantes que desean
                        mejorar su estado físico general y nivel de energía.
                    </Text>
                    </View>
                </View>

                <View style={styles.card}>
                    <Image
                    source={require("../../../assets/imagen_rutinas.jpg")}
                    style={styles.image}
                    />
                    <View style={styles.textContainer}>
                    <Text style={styles.title}>ABDOMEN</Text>
                    <Text style={styles.description}>
                        Mejora la resistencia cardiovascular, quema calorías y aumenta
                        la salud del corazón. Ideal para principiantes que desean
                        mejorar su estado físico general y nivel de energía.
                    </Text>
                    </View>
                </View>
            </ScrollView>

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
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 10,
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
    marginBottom: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
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
  },
});

export default ExerciseModal;
