import React, { useEffect, useState } from "react";
import { MuySaludableApi } from "../../api/MuySaludableApi";
import { Alert } from "react-native";
import { useNavigation, NavigationProp, CommonActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootStackParams } from "../../navigator/StackNavigator";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAuthStore } from "../../store/auth/useAuthStore";
import NetInfo from "@react-native-community/netinfo";


const LoginViewModel = () => {

    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
    const [visibleModal, setVisibleModal] = useState(false);
    const [values, setValues] = useState({
        email: "",
        password: "",
    });
    
    const [isConnected, setIsConnected] = useState(true);

    useEffect(() => {
      const unsubscribe = NetInfo.addEventListener((state) => {
        if (state.isConnected !== null) {
            console.log("EFFECT NETINFO")
          setIsConnected(state.isConnected);

          if( !state.isConnected ){
             Alert.alert(
               "Información",
               "Sin conexión a internet.\nPara acceder a todas las funcionalidades, por favor verifica que tengas una conexión a internet activa"
             );
          }else{
            console.log("CONEXIÓN ACTIVA");
          }
        }
      });

      return () => {
        unsubscribe();
      };
    }, [isConnected]);

    const onChange = (property: string, value: any) => {
        setValues({ ...values, [property]: value });
    };

    // LoginViewModel.tsx
    const handleLogin = async (email: string, password: string, loading: boolean, setLoading: (val: boolean) => void) => {
        if (email.trim().length === 0) {
            Alert.alert("Error", "Por favor ingresa email");
            return;
        }
    
        if (password.length === 0) {
            Alert.alert("Error", "Por favor ingresa contraseña");
            return;
        }
    
        setLoading(true);
    
        const requestLogin = { email, password };
    
        try {
            const responseLogin = await MuySaludableApi.post("/usuarios/login", requestLogin);
            setLoading(false);
        
            if (responseLogin.data.status === "Ok") {
                if (responseLogin.data.msg === "Sin suscripcion") {
                    await AsyncStorage.setItem("user", JSON.stringify(responseLogin.data.data));
                    useAuthStore.setState({ status: "userWithoutSuscription", user: responseLogin.data.data });
                    navigation.navigate('NewUserScreen'); // Navega directamente a la pantalla de nuevo usuario
                } else {
                    await AsyncStorage.setItem("user", JSON.stringify(responseLogin.data.data));
                    useAuthStore.setState({ status: "authenticated", user: responseLogin.data.data });
        
                // Verifica si el usuario debe ver el QuizNavigator
                if (!responseLogin.data.data.nombre) {
                    navigation.navigate('QuizScreen'); // Navega directamente a la pantalla de Quiz
                } else {
                    navigation.navigate('MainMenuScreen'); // Navega al menú principal
                }
                }
            } else if (responseLogin.data.status === "Error") {
                Alert.alert("Error", responseLogin.data.msg);
            }
        } catch (error) {
            setLoading(false);
            Alert.alert("Error", "Ocurrió un error en el login, por favor vuelve a intentarlo");
            console.error("Error en la transacción:", error);
        }
    };

    const handleForgotPassword = () => {
        
        setVisibleModal(!visibleModal);
    }

    return {
        ...values,
        visibleModal,
        isConnected,
        onChange,
        handleLogin,
        handleForgotPassword
    };
  
};

export default LoginViewModel;
