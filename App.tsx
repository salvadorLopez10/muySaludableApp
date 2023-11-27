import { useState } from 'react';
import { FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import { RoundedButton } from './src/components/RoundedButton';
import { MyColors } from './src/theme/AppTheme';

interface Characteristic {
  id: number;
  title: string;
  price: number;
  resume: string;
  characteristics: string[];
}

export default function App() {

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedView, setSelectedView] = useState<Characteristic | null>(null);


  const handleOpenModal = ( view: Characteristic ) => {
    setSelectedView(view);
    setModalVisible(true);
  }

  const handleCloseModal = () => {
    setModalVisible(false);
  }

  const generarId = () => {
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36);

    return random + fecha;
  };

  const plans: Characteristic[] = [
    { id: 1, title: 'CLÁSICO', price: 200.00, resume:"Resumen plan Clásico Lorem ipsum dolor sit amet consectetur,adipisicing elit. Vitae fuga ut dolorem?", characteristics: [ 'Característica 1', 'Característica 2', 'Característica 3'] },
    { id: 2, title: 'INTERMEDIO', price: 300.00, resume:"Resumen plan intermedio Resumen plan Clásico Lorem ipsum dolor sit amet consectetur,adipisicing elit. Vitae fuga ut dolorem?", characteristics: ['Característica 1', 'Característica 2', 'Característica 3'] },
    { id: 3, title: 'PREMIUM', price: 400.00, resume:"Resumen plan premium Resumen plan Clásico Lorem ipsum dolor sit amet consectetur,adipisicing elit. Vitae fuga ut dolorem?", characteristics: ['Característica 1', 'Característica 2', 'Característica 3'] },
  ];

  const renderItem = ({ item }: { item: string }) => (
    <View style={styles.characteristicItem}>
      <Text>{item}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Image
        source={require("./assets/BackgroundFrutas.png")}
        style={styles.imageBackground}
      />
      {/* Título */}
      <View style={styles.tituloContainer}>
        <Text style={styles.tituloText}>ELIGE TU PLAN NUTRICIONAL</Text>
        <Text style={styles.contentTitulo}>
          Cambia tus hábitos alimenticios y
        </Text>
        <Text style={styles.contentTitulo}>
          consigue el cuerpo de tus sueños
        </Text>
      </View>

      {/* Menú selección de planes */}
      <View style={styles.planContainerMain}>
        {/* Contenedores con descripción del plan */}
        {plans.map((view) => (
          <TouchableOpacity
            key={view.id}
            onPress={() => handleOpenModal(view)}
            style={styles.containerPlan}
          >
            <Text style={styles.titlePlanText}>{view.title}</Text>
            <Text style={styles.contentPlanText}>{view.resume}</Text>
            <Text style={styles.pricePlan}>${view.price}</Text>
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
                <Text style={styles.title}>Detalle del plan</Text>
              </View>

              {/* Sección de Subtítulo */}
              <View style={styles.modalSection}>
                <Text style={styles.subtitle}>{selectedView?.title}</Text>
              </View>

              {/* Sección de características */}
              <View style={styles.modalSection}>
                {selectedView?.characteristics.map((itemCharacteristic) => (
                  // Se establece "generarId" ya que ReactNative solicita un id único para cada elemento de una lista
                  <View key={generarId()} style={styles.characteristicItem}>
                    <Text>{itemCharacteristic}</Text>
                  </View>
                ))}
                {/* <FlatList
                  data={selectedView?.characteristics}
                  renderItem={renderItem}
                  keyExtractor={(item) => item}
                /> */}
              </View>
              {/* Botón para seleccionar */}
              <View style={styles.modalSection}>
                <RoundedButton 
                  text='Seleccionar'
                  onPress={ () => console.log("CLIIICK")}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
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
  tituloContainer: {
    position: "absolute",
    alignSelf: "center",
    top: "10%"
  },
  tituloText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  contentTitulo: {
    color: "white",
    top: 10,
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  planContainerMain: {
    flex: 1,
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    marginTop: 20,
  },
  containerPlan: {
    width: "80%",
    height: "auto",
    backgroundColor: "#fce948",
    borderRadius: 9,
    padding: 7,
    top: 5,
    marginVertical: 13,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  titlePlanText: {
    textAlign: "center",
    fontSize: 16,
  },
  contentPlanText: {
    textAlign: "justify",
    fontSize: 12,
    top: 5,
  },
  pricePlan: {
    fontSize: 16,
    fontWeight: "bold",
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
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    fontStyle: "italic",
  },
  characteristicItem: {
    marginBottom: 5,
  },
});
