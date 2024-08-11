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

const ModalForgotPassword = ({visible, onCloseModal}:PropsModal) => {

    const [newPassword, setNewPassword] = useState("");
    const [email, setEmail] = useState("");
    const [visibleInput, setVisibleInput] = useState(false);
    const [idUsuarioPassword, setIdUsuarioPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [visibleIndicator, setVisibleIndicator] = useState(false);
    const [visibleIndicatorConfirmChange, setVisibleIndicatorConfirmChange] = useState(false);
    const [disableButtonVerify, setDisableButtonVerify] = useState(false);
    
    const setIndicator = () => {
      setVisibleIndicator(!visibleIndicator);
    };

    useEffect(() => {
      resetStates();
    }, [visible])
    

    const verifyEmail = async () => {
      if (email.trim().length == 0) {
        Alert.alert("Error","Favor de ingresar correo electrónico");
        return;
      }

      const requestEmail = {
        "email": email
      }
      
      setDisableButtonVerify(true);
      setVisibleIndicator(true);

       const responseEmailExists = await MuySaludableApi.post(
         "/usuarios/checkEmail",
         requestEmail
       ).then((response:any) => {
        setVisibleIndicator(false);
        setDisableButtonVerify(false);
        //console.log(JSON.stringify(response,null,2));
        if (response.data.status == "Duplicate") {
          console.log("ID USUARIO: "+response.data.data.id);
          setIdUsuarioPassword(response.data.data.id);
          setVisibleInput(true);
  
        }else{
          setVisibleInput(false);
          Alert.alert(
            "Error",
            "El email que ingresaste no está registrado, favor de verificar"
          );
        }
    
       }).catch((error:any) => {
          // console.log("Error al verificar el email");
          // console.log(JSON.stringify(error, null, 2));
          setDisableButtonVerify(false);
          setVisibleInput(false);
          setVisibleIndicator(true);
          Alert.alert(
            "Error",
            "Np se ha podido verificar el email, favor de intentar nuevamente"
          );
          if (error.response && error.response.data) {
            if (!error.response.data.success) {
              
              console.log("Mensaje de error: ", error.response.data.message);
            }
          } else {
            console.log("Error en la transacción SIN DATA:", error.message);
          }
      });
    };

    const handleRestartPassword = async () => {

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
      setVisibleIndicatorConfirmChange(true);

      const actualizaPassword = await MuySaludableApi.put(
        `/usuarios/${idUsuarioPassword}`,
        bodyUpdatePass
      )
        .then((responsePassword:any) => {

          setVisibleIndicatorConfirmChange(false);
          

          Alert.alert(
            "La contraseña se actualizó correctamente",
            "Por favor guarda tu contraseña, la necesitarás para acceder a tu información.\n",
            [
              {
                text: "Continuar",
                onPress: () => {
                  resetStates();
                  onCloseModal();
                }
              },
            ],
            { cancelable: false }
          );
        })
        .catch((errorNewPassword:any) => {
          setVisibleIndicatorConfirmChange(false);
          
          console.log(
            "Mensaje de error en actualización de password: ",
            errorNewPassword.response.data.message
          );
        });

    }

    const resetStates = () => {
      setEmail("");
      setNewPassword("");
      setConfirmPassword("");
      setVisibleInput(false);
      setIdUsuarioPassword("");
      setVisibleIndicator(false);
      setVisibleIndicatorConfirmChange(false);
      setDisableButtonVerify(false);
    }

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
            <Text style={styles.modalTextTitle}>Reestablecer contraseña</Text>

            <View>
              <Text style={styles.modalTextDescription}>
                Ingresa tu correo electrónico
              </Text>
            </View>

            <View style={styles.containerInputs}>
              <TextInput
                style={styles.textInputStyle}
                placeholderTextColor="#d1cccc"
                placeholder="Correo electrónico"
                autoCapitalize={"none"}
                value={email}
                editable={!visibleInput}
                onChangeText={(text: string) => setEmail(text)}
              />

              {
                visibleInput &&
                <View>
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
              }
            </View>

              {
                !visibleInput && 
                <TouchableOpacity
                  onPress={verifyEmail}
                  style={styles.verifyButton}
                  disabled={disableButtonVerify}
                >
                  <Text style={styles.closeButtonText}>Verificar email</Text>
                  {visibleIndicator && (
                    <ActivityIndicator size="large" color="#ffffff" />
                  )}
                </TouchableOpacity>
              }

              {
                visibleInput && 
                <TouchableOpacity
                  onPress={handleRestartPassword}
                  style={styles.verifyButton}
                  disabled={disableButtonVerify}
                >
                <Text style={styles.closeButtonText}>Reestablecer contraseña</Text>
                  {visibleIndicatorConfirmChange && (
                    <ActivityIndicator size="large" color="#ffffff" />
                  )}
            </TouchableOpacity>

              }
            
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
    elevation: 5
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
  verifyButton: {
    backgroundColor: "#faa029",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 200,
    marginTop: 20,
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

export default ModalForgotPassword;
