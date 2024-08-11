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

    const handleLogin = async (email: string, password: string, loading: boolean, setLoading: (val:boolean) => void) => {

        if( email.trim().length == 0 ){
            Alert.alert("Error", "Por favor ingresa email");
            return;
        }

        if (password.length == 0) {
        Alert.alert("Error", "Por favor ingresa contraseña");
        return;
        }

        setLoading(true);
        
        const requestLogin = {
            email, password
        };
        const responseEmailExists = await  MuySaludableApi.post(
            "/usuarios/login",
            requestLogin
        ).then((responseLogin:any) => {
            setLoading(false);
            console.log(JSON.stringify(responseLogin.data, null, 2));
            if (responseLogin.data.status == "Ok") {
                AsyncStorage.setItem( "user", JSON.stringify(responseLogin.data.data) );

                useAuthStore.setState({ status: "authenticated" });
                useAuthStore.setState({ user: responseLogin.data.data });
                
                // navigation.reset({
                //   index: 0,
                //   routes: [{ name: "MainMenuScreen" }],
                // });
                
            } else if (responseLogin.data.status == "Error") {

                //La credenciales son incorrectas
                Alert.alert("Error", responseLogin.data.msg);
            }
        }).catch((error:any) => {
            setLoading(false);
            Alert.alert(
                "Error",
                "Ocurrió un error en el login, por favor vuelve a intentarlo"
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

    return {
        ...values,
        isConnected,
        onChange,
        handleLogin
    };
  
};

export default LoginViewModel;
