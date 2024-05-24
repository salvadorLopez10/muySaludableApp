import React, { useRef, useState } from "react";
import { View, Text, Button, StyleSheet, SafeAreaView, TouchableOpacity, Image, Modal } from "react-native";
import {
  Video,
  ResizeMode,
  AVPlaybackStatus,
  AVPlaybackStatusSuccess,
} from "expo-av";
import Icon from "react-native-vector-icons/FontAwesome";
import ExerciseModal from "./ExerciseModal";

interface PlanInfoProps {
  planName: null | string | undefined;
}

const PlanContent: React.FC<PlanInfoProps> = ({ planName }) => {

    const video = useRef<Video>(null);
    const [status, setStatus] = useState<AVPlaybackStatus>();
    const [statusButton, setStatusButton] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
      setModalVisible(true);
    };

    const closeModal = () => {
      setModalVisible(false);
    };

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
                return (
                    <View>
                        <View style={styles.containerTitle}>
                            <Text style={styles.textTitle}>RUTINA 1</Text>
                        </View>
                        <View style={styles.videoContainer}>
                            <Video
                            ref={video}
                            style={styles.video}
                            source={{
                                uri: "https://muysaludable.com.mx/VideoTest.mp4",
                                //uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
                            }}
                            posterSource={require("../../../assets/logoMuySaludable.png")}
                            useNativeControls
                            resizeMode={ResizeMode.CONTAIN}
                            onPlaybackStatusUpdate={(status) =>
                                setStatus(() => status)
                            }
                            />
                            {/* <View style={styles.buttons}>
                            <Button
                                title={statusButton ? "Pause" : "Play"}
                                onPress={() =>
                                statusButton
                                    ? video.current?.pauseAsync()
                                    : video.current?.playAsync()
                                }
                            />
                            </View> */}
                        </View>
                    </View>
                );
            default:
                
                return <Text style={styles.text}>Plan no reconocido</Text>;
        }
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

            {/* <Text style={styles.datosTitleText}>SELECCIONA EL NIVEL DE</Text>
            <Text style={styles.datosTitleText}>RUTINAS QUE DESEAS REALIZAR</Text> */}
          </View>
        </View>

        <TouchableOpacity
          style={styles.containerRuoutines}
          onPress={openModal}
        >
          <View style={styles.datosOptionsTitle}>
            <Text style={styles.datosOptionsText}>PRINCIPIANTE</Text>
            {/* <Text style={styles.datosTitleText}>{numberMonths}</Text> */}
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.containerRuoutines}>
          <View style={styles.datosOptionsTitle}>
            <Text style={styles.datosOptionsText}>INTERMEDIO</Text>
            {/* <Text style={styles.datosTitleText}>{numberMonths}</Text> */}
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.containerRuoutines}>
          <View style={styles.datosOptionsTitle}>
            <Text style={styles.datosOptionsText}>AVANZADO</Text>
            {/* <Text style={styles.datosTitleText}>{numberMonths}</Text> */}
          </View>
        </TouchableOpacity>

        <View style={styles.imageRoutines}>
          <Image
            source={require("../../../assets/imagen_rutinas.jpg")}
            style={{ width: 200, height: 200 }}
          />
        </View>

        {/* Modal */}
        <ExerciseModal visible={modalVisible} onClose={closeModal} />
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
    marginBottom: 10,
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
    marginBottom: 20,
  },
  imageRoutines: {
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
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
});

export default PlanContent;
