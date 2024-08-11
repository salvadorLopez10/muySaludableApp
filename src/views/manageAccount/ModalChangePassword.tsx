import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { MuySaludableApi } from "../../api/MuySaludableApi";

interface PropsModal {
  visible: boolean;
  onCloseModal: () => void;
}

const ModalChangePassword = ({visible, onCloseModal}:PropsModal) => {

    const [newPassword, setNewPassword] = useState("");
    const [idUsuario, setIdUsuario] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [visibleIndicator, setVisibleIndicator] = useState(false);

    useEffect(() => {
      const fetchDataUser = async () => {
        const user = await useAuthStore.getState().user;
        if (user) {
          //console.log(user);
          setIdUsuario(user.id.toString());
        }
      };
      fetchDataUser();
    }, []);
    
    const setIndicator = () => {
      setVisibleIndicator(!visibleIndicator);
    };

    const onConfirmChangePassword = async () => {
        console.log(idUsuario)
      if (newPassword.trim().length < 8) {
        Alert.alert("Error", "La nueva contraseña debe tener al menos 8 caracteres");
        return;
      }

      if (confirmPassword.trim().length == 0) {
        Alert.alert("Error", "Por favor confirma la nueva contraseña");
        return;
      }

      if (newPassword.trim() !== confirmPassword.trim()) {
        Alert.alert(
          "Error",
          "Las contraseñas no coinciden, favor de verificar"
        );
        return;
      }

      const bodyUpdatePass = {
        password: newPassword,
      };
      console.log("URL ACTUALIZAR PASSWORD");
      console.log(`/usuarios/${idUsuario}`);
      setIndicator();

      const actualizaPassword = await MuySaludableApi.put(
        `/usuarios/${idUsuario}`,
        bodyUpdatePass
      )
        .then((responsePassword:any) => {
          setIndicator();
          

          Alert.alert(
            "La contraseña se actualizó correctamente",
            "Por favor guarda tu contraseña, la necesitarás para acceder a tu información.\n",
            [
              {
                text: "Continuar",
                onPress: () =>
                  onCloseModal()
              },
            ],
            { cancelable: false }
          );
        })
        .catch((errorNewPassword:any) => {
          setIndicator();
          
          console.log(
            "Mensaje de error en actualización de password: ",
            errorNewPassword.response.data.message
          );
        });
    };

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onCloseModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.closeIcon} onPress={onCloseModal}>
              <Icon name="close-outline" size={20} color="black" />
            </TouchableOpacity>
            <View style={styles.iconContainer}>
              <Icon name="alert-outline" size={25} color="#ffffff" />
            </View>
            <Text style={styles.modalTextTitle}>Cambio de contraseña</Text>

            <View>
              <Text style={styles.modalTextDescription}>
                Ingresa la nueva contraseña y su confirmación
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
                autoCapitalize={"none"}
                secureTextEntry={true}
                value={newPassword}
                onChangeText={(text: string) => setNewPassword(text)}
              />
              <TextInput
                style={styles.textInputStyle}
                placeholderTextColor="#d1cccc"
                placeholder="Confirma contraseña"
                autoCapitalize={"none"}
                secureTextEntry={true}
                value={confirmPassword}
                onChangeText={(text: string) => setConfirmPassword(text)}
              />
            </View>
            <TouchableOpacity
              onPress={onConfirmChangePassword}
              style={styles.confirmButton}
              //disabled={disableButton}
            >
              <Text style={styles.closeButtonText}>Confirmar</Text>
              {visibleIndicator && (
                <ActivityIndicator size="large" color="#ffffff" />
              )}
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
    textAlign: "center",
  },
  iconContainer: {
    backgroundColor: "#faa029",
    width: "70%",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  confirmButton: {
    backgroundColor: "#faa029",
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
  closeIconContainer: {
    //backgroundColor: "rgba(255,0,0,0.6)",
    backgroundColor: "#FDE2E2",
    width: "70%",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default ModalChangePassword;
