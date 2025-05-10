import React, { useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from "react-native-vector-icons/FontAwesome";
import { MyColors } from '../theme/AppTheme';
import { Recomendacion } from '../views/mainMenu/MainMenuScreen';

type FloatingButtonModalProps = {
  iconName?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  backgroundColor?: string;
  recommendaciones?: Recomendacion[];
};

const FloatingButton: React.FC<FloatingButtonModalProps> = ({
  iconName = 'add',
  iconColor = 'white',
  backgroundColor = '#4CAF50',
  recommendaciones = [],
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (
    <>
      {/* Botón flotante */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor }]}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name={iconName} size={28} color={iconColor} />
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.closeIcon}
                onPress={handleModalClose}
              >
                <Icon name="times" size={20} color="#55851F" />
              </TouchableOpacity>

              <ScrollView contentContainerStyle={styles.scrollContent}>

                <View style={styles.modalSection}>
                  <Text style={styles.subtitle}>Recomendaciones</Text>
                </View>

                {
                  recommendaciones.length === 0 && (
                    <View style={styles.modalSectionNoRecomendaciones}>
                      <Text style={styles.texto}>No hay recomendaciones</Text>
                      <Text style={styles.texto}>disponibles.</Text>
                    </View>
                  )
                }

                {recommendaciones.map((recomendacion, index) => (
                  
                  <View key={index} >
                    <View style={styles.modalSection}>
                      <Text style={styles.textoTitle}>{recomendacion.titulo}</Text>
                    </View>

                    <View style={styles.itemContainer}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.texto}>{recomendacion.descripcion}</Text>
                    </View>
                    {
                      recomendacion.image_url && (
                        <View style={styles.modalSection}>
                          <Image
                            source={ {uri: recomendacion.image_url} }
                            style={styles.image}
                          />
                        </View>

                      )
                    }
                  </View>
                ))}

                
              </ScrollView>

              
            </View>
        </View>
        
      </Modal>
    </>
  );
};

export default FloatingButton;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: '10%',
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo oscuro del modal
    },
  modalContent: {
    width: "80%",
    height: "50%",
    padding: 20,
    backgroundColor: MyColors.backgroundViews,
    borderRadius: 10,
    alignItems: "center",
  },
  scrollContent: {
    paddingBottom: 20,
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  modalSection: {
    margin: 10,
    alignItems:"center",
  },
  modalSectionNoRecomendaciones: {
    margin: 10,
    top: 30,
    alignItems:"center",
  },
  subtitle: {
    color: "#55851F",
    fontSize: 18,
    fontFamily: "Gotham-Ultra",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  bullet: {
    color: "#55851F",
    fontSize: 20,
    marginRight: 5,
  },
  texto: {
    color: "#55851F",
    fontSize: 15,
    fontFamily: "Gotham-Medium",
  },
  textoTitle: {
    color: "#55851F",
    fontSize: 17,
    fontFamily: "Gotham-BlackItalic",
  },
  modalCloseButton: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 20
  },
});
