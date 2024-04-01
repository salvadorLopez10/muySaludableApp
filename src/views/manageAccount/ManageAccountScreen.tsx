import React, { useState } from "react";
import styles from "./Styles";
import { ImageBackground, Switch, TouchableOpacity } from "react-native";
import { SafeAreaView, Text, View } from "react-native";
import ModalChangePassword from "./ModalChangePassword";

export const ManageAccountScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const handlOpenModalChangePassword = () => {
    setVisibleModal(!visibleModal)
  };
  const handleDeleteAccount = () => {
    console.log("SEGURO QUE DESEAS BORRAR TU CUENTA?");
  };

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
    </SafeAreaView>
  );
};
