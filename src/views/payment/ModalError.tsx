import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import useViewModel from './ViewModel';


interface PropsModalError {
    visible: boolean;
    onClose: () => void
};

const ModalError = ( { visible, onClose }: PropsModalError) => {

    return (
        <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
        >
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <View style={styles.closeIconContainer}>
                <Icon name="close-outline" size={25} color="red" />
            </View>
            <Text style={styles.modalTextTitle}>
                ERROR
            </Text>
            <Text style={styles.modalText}>
                Favor de verificar datos e intentar más tarde
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
            </View>
        </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    elevation: 5,
  },
  modalTextTitle: {
    marginTop: 10,
    textAlign: "center",
    fontFamily: "Gotham-Medium",
  },
  modalText: {
    marginTop: 10,
    marginBottom: 20,
    textAlign: "center",
  },
  closeIconContainer: {
    //backgroundColor: "rgba(255,0,0,0.6)",
    backgroundColor: "#FDE2E2",
    width: '70%',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  closeButton: {
    backgroundColor: "#E35B6A",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 100
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ModalError;
