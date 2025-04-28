import React, { useEffect, useRef, useState } from "react";
import { View, Text, Button, StyleSheet, SafeAreaView, TouchableOpacity, Image, Modal, Dimensions } from "react-native";
import {
  Video,
  ResizeMode,
  AVPlaybackStatus,
  AVPlaybackStatusSuccess,
} from "expo-av";
import Icon from "react-native-vector-icons/FontAwesome";
import ExerciseModal from "./ExerciseModal";
import VideoContent from "./VideoContent";
import Carousel from "react-native-snap-carousel";
import { CarouselField } from "../../components/CarouselField";
import { MuySaludableApi } from "../../api/MuySaludableApi";

interface PlanInfoProps {
  planName: null | string | undefined;
  //planName: "Paquete Clásico" | "Paquete Intermedio" | "Paquete Premium" | "Paquete Anual" | undefined;
}

interface ExerciseInterface{
  titulo: string;
  descripcion: string;
  video_url: string;
  nivel: string;
  dias: string;
  image_url: string;
}

const PlanContent: React.FC<PlanInfoProps> = ({ planName }) => {

    const video = useRef<Video>(null);
    const [status, setStatus] = useState<AVPlaybackStatus>();
    const [statusButton, setStatusButton] = useState(false);

    const [modalType, setModalType] = useState<'none' | 'exercise' | 'video' | 'disabled'>('none');
    const [exerciseModalVisible, setExerciseModalVisible] = useState(false);
    const [currentLevel, setCurrentLevel] = useState<'PRINCIPIANTE' | 'INTERMEDIO' | 'AVANZADO'>('PRINCIPIANTE');

    const [selectedVideoUri, setSelectedVideoUri] = useState<string | null>(null);
    const [selectedVideoTitle, setSelectedVideoTitle] = useState<string>("");
    const [selectedVideoDescription, setSelectedVideoDescription] = useState<string>('');

    const [disabledCardModalVisible, setDisabledCardModalVisible] = useState(false);

    const [carouselData, setCarouselData] = useState([]);
    const [loadingCarousel, setLoadingCarousel] = useState(true);
    const [allRutinas, setAllRutinas] = useState<ExerciseInterface[]>([]);
    
    // Cargar datos iniciales
    useEffect(() => {
      const fetchInitialData = async () => {
        try {
          // Cargar imágenes del carrusel
          const carouselResponse = await MuySaludableApi.get('/carousel/filter_tipo/Rutinas');
          setCarouselData(carouselResponse.data.records);
          
          // Cargar TODAS las rutinas una sola vez
          const rutinasResponse = await MuySaludableApi.get('/rutinas');
          setAllRutinas(rutinasResponse.data.recordsRutinas || []);
        } catch (error) {
          console.error('Error al cargar datos iniciales:', error);
        }
      };

      fetchInitialData();
    }, []);



    const openExerciseModal = (levelRoutine: 'PRINCIPIANTE' | 'INTERMEDIO' | 'AVANZADO') => {
      setModalType('exercise');
      setCurrentLevel(levelRoutine);
    };

    const closeModals = () => {
      setModalType('none');
      setSelectedVideoUri(null);
    };

    const closeExerciseModal = () => {
      setExerciseModalVisible(false);
      setSelectedVideoUri(null);
    };

    const handleCardPress = (videoUri: string, title: string, description: string, disabled: boolean) => {
      if (disabled) {
        setSelectedVideoUri(null); // Asegúrate de que el modal de video esté oculto
        setModalType('disabled'); // Muestra el nuevo modal
      } else {
        setSelectedVideoUri(videoUri);
        setSelectedVideoTitle(title);
        setSelectedVideoDescription(description);
        setModalType('video'); // Muestra el modal de video
      }
    };

    const handleVideoClose = () => {
      setModalType('none');
    };
  
    const handleDisabledCardModalClose = () => {
      setModalType('none');
    };
  
    //return <View>{renderContent()}</View>;

    return (
      <>
        <View style={styles.dataTitleContainer}>
          <View style={styles.datosInfoTitle}>
            <Text style={styles.datosTitleText}>RUTINAS</Text>
          </View>
        </View>

        <View style={styles.contentTitleContainer}>
          <View style={styles.contentInfoTitle}>
            <Text style={styles.contentTitleText}>
              SELECCIONA Y DA CLIC EN EL NIVEL
            </Text>
            <Text style={styles.contentTitleText}>
              {" "}
              DE RUTINAS QUE DESEAS REALIZAR
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.containerRuoutines}
          onPress={() => {
            openExerciseModal("PRINCIPIANTE");
          }}
        >
          <View style={styles.datosOptionsTitle}>
            <Text style={styles.datosOptionsText}>PRINCIPIANTE</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.containerRuoutines}
          onPress={() => {
            openExerciseModal("INTERMEDIO");
          }}
        >
          <View style={styles.datosOptionsTitle}>
            <Text style={styles.datosOptionsText}>INTERMEDIO</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.containerRuoutines}
          onPress={() => {
            openExerciseModal("AVANZADO");
          }}
        >
          <View style={styles.datosOptionsTitle}>
            <Text style={styles.datosOptionsText}>AVANZADO</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.carouselContainer}>
          {/* <Image
            source={require("../../../assets/imagen_rutinas.jpg")}
            style={{ width: 200, height: 200 }}
          />   */}

          <CarouselField images={ carouselData } />
          
        </View>

        {/* Modal */}
        <ExerciseModal
          // visible={exerciseModalVisible && !selectedVideoUri}
          visible={modalType === 'exercise'}
          level={currentLevel}
          planName={planName}
          onClose={closeModals}
          onCardPress={handleCardPress}
          allRutinas={allRutinas}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalType === 'video' && selectedVideoUri !== null}
          onRequestClose={handleVideoClose}
        >
          {selectedVideoUri && (
            <VideoContent
              videoUri={selectedVideoUri}
              description={selectedVideoDescription}
              title={selectedVideoTitle}
              onClose={handleVideoClose}
            />
          )}
        </Modal>

        {/* Nuevo modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalType === 'disabled'}
          onRequestClose={handleDisabledCardModalClose}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalText}>
                TU PLAN NO TIENE ACCESO A
              </Text>
              <Text style={styles.modalText}>
                ÉSTA RUTINA DE ENTRENAMIENTO.
              </Text>
              <Text style={styles.modalText}>
                SI QUIERES ACCEDER,
              </Text>
              <Text style={styles.modalText}>
                PODRÁS CONTRATAR
              </Text>
              <Text style={styles.modalText}>
                EL SIGUIENTE NIVEL.
              </Text>

              <Text style={styles.modalText}>
                {""}
              </Text>

              <Text style={styles.modalText}>
                CONTÁCTANOS VÍA WHATSAPP
              </Text>
              <Text style={styles.modalText}>
                55 6528 2789
              </Text>
              <TouchableOpacity onPress={handleDisabledCardModalClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    //alignItems: "center",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Gotham-Ultra",
  },
  video: {
    alignSelf: "center",
    width: 400,
    height: 400,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  containerTitle: {
    marginTop: "5%",
  },
  textTitle: {
    fontFamily: "Gotham-Medium",
    textAlign: "center",
    fontSize: 24,
  },
  videoContainer: {
    borderWidth: 1,
    borderColor: "#6BAA25",
  },
  dataTitleContainer: {
    width: "80%",
    alignItems: "center",
    marginTop: 20,
    //marginBottom: 10,
  },
  contentTitleContainer: {
    width: "90%",
    alignItems: "center",
    //marginTop: 20,
    marginBottom: 10,
  },
  datosInfoTitle: {
    width: "80%",
    alignItems: "center",
    backgroundColor: "#009144",
    //borderRadius: 10,
    padding: 10,
    top: 5,
    margin: 3,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 15,
  },
  datosOptionsTitle: {
    width: "80%",
    alignItems: "center",
    backgroundColor: "#faa029",
    //borderRadius: 10,
    padding: 10,
    top: 5,
    margin: 3,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 15,
  },
  contentInfoTitle: {
    width: "90%",
    alignItems: "center",
    //backgroundColor: "#faa029",
    //borderRadius: 10,
    padding: 10,
    //top: 5,
    margin: 3,
    //marginVertical: 5,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
    // borderRadius: 15,
  },
  datosTitleText: {
    fontSize: 16,
    fontFamily: "Gotham-Ultra",
    marginVertical: 5,
    color: "#ffffff",
  },
  datosOptionsText: {
    fontSize: 16,
    fontFamily: "Gotham-Ultra",
    marginVertical: 5,
    color: "#2E2A21",
  },
  contentTitleText: {
    fontSize: 14,
    fontFamily: "Gotham-Ultra",
    marginVertical: 5,
    color: "#000000",
  },
  containerRuoutines: {
    width: "100%",
    alignItems: "center",
    //marginTop: 20,
    marginBottom: 10,
  },
  imageRoutines: {
    marginTop: 10,
  },

  carouselContainer: {
    //marginTop: 20,
    //alignItems: "center",
    marginTop: 1,
    alignItems: "center",
  },

  modalContainer: {
    //flex: 1,
    height:"80%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 10,
  },
  modalContent: {
    width: "80%",
    padding: 20,
    //backgroundColor: ,
    borderRadius: 10,
    alignItems: "center",
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  modalSection: {
    marginBottom: 10,
  },
  header: {
    backgroundColor: "#FF7F00",
    paddingVertical: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  card: {
    flexDirection: "row",
    marginBottom: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
  textContainer: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
  },
  modalText: {
    fontSize: 14,
    fontFamily: "Gotham-Ultra",
    marginVertical: 5,
    color: "#ffffff",
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#FF7F00',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: "Gotham-Ultra"
  },
});

export default PlanContent;
