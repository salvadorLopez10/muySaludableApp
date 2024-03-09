import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import useViewModel from "./ViewModel";
import TextField from "../../components/TextField";

interface PropsModalSuccess {
  visible: boolean;
  password: string;
  confirmPassword: string;
  handlePassword: (value:string) => void,
  handleConfirmPassword: (value:string) => void,
  onConfirmContinue: () => void;
}

const ModalSuccess = ({ visible, password, confirmPassword, handlePassword,handleConfirmPassword, onConfirmContinue }: PropsModalSuccess) => {


  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
    //   onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.iconContainer}>
            <Icon name="checkmark-outline" size={25} color="green" />
          </View>
          <Text style={styles.modalTextTitle}>Éxito</Text>
          <Text style={styles.modalText}>
            El pago se ha registrado correctamente
          </Text>
          <View>
            <Text style={styles.modalTextDescription}>
              Para continuar es necesario establecer una contraseña.
            </Text>
            <Text style={styles.modalTextDescription}>
              Favor de ingresarla a continuación
            </Text>
            <Text style={styles.modalTextDescription}>
              (Mínimo 8 caracteres)
            </Text>
          </View>

          <View style={styles.containerInputs}>
            <TextInput
              style={styles.textInputStyle}
              placeholderTextColor="#d1cccc"
              placeholder="Ingresa contraseña"
              secureTextEntry={true}
              value={password}
              onChangeText={handlePassword}
            />
            <TextInput
              style={styles.textInputStyle}
              placeholderTextColor="#d1cccc"
              placeholder="Confirma contraseña"
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={handleConfirmPassword}
            />
          </View>
          <TouchableOpacity onPress={onConfirmContinue} style={styles.confirmButton}>
            <Text style={styles.closeButtonText}>Confirmar</Text>
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
    fontFamily: "Gotham-Medium",
  },
  modalTextDescription: {
    fontFamily: "Gotham-Book",
    fontSize: 14,
    textAlign: "justify",
  },
  iconContainer: {
    backgroundColor: "#7DD6C0",
    width: "70%",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  confirmButton: {
    backgroundColor: "#63BFAB",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 200,
    marginTop: 10,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  containerInputs: {
    width: 200,
  },
  textInputStyle: {
    color: "#2A261B",
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#7B7B7B",
    // fontWeight: "bold",
    padding: 10,
    marginTop: 10,
    //width: "200%",
    textAlign: "center",
    fontFamily: "Gotham-Medium",
  },
});

export default ModalSuccess;
