import { useEffect,useState } from 'react';
import {
  SafeAreaView,Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
  ScrollView,
  Dimensions
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { RoundedButton } from '../../components/RoundedButton';
import { MyColors } from '../../theme/AppTheme';
import { StackScreenProps } from '@react-navigation/stack';
import { MuySaludableApi } from '../../api/MuySaludableApi';
import { useAuthStore } from '../../store/auth/useAuthStore';

interface Props extends StackScreenProps<any,any>{};

const { height } = Dimensions.get("window");

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
    const [loading, setLoading] = useState(false);

    const userInfo = useAuthStore((state) => state.user);


  const handleOpenModal = ( element: Planes ) => {
    setSelectedView(element);
    setModalVisible(true);
  }

  const handleCloseModal = () => {
    setModalVisible(false);
  }

  useEffect(() => {
    //Cuando se tiene información en userInfo quiere decir que la pantalla se muestra a partir de una renovación
    //Cuando está vacío, la pantalla se está mostrando por primera vez
    if( userInfo ){
      Alert.alert(
        "Actualizar plan alimenticio",
        "El paquete contratado ha vencido.\n¡Te invitamos a renovarlo!",
        [
          {
            text: "Renovar paquete",
            onPress: () => console.log("RENOVAR PLAN"),
          },
        ],
        { cancelable: false }
      );
    }
    getPlanes();
  }, []);

  const onNavigate = () =>{
    setModalVisible(false)
    //navigation.navigate("ResumeChoosenPlanScreen", {selectedPlan: selectedView});
    Alert.alert(
      'Información',
      'Para conocer más detalles te invitamos a visitar nuestro sitio web:\nhttps://muysaludable.com.mx/planes'
    );
  }

  const getPlanes = async() => {
    try {
        setLoading(true);
        const resp = await MuySaludableApi.get("/planesAlimenticios")
        .then((responsePlanes:any) => {
          setPlanes(responsePlanes.data.elementos);
          setLoading(false);
        })
        .catch((error:any) =>{
          console.log(JSON.stringify( error,null,3 ));
          setLoading(false);
        });

        //console.log( resp.data.elementos )
        //setPlanes(resp.data.elementos);

    } catch (error) {
        console.log(error)
        setLoading(false);
    }

  }


  const generarId = () => {
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36);

    return random + fecha;
  };

  function LoadingAnimation() {
    return (
      <View style={styles.indicatorWrapper}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.indicatorText}>Cargando...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../../assets/background_carrete_frutas.jpg")}
        style={styles.imageBackground}
      />
      {/* Título */}
      <View style={styles.tituloContainer}>
        <Text style={styles.tituloText}>ELIGE ALGUNO DE</Text>
        <Text style={styles.tituloText}>LOS 4 PLANES</Text>
        <Text style={styles.contentTitulo}>Y vive una vida más</Text>
        <Text style={styles.contentTitulo}>saludable</Text>
      </View>

      {/* Menú selección de planes */}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
      {planes.map((element) => (
          <TouchableOpacity
            key={element.id}
            onPress={() => handleOpenModal(element)}
            style={styles.containerPlan}
          >
            <Text style={styles.titlePlanText}>{element.nombre}</Text>
            <Text style={styles.contentPlanText}>{element.resumen}</Text>
            {/* <View style={styles.priceContainer}>
              <Text style={styles.priceText}>De </Text>
              <View style={styles.strikeThroughContainer}>
                <Text style={styles.priceStrike}>${element.precio_regular}</Text>
                <View style={styles.strikeThroughLine} />
              </View>
              <Text style={styles.priceText}> a ${element.precio}</Text>
            </View> */}
            <View style={styles.containerClick}>
              <Text style={styles.textClic}>
                DA CLIC
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
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
                      .slice(0, -1)
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

      {loading && <LoadingAnimation />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  imageBackground: {
    width: "100%",
    height: height,
    position: 'absolute',
  },
  tituloContainer: {
    //position: "absolute",
    alignSelf: "center",
    //top: "5%",
    marginTop: 20,
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
    //backgroundColor: "blue",
    // flex: 1,
    // width: "80%",
  },

  containerPlan: {
    width: "90%",
    //height: "15%",
    //backgroundColor: "#faa029",
    borderRadius: 9,
    padding: 7,
    top: 5,
    borderColor: "#faa029",
    borderWidth: 2,
    marginVertical: 13,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    alignItems: "center",
    //shadowOpacity: 0.1,
    //shadowRadius: 3.84,
    //elevation: 5,
  },

  titlePlanText: {
    color: "#faa029",
    //fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Gotham-Ultra",
  },
  contentPlanText: {
    color: "#326807",
    textAlign: "center",
    fontSize: 14,
    fontFamily: "Gotham-Medium",
    top: 5,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 5,
  },
  priceText: {
    fontSize: 20,
    color: "#326807",
    fontFamily: "Gotham-Ultra",
  },
  strikeThroughContainer: {
    position: "relative",
  },
  priceStrike: {
    color: "#326807",
    fontSize: 20,
    fontFamily: "Gotham-Ultra",
    textDecorationLine: "line-through",
    textDecorationColor: "red", // No afecta el color de la línea en todos los dispositivos
  },
  strikeThroughLine: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 2, // Grosor de la línea
    backgroundColor: "#faa029", // Color de la línea
    top: "50%", // Coloca la línea en la mitad vertical del texto
  },
  containerClick: {
    borderRadius: 15,
    padding: 10,
    width: '50%',
    //top: 5,
    backgroundColor: "#faa029",
    marginVertical: 13,
    alignItems: "center",
    
  },
  textClic: {
    color: "#ffffff",
    fontSize: 11,
    fontFamily: "Gotham-Medium",
    textAlign: "center",
    //top: 10,
    //marginBottom: 7,
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
  indicatorWrapper: {
    flex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(100, 100, 100, 0.6)",
  },
  indicatorText: {
    fontSize: 18,
    marginTop: 12,
    color: "#ffffff",
    fontFamily: "Gotham-Medium",
  },
  scrollView: {
    flex: 1, // Ocupa el espacio restante debajo de título.
    marginTop: 20, // Ajustar según sea necesario.
    width: '100%', // Asegura que el ScrollView ocupe todo el ancho disponible.
    //height: '50%',
    paddingHorizontal: 20,
    marginBottom: '28%',
  },
  scrollViewContent: {
    justifyContent: "center",
    alignItems: "center",
    //paddingBottom: '25%', // Ajuste adicional para asegurar el contenido no toque el borde.
  },
  text: {
    fontSize: 42,
  },
});

