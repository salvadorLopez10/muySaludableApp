import { useEffect,useState } from 'react';
import {
  SafeAreaView,Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { RoundedButton } from '../../components/RoundedButton';
import { MyColors } from '../../theme/AppTheme';
import { StackScreenProps } from '@react-navigation/stack';
import { MuySaludableApi } from '../../api/MuySaludableApi';

interface Props extends StackScreenProps<any,any>{};

interface Characteristic {
  id: number;
  title: string;
  price: number;
  resume: string;
  characteristics: string[];
}

interface Planes {
  id: number;
  nombre: string;
  resumen: string;
  descripcion_detallada: string;
  duracion_meses: string;
  precio: string;
  precio_regular: string;
  createdAt: string;
  updatedAt: string;
}

export const ChoosePlanScreen = ( {navigation}: Props ) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedView, setSelectedView] = useState<Planes | null>(null);
    const [planes, setPlanes] = useState<Planes[]>([]);


  const handleOpenModal = ( element: Planes ) => {
    setSelectedView(element);
    setModalVisible(true);
  }

  const handleCloseModal = () => {
    setModalVisible(false);
  }

  useEffect(() => {
    console.log("entra effect");
    getPlanes();
  }, []);

  const onNavigate = () =>{
    setModalVisible(false)
    navigation.navigate("ResumeChoosenPlanScreen", {selectedPlan: selectedView});
  }

  const getPlanes = async() => {
    try {

        const resp = await MuySaludableApi.get("/planesAlimenticios");

        //console.log( resp.data.elementos )
        setPlanes(resp.data.elementos);

    } catch (error) {
        console.log(error)
    }

  }


  const generarId = () => {
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36);

    return random + fecha;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../../assets/background_carrete_frutas.jpg")}
        style={styles.imageBackground}
      />
      {/* Título */}
      <View style={styles.tituloContainer}>
        <Text style={styles.tituloText}>ELIGE TU</Text>
        <Text style={styles.tituloText}>PLAN ALIMENTICIO</Text>
        <Text style={styles.contentTitulo}>Vive una vida más</Text>
        <Text style={styles.contentTitulo}>saludable</Text>
      </View>

      {/* Menú selección de planes */}
      <View style={styles.planContainerMain}>
        {/* Contenedores con descripción del plan */}
        {planes.map((element) => (
          <TouchableOpacity
            key={element.id}
            onPress={() => handleOpenModal(element)}
            style={styles.containerPlan}
          >
            <Text style={styles.titlePlanText}>{element.nombre}</Text>
            <Text style={styles.contentPlanText}>{element.resumen}</Text>
            <Text style={styles.pricePlan}>
              De{" "}
              <Text style={styles.priceStrike}>${element.precio_regular}</Text>{" "}
              a solo ${element.precio}
            </Text>
            <Text style={styles.textClic}>
              DA CLIC
            </Text>
          </TouchableOpacity>
        ))}

        {/* Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.closeIcon}
                onPress={handleCloseModal}
              >
                <Icon name="times" size={20} color="black" />
              </TouchableOpacity>

              {/* Sección de Título */}
              <View style={styles.modalSection}>
                <Text style={styles.title}>Resumen del plan</Text>
              </View>

              {/* Sección de Subtítulo */}
              <View style={styles.modalSection}>
                <Text style={styles.subtitle}>{selectedView?.nombre}</Text>
              </View>

              {/* Sección de características */}
              <View style={styles.modalSection}>
                <View style={styles.characteristicItem}>
                  <View style={styles.containerBullet}>
                    {selectedView?.descripcion_detallada
                      .split("\n")
                      .map((linea, index) => (
                        <View key={index} style={styles.itemContainer}>
                          <Text style={styles.bullet}>•</Text>
                          <Text style={styles.texto}>{linea}</Text>
                        </View>
                      ))}
                  </View>
                </View>
              </View>
              {/* Botón para seleccionar */}
              <View style={styles.modalSection}>
                <RoundedButton
                  text="Seleccionar"
                  // onPress={() => navigation.navigate("ResumeChoosenPlanScreen",{ selectedPlan: selectedView })}
                  onPress={onNavigate}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
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
  tituloContainer: {
    position: "absolute",
    alignSelf: "center",
    top: "5%",
  },
  tituloText: {
    color: "#326807",
    alignSelf: "center",
    fontSize: 24,
    //fontWeight: "bold",
    fontFamily: "Gotham-Ultra",
  },
  contentTitulo: {
    color: "#326807",
    top: 10,
    fontSize: 18,
    textAlign: "center",
    //fontWeight: "bold",
    fontFamily: "Gotham-Book",
  },
  planContainerMain: {
    flex: 1,
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    marginTop: "12%",
  },

  containerPlan: {
    width: "80%",
    //height: "15%",
    backgroundColor: "#faa029",
    borderRadius: 9,
    padding: 7,
    top: 5,
    marginVertical: 13,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    alignItems: "center",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  titlePlanText: {
    color: "white",
    //fontWeight: "bold",
    textAlign: "center",
    fontSize: 14,
    fontFamily: "Gotham-Ultra",
  },
  contentPlanText: {
    color: "white",
    textAlign: "center",
    fontSize: 13,
    fontFamily: "Gotham-Medium",
    top: 5,
  },
  pricePlan: {
    color: "#326807",
    fontSize: 16,
    //fontWeight: "bold",
    fontFamily: "Gotham-Ultra",
    textAlign: "center",
    top: 10,
    marginBottom: 7,
  },
  priceStrike: {
    color: "#326807",
    fontSize: 16,
    //fontWeight: "bold",
    fontFamily: "Gotham-Ultra",
    textAlign: "center",
    top: 10,
    marginBottom: 7,
    textDecorationLine: "line-through",
  },
  textClic: {
    color: "#FCFCBD",
    fontSize: 11,
    fontFamily: "Gotham-Medium",
    textAlign: "center",
    top: 10,
    marginBottom: 7,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo oscuro del modal
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: MyColors.backgroundViews,
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
  title: {
    color: "#55851F",
    fontSize: 24,
    //fontWeight: "bold",
    fontFamily: "Gotham-Ultra",
  },
  subtitle: {
    color: "#55851F",
    fontSize: 18,
    //fontStyle: "italic",
    fontFamily: "Gotham-BlackItalic",
  },
  characteristicItem: {
    marginBottom: 5,
  },
  containerBullet: {
    padding: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  bullet: {
    fontSize: 20,
    marginRight: 5,
  },
  texto: {
    color: "#55851F",
    fontSize: 15,
    fontFamily: "Gotham-Medium",
  },
});

