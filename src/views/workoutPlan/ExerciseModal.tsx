import React, { useEffect, useState } from "react";
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
import { MuySaludableApi } from "../../api/MuySaludableApi";


interface ExerciseInterface{
  titulo: string;
  descripcion: string;
  video_url: string;
  nivel: string;
  dias: string;
  image_url: string;
}

interface ExerciseModalProps {
  visible: boolean;
  level: "PRINCIPIANTE" | "INTERMEDIO" | "AVANZADO";
  //planName: "Paquete Clásico" | "Paquete Intermedio" | "Paquete Premium" | "Paquete Anual";
  planName: null | string | undefined;
  onClose: () => void;
  //onCardPress: (videoUri: string, title: string, description: string) => void;
  onCardPress: (videoUri: string, title: string, description: string, disabled: boolean) => void;
  allRutinas: ExerciseInterface[]; 

}



const ExerciseModal = ({ visible, level , planName, onClose, onCardPress, allRutinas }: ExerciseModalProps) => {

  const [showDisabledModal, setShowDisabledModal] = useState(false);
  const [disabledModalContent, setDisabledModalContent] = useState('');
  const [modalVisible, setModalVisible] = useState(visible);

  const [rutinas, setRutinas] = useState<ExerciseInterface[]>([]);
  const [loading, setLoading] = useState(true);
  

    // const exercises = {
    //   PRINCIPIANTE: [
    //     {
    //       title: "CARDIOVASCULAR",
    //       description:"Mejora resistencia, quema calorías y salud del corazón. Ideal para aumentar energía.",
    //       image: require("../../../assets/imagen_rutinas.jpg"),
    //       dias:"LUNES, MIÉRCOLES Y VIERNES",
    //       videoUri: "https://muysaludable.com.mx/PrincipianteCardio.mp4",
    //     },
    //     {
    //       // title: "FUERZA\n(TREN INFERIOR Y SUPERIOR)",
    //       title: "FUERZA",
    //       description:"Fortalece los principales grupos musculares. Ideal para desarrollar fuerza y tono.",
    //       image: require("../../../assets/imagen_rutinas.jpg"),
    //       dias:"MARTES, JUEVES Y SÁBADO",
    //       videoUri: "https://muysaludable.com.mx/PrincipianteFuerza.mp4",
    //     },
    //     {
    //       title: "ABDOMEN",
    //       description:"Fortalece y tonifica el abdomen. Ideal para mejorar estabilidad del core y reducir grasa abdominal.",
    //       image: require("../../../assets/imagen_rutinas.jpg"),
    //       dias:"LUNES, MIÉRCOLES Y VIERNES",
    //       videoUri: "https://muysaludable.com.mx/PrincipianteAbdomen.mp4",
    //     },
    //   ],
    //   INTERMEDIO: [
    //     {
    //       title: "CARDIOVASCULAR",
    //       description:"Aumenta resistencia, quema de calorías y salud del corazón. Ideal para un reto mayor.",
    //       image: require("../../../assets/imagen_rutinas.jpg"),
    //       dias:"LUNES, MIÉRCOLES Y VIERNES",
    //       videoUri: "https://muysaludable.com.mx/IntermedioCardio.mp4",
    //     },
    //     {
    //       // title: "FUERZA\n(TREN INFERIOR Y SUPERIOR)",
    //       title: "FUERZA",
    //       description:"Desarrolla fuerza y tono muscular. Ideal para aumentar la intensidad.",
    //       image: require("../../../assets/imagen_rutinas.jpg"),
    //       dias:"MARTES, JUEVES Y SÁBADO",
    //       videoUri: "https://muysaludable.com.mx/IntermedioFuerza.mp4",
    //     },
    //     {
    //       title: "ABDOMEN",
    //       description:"Fortalece y tonifica el abdomen. Ideal para un mayor reto en el core.",
    //       image: require("../../../assets/imagen_rutinas.jpg"),
    //       dias:"LUNES, MIÉRCOLES Y VIERNES",
    //       videoUri: "https://muysaludable.com.mx/IntermedioAbdomen.mp4",
    //     },
    //   ],
    //   AVANZADO: [
    //     {
    //       title: "CARDIOVASCULAR",
    //       description:"Maximiza resistencia, capacidad aeróbica y anaeróbica, y quema de calorías. Ideal para desafíos intensos.",
    //       image: require("../../../assets/imagen_rutinas.jpg"),
    //       dias:"LUNES, MIÉRCOLES Y VIERNES",
    //       videoUri: "https://muysaludable.com.mx/AvanzadoCardio.mp4",
    //     },
    //     {
    //       // title: "FUERZA\n(TREN INFERIOR Y SUPERIOR)",
    //       title: "FUERZA",
    //       description:"Maximiza fuerza y tono muscular. Ideal para aumentar intensidad y complejidad.",
    //       image: require("../../../assets/imagen_rutinas.jpg"),
    //       dias:"MARTES, JUEVES Y SÁBADO",
    //       videoUri: "https://muysaludable.com.mx/AvanzadoFuerza.mp4",
    //     },
    //     {
    //       title: "ABDOMEN",
    //       description:"Maximiza fuerza y definición del abdomen. Ideal para ejercicios desafiantes.",
    //       image: require("../../../assets/imagen_rutinas.jpg"),
    //       dias:"LUNES, MIÉRCOLES Y VIERNES",
    //       videoUri: "https://muysaludable.com.mx/AvanzadoAbdomen.mp4",
    //     },
    //   ],
    // };

    const filteredRutinas = allRutinas.filter(rutina => rutina.nivel === level);

    const isSectionDisabled = (title: string) => {
      if (planName === "1. PLAN CLÁSICO") {
        return true;
      } else if (planName === "2. PLAN INTERMEDIO" && title !== "ABDOMEN") {
        return true;
      }
      return false;
    };

  return (
    <>
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

              { filteredRutinas.map((rutina, index) => {
                const disabled = isSectionDisabled(rutina.titulo);
                return (
                  <View
                    key={index}
                    style={[
                      styles.card,
                      disabled && styles.disabledCard,
                    ]}
                  >
                    <TouchableOpacity
                      disabled={false}
                      style={styles.touchableCard}
                      onPress={() => onCardPress(rutina.video_url, rutina.titulo, rutina.descripcion, disabled)}
                    >
                      <Text style={styles.fullWidthText}>{rutina.dias}</Text>
                      <View style={styles.separatorLine} />
                      <Image 
                        //source={{ uri: rutina.image_url }}
                        source={require("../../../assets/imagen_rutinas.jpg")}
                        defaultSource={require("../../../assets/imagen_rutinas.jpg")}
                        style={styles.image} />
                      {disabled && (
                        <View style={styles.overlay}>
                          <Text style={styles.overlayText}>
                            VIDEO NO DISPONIBLE EN TU SUSCRIPCIÓN
                          </Text>
                        </View>
                      )}
                      <View style={styles.textContainer}>
                        <Text style={styles.title}>{rutina.titulo}</Text>
                        <Text style={styles.description}>{rutina.descripcion}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
                })
              }
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Nuevo modal para mostrar el mensaje de video no disponible */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showDisabledModal}
        onRequestClose={() => setShowDisabledModal(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalMessage}>{disabledModalContent}</Text>
            <TouchableOpacity
              onPress={() => setShowDisabledModal(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
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
    padding: 10,
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
    flexWrap: "wrap",
  },
  fullWidthText: {
    width: "100%", // Asegura que el texto ocupe todo el ancho del touchableCard
    textAlign: "center", // Centra el texto horizontalmente
    fontSize: 13,
    marginBottom: 5, // Margen para separar el texto del resto del contenido
    fontFamily: "Gotham-Ultra", // Opcional: elige el estilo de fuente que desees
  },
  separatorLine: {
    width: "100%", // Abarca todo el ancho del touchableCard
    height: 1, // Altura de la línea delgada
    backgroundColor: "#ccc", // Color de la línea
    marginBottom: 10, // Margen para separar la línea del resto del contenido
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
    padding: 5,
    justifyContent: "center",
    alignItems: "center"
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
  modalMessage: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default ExerciseModal;
