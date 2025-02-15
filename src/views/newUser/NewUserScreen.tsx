import { useEffect,useState } from 'react';
import {
  SafeAreaView,Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ActivityIndicator,
  Alert
} from "react-native";
import { StackScreenProps } from '@react-navigation/stack';
import { useAuthStore } from '../../store/auth/useAuthStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from "@react-navigation/native";
import { MuySaludableApi } from '../../api/MuySaludableApi';


interface Props extends StackScreenProps<any,any>{};

const { height } = Dimensions.get("window");


export const NewUserScreen = ( {navigation}: Props ) => {

    const [userEmail, setUserEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const status = useAuthStore((state) => state.status);

    useEffect(() => {
      console.log("EFFECT DE NEWUSER");
        const fetchEmail = async () => {
            const email = await AsyncStorage.getItem("user");
            console.log("INFO DE EMAIL: "+ email);
            if (email) {
                setUserEmail(email);
            }
        };
        fetchEmail();
    }, [status]);

    function LoadingAnimation() {
        return (
          <View style={styles.indicatorWrapper}>
            <ActivityIndicator size="large" color="#ffffff" />
            <Text style={styles.indicatorText}>Enviando correo...</Text>
          </View>
        );
      }
    
    const handleLogout = async () => {

      await AsyncStorage.multiRemove(["user", "mealPlan"]);

      useAuthStore.setState({
        status: "unauthenticated",
        user: undefined,
      });
        
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: "LoginScreen" }],
            })
        );
    }

    const resendEmail = async () => {
      if( userEmail ){
        const requestEmail = {
          email: userEmail
        };

        setLoading(true);
        MuySaludableApi.post(
          "/sendEmail/sendWelcomeEmailOnlyUser",
          requestEmail
        ).then(( responseEmailEnviado: any ) => {
          setLoading(false);
          Alert.alert("Información", "El email se ha enviado correctamente a "+ userEmail);

        }).catch((errorReenvioCorreo:any) =>{
          setLoading(false);
          Alert.alert("Error", "El email no se ha podido enviar " +  JSON.stringify(errorReenvioCorreo,null,1));

        });
      }
    }

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../../assets/background_carrete_frutas.jpg")}
        style={styles.imageBackground}
      />

      {/* Botón de Cerrar Sesión */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>

      {/* Título */}
      <View style={styles.tituloContainer}>
        <Text style={styles.tituloTextOrange}>¡YA CASI TERMINAMOS!</Text>
      </View>

      <View style={styles.contentContainer}>

      
        <View style={styles.contentContainer}>
          <Text style={styles.contentTitulo}>Consulta el email</Text>
          <Text style={styles.contentTitulo}>que acabamos de enviarte a:</Text>
          <Text style={styles.contentTituloOrange}>{ userEmail }</Text>
        </View>

        <View style={styles.containerDisclaimer}>
            <Text style={styles.contentTituloSmall}>Revisa tu bandeja de entrada</Text>
            <Text style={styles.contentTituloSmall}>o carpeta de spam. </Text>
            
        </View>
        
        <View style={styles.contentContainer}>
            <Text style={styles.contentTitulo}>Si no lo encuentras,</Text>
            <Text style={styles.contentTitulo}>da clic en el siguiente botón</Text>
            <Text style={styles.contentTitulo}>para reenviar</Text>
        </View>

        <TouchableOpacity 
          style={styles.containerClick}
          onPress={ resendEmail }
          >
          <Text style={styles.textClic}>
             Reenviar
          </Text>
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <Image
            source={require("../../../assets/logoMuySaludableMR.png")}
            style={styles.logoImage}
          />
        </View>
      </View>

      {loading && <LoadingAnimation />}
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  imageBackground: {
    width: "100%",
    height: height,
    position: 'absolute',
  },
  logoutContainer: {
    position: "absolute",
    //marginTop: '50%',
    //top: 10,
    right: 10,
    marginTop:45
  },
  logoutButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth:1,
    borderColor: "#faa029",
  },
  logoutText: {
    color: "#faa029",
    fontSize: 16,
    fontFamily: "Gotham-Medium",
  },
  tituloContainer: {
    //position: "absolute",
    alignSelf: "center",
    //top: "5%",
    marginTop: "25%",
  },
  tituloText: {
    color: "#326807",
    alignSelf: "center",
    fontSize: 24,
    //fontWeight: "bold",
    fontFamily: "Gotham-Ultra",
  },
  tituloTextOrange: {
    color: "#faa029",
    alignSelf: "center",
    fontSize: 24,
    //fontWeight: "bold",
    fontFamily: "Gotham-Ultra",
  },
  contentContainer: {
    //position: "absolute",
    alignSelf: "center",
    //top: "5%",
    marginTop: 15,
  },
  containerDisclaimer:{
    alignSelf: "center",
    marginTop: 30,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#326807",
    padding: 20, 
    width: "auto",
    alignItems: "center",
  },
  contentTitulo: {
    color: "#326807",
    top: 10,
    fontSize: 18,
    textAlign: "center",
    //fontWeight: "bold",
    fontFamily: "Gotham-Book",
  },
  contentTituloSmall: {
    color: "#326807",
    //top: 10,
    fontSize: 12,
    textAlign: "center",
    //fontWeight: "bold",
    fontFamily: "Gotham-Book",
  },
  contentTituloOrange: {
    color: "#faa029",
    top: 10,
    fontSize: 17,
    textAlign: "center",
    //fontWeight: "bold",
    fontFamily: "Gotham-Ultra",
  },
  containerClick: {
    borderRadius: 15,
    padding: 10,
    width: '50%',
    //top: 5,
    backgroundColor: "#faa029",
    marginVertical: 30,
    alignItems: "center",
    alignSelf:"center"
    
  },
  textClic: {
    color: "#ffffff",
    fontSize: 18,
    fontFamily: "Gotham-Medium",
    textAlign: "center",
    //top: 10,
    //marginBottom: 7,
  },
  logoContainer: {
    //position: "absolute",
    alignSelf: "center",
    alignItems: "center",
    //top: "35%",
  },
  logoImage: {
    width: 100,
    height: 103,
  },
  indicatorWrapper: {
    flex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(100, 100, 100, 0.6)",
  },
  indicatorText: {
    fontSize: 18,
    marginTop: 12,
    color: "#ffffff",
    fontFamily: "Gotham-Medium",
  }
});

