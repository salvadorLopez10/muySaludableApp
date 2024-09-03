import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { RoundedButton } from "../../components/RoundedButton";
import {
  useNavigation,
  NavigationProp,
} from "@react-navigation/native";
import { RootStackParams } from "../../navigator/StackNavigator";
import useViewModel from "./ViewModel";
import styles from "./Styles";
import { CustomTextInput } from "../../components/CustomTextInput";
import ModalForgotPassword from "./ModalForgotPassword";

export const LoginScreen = () => {
    const [loading, setLoading] = useState(false);

    const { email, password, visibleModal, isConnected, onChange, handleLogin, handleForgotPassword } = useViewModel();

    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    function LoadingAnimation() {
      return (
        <View style={styles.indicatorWrapper}>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={styles.indicatorText}>Cargando...</Text>
        </View>
      );
    }

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../../assets/loginBack.jpeg")}
        style={styles.imageBackground}
      />

      <View style={styles.logoContainer}>
        <Image
          source={require("../../../assets/logoMuySaludableMR.png")}
          style={styles.logoImage}
        />
        <Text style={styles.logoText}>Muy Saludable</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.formText}>INGRESAR</Text>

        <CustomTextInput
          image={require("../../../assets/email.png")}
          placeholder="Correo electrónico"
          keyboardType="email-address"
          property="email"
          onChangeText={onChange}
          value={email}
        />

        <CustomTextInput
          image={require("../../../assets/password.png")}
          placeholder="Contraseña"
          keyboardType="default"
          property="password"
          onChangeText={onChange}
          value={password}
          secureTextEntry={true}
        />

        <View style={{ marginTop: 30 }}>
          <RoundedButton
            text="ENTRAR"
            disabled={!isConnected}
            onPress={() => handleLogin(email, password, loading, setLoading)}
          />
        </View>

        <View style={styles.formForgotPassword}>
          <TouchableOpacity
            disabled={!isConnected}
            onPress={handleForgotPassword}
          >
            <Text style={styles.formForgotPasswordText}>
              ¿Olvidaste tu contraseña?
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.formRegister}>
          <Text>¿Aún no tienes cuenta?</Text>

          <TouchableOpacity
            disabled={!isConnected}
            onPress={() => navigation.navigate("ChoosePlanScreen")}
          >
            <Text style={styles.formRegisterText}>Regístrate</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ModalForgotPassword
          visible={visibleModal}
          onCloseModal={handleForgotPassword}
        />

      {loading && <LoadingAnimation />}
    </SafeAreaView>
  );
};
