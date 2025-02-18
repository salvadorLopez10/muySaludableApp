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
import Icon from "react-native-vector-icons/Ionicons";

export const LoginScreen = () => {

    const [showPassword, setShowPassword] = useState(false);
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
        <View style={styles.inputContainer}>

          <CustomTextInput
            image={require("../../../assets/password.png")}
            placeholder="Contraseña"
            keyboardType="default"
            property="password"
            onChangeText={onChange}
            value={password}
            secureTextEntry={!showPassword}
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
            <Text style={styles.formRegisterText}>¡Comienza ya!</Text>
          </TouchableOpacity>
        </View>
        {/* Sección para indicar el nombre de la empresa */}
        <View style={styles.brandMark}>
        <Text style={styles.textBrandMark}>Muy Saludable es un producto de ZENITRAMDOM SA DE CV</Text>
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
