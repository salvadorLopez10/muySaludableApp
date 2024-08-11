import React, { useState } from "react";
import styles from "./Styles";
import { ImageBackground, Switch, TouchableOpacity,ActivityIndicator } from "react-native";
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
