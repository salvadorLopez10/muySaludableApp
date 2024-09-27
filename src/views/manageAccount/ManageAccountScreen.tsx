import React, { useState } from "react";
import styles from "./Styles";
import { ImageBackground, Switch, TouchableOpacity,ActivityIndicator, Linking } from "react-native";
import { Alert, SafeAreaView, Text, View } from "react-native";
import ModalChangePassword from "./ModalChangePassword";
import { MuySaludableApi } from "../../api/MuySaludableApi";
import { useAuthStore } from "../../store/auth/useAuthStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ManageAccountScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const handlOpenModalChangePassword = () => {
    setVisibleModal(!visibleModal)
  };

  const handleOpenWA = () => {

    let phoneNumber = '525565282789'; // Número de teléfono con el código internacional, por ejemplo: 521 para México.
    let message = '¡Hola!, requiero asistencia para la App';

    // Construir la URL para abrir en WhatsApp
    //let url = `whatsapp://send?text=${encodeURIComponent(message)}&phone=${phoneNumber}`;
    let url =`http://api.whatsapp.com/send?phone=${phoneNumber}`;

    const phoneUrl = `tel:${phoneNumber}`;

    // Verificar si WhatsApp está instalado
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          // Si WhatsApp no está disponible, abrir la app de teléfono
          Linking.canOpenURL(phoneUrl)
            .then((supported) => {
              if (supported) {
                Linking.openURL(phoneUrl); // Abre la app de teléfono
              } else {
                Alert.alert(
                  'Error',
                  'No se puede abrir la aplicación de teléfono.'
                );
              }
            })
            .catch((error) =>
              console.error('Error al intentar abrir la app de teléfono', error)
            );
        }
      })
      .catch((error) => console.error('Error al abrir WhatsApp', error));

  }

  function LoadingAnimation() {
    return (
      <View style={styles.indicatorWrapper}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.indicatorText}>Cargando...</Text>
      </View>
    );
  }

  const handleDeleteAccount = () => {
    Alert.alert(
      "Eliminar cuenta",
      "¿Estás seguro que deseas eliminar tu cuenta?\nNo podrás acceder a los datos de tu perfil",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Confirmar",
          onPress: async() => {
           
            const user = await useAuthStore.getState().user;
            if (user) {
              deleteAccount(user.id);
            }
          },
        },
      ],
      { cancelable: false }
    );

  };

  const deleteAccount = async ( idUsuario: number ) =>{
     const bodyDelete = {
       deleted: 1,
     };

     setLoading(true);

     const actualizaEstadoUsuario = await MuySaludableApi.put(
       `/usuarios/${idUsuario}`,
       bodyDelete
     )
       .then((responsePassword:any) => {
         //console.log(JSON.stringify(responsePassword, null, 2));
         setLoading(false);

         Alert.alert(
           "Cuenta eliminada",
           "La cuenta se ha eliminado correctamente",
           [
             {
               text: "Continuar",
               onPress: async () => {
                 await AsyncStorage.removeItem("user");

                 useAuthStore.setState({ status: "unauthenticated" });
                 useAuthStore.setState({ user: undefined });
               },
             },
           ],
           { cancelable: false }
         );
       })
       .catch((errorDeleteAccount:any) => {
         setLoading(false);

         console.log(
           "Mensaje de error al eliminar cuenta: ",
           errorDeleteAccount.response.data.message
         );
       });
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../../../assets/MealPlanBG.jpg")}
        style={styles.imageBackground}
      >
        <View style={styles.buttonDeleteContainer}>
          <TouchableOpacity
            style={styles.buttonSection}
            onPress={handlOpenModalChangePassword}
          >
            <Text style={{ color: "#faa029", fontFamily: "Gotham-Medium" }}>
              Cambiar contraseña
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.containerRow}>
          <View style={styles.sectionRow}>
            <Text
              style={{
                color: "#faa029",
                fontFamily: "Gotham-Medium",
                margin: 5,
              }}
            >
              Habilitar Notificaciones
            </Text>
            <Switch
              trackColor={{ false: "#919496", true: "#1B66C9" }}
              thumbColor={isEnabled ? "#faa029" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </View>

        {/* <View style={styles.buttonDeleteContainer}>
          <TouchableOpacity
            style={styles.buttonSection}
            onPress={handleOpenWA}
          >
            <Text style={{ color: "#faa029", fontFamily: "Gotham-Medium" }}>
              Contáctanos
            </Text>
          </TouchableOpacity>
        </View> */}

        <View style={styles.buttonDeleteContainer}>
          <TouchableOpacity
            style={styles.buttonDelete}
            onPress={handleDeleteAccount}
          >
            <Text style={{ color: "red", fontFamily: "Gotham-Medium" }}>
              Eliminar cuenta
            </Text>
          </TouchableOpacity>
        </View>

        <ModalChangePassword
          visible={visibleModal}
          onCloseModal={handlOpenModalChangePassword}
        />
      </ImageBackground>

      {loading && <LoadingAnimation />}
    </SafeAreaView>
  );
};
