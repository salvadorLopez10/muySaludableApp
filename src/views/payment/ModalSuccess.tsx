import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import useViewModel from "./ViewModel";
import TextField from "../../components/TextField";

interface PropsModalSuccess {
  visible: boolean;
  password: string;
  confirmPassword: string;
  visibleIndicator: boolean;
  disableButton: boolean;
  handlePassword: (value:string) => void,
  handleConfirmPassword: (value:string) => void,
  onConfirmContinue: () => void;
}

const ModalSuccess = ({ visible, password, confirmPassword, visibleIndicator, disableButton, handlePassword, handleConfirmPassword, onConfirmContinue }: PropsModalSuccess) => {

  const [showPassword, setShowPassword] = useState(false); // Para el primer input
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Para el segundo input

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
            Registro generado correctamente
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
            {/* Input ingresar password */}
              <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.textInputStyle}
                    placeholderTextColor="#d1cccc"
                    placeholder="Ingresa contraseña"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={handlePassword}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeIconContainer}
                  >
                    <Icon
                      name={showPassword ? "eye-off-outline" : "eye-outline"}
                      size={20}
                      color="#7B7B7B"
                    />
                  </TouchableOpacity>
              </View>
              {/* Input confirmar password */}
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInputStyle}
                  placeholderTextColor="#d1cccc"
                  placeholder="Confirma contraseña"
                  secureTextEntry={!showConfirmPassword}
                  value={confirmPassword}
                  onChangeText={handleConfirmPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles.eyeIconContainer}
                >
                  <Icon
                    name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color="#7B7B7B"
                  />
                </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity onPress={onConfirmContinue} style={styles.confirmButton} disabled={disableButton}>
            <Text style={styles.closeButtonText}>Confirmar</Text>
            {visibleIndicator && <ActivityIndicator size="large" color="#ffffff" />}
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
    backgroundColor: "rgba(0,0,0,0.9)",
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
    width: 250,
    marginTop: 10,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  containerInputs: {
    width: 250,
    marginBottom: 20,
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
    flex: 1, // Ocupa todo el espacio disponible
  },
  inputContainer: {
    flexDirection: "row", // Permite colocar el ícono de ojo al lado del TextInput
    alignItems: "center",
    marginBottom: 10,
    //width: '100%', // Asegurar que ocupe todo el ancho
  },
  eyeIconContainer: {
    justifyContent: "center", // Centrar el icono verticalmente
    alignItems: "center",
    padding: 10,
  },
});

export default ModalSuccess;
