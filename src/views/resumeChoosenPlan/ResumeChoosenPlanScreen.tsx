import { useRoute, RouteProp, useNavigation, NavigationProp } from "@react-navigation/native";
import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react'
import Icon from "react-native-vector-icons/FontAwesome";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Alert,
  Modal,
  KeyboardAvoidingView,
  SafeAreaView
} from "react-native";
import useViewModel from './ViewModel'
import { RootStackParams } from "../../navigator/StackNavigator";
import { MuySaludableApi } from "../../api/MuySaludableApi";
import { useAuthStore } from "../../store/auth/useAuthStore";


interface Props extends StackScreenProps<any,any>{};

interface Plan {
  id: number;
  nombre: string;
  resumen: string;
  descripcion_detallada: string;
  duracion_meses: string;
  precio: string;
  createdAt: string;
  updatedAt: string;
}

//type ResumeChoosenPlanRouteProp = RouteProp<{ ResumeChoosenPlanScreen: { selectedPlan: Plan } }, 'ResumeChoosenPlanScreen'>;

export const ResumeChoosenPlanScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const { email, onChange } = useViewModel();
  const [isModalVisibleEmail, setIsModalVisibleEmail] = useState(false);
  const [validity, setValidity] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [disabledBtnEmail, setDisabledBtnEmail] = useState(false);

  const params = useRoute<RouteProp<RootStackParams,"ResumeChoosenPlanScreen">>().params;
  const { selectedPlan } = params;

  const userInfo = useAuthStore((state) => state.user);

  const openModal = () => {
    setIsModalVisibleEmail(true);
  };

  const closeModal = () => {
    setIsModalVisibleEmail(false);
  };

  const handleConfirmEmail = async () => {
    if (email === "") {
      Alert.alert("Error", "Favor de ingresar el email");
      return;
    } else {
      const validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (!email.match(validRegex)) {
        Alert.alert("Error", "Favor de ingresar un correo electrónico válido");
        return;
      }
    }

    const requestEmail = {
      "email": email
    }

     const responseEmailExists = await MuySaludableApi.post(
       "/usuarios/checkEmail",
       requestEmail
     ).then((response:any) => {

      //console.log(JSON.stringify(response,null,2));
      if (response.data.status == "Duplicate") {

        Alert.alert(
          "Error",
          "El email que ingresaste ya existe, favor de intentar con uno diferente"
        );
        return;
      }

      closeModal();

     }).catch((error:any) => {
        // console.log("Error al verificar el email");
        // console.log(JSON.stringify(error, null, 2));
        Alert.alert(
          "Error",
          "NO se ha podido verificar el email, favor de intentar nuevamente"
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

  useEffect(() => {
    //console.log("USER INFO");
    //console.log(JSON.stringify(userInfo,null,4));
    if( userInfo !== undefined ){
      setDisabledBtnEmail(true);
      onChange("email",userInfo?.email);
    }
    const vigencia = setValidityDate(selectedPlan);
    setValidity(vigencia[0]);
    setExpirationDate(vigencia[1]);
    //console.log(JSON.stringify(vigencia,null,2));

  }, [selectedPlan]);

  const setValidityDate = (selectedPlan:Plan) => {
    const currentDate = new Date();
    const sumaMeses = parseInt(selectedPlan.duracion_meses);

    const validityDate = new Date();
    validityDate.setMonth(currentDate.getMonth() + sumaMeses);
    //console.log(validityDate)

    //Se establece formato de fecha en un string como: 12 de mayo de 2024
    const formatDate: { year?: 'numeric'; month?: 'long'; day?: 'numeric' } = { year: 'numeric', month: 'long', day: 'numeric' };

    //Se establece fecha con el siguiente formato:  2024-05-12 23:55:00
    const formattedDate = formatExpirationDate(validityDate);

    return [`${validityDate.toLocaleDateString(undefined, formatDate)}`, formattedDate];
  }

  const formatExpirationDate = ( validityDate: Date ) => {
    
    const year = validityDate.getFullYear().toString();
    let month = (validityDate.getMonth() + 1).toString().padStart(2, '0');
    let day = validityDate.getDate().toString().padStart(2, '0');
    let hours = '23';
    let minutes = '59';
    let seconds = '00';

    // Formatear la fecha
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return formattedDate;
  }

  const onConfirmPlan = () => {
    Keyboard.dismiss();
    
    if (email === "") {
      Alert.alert("Error", "Favor de ingresar el email");
      return;
    } else {
      const validRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      //const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (!email.match(validRegex)) {
        Alert.alert("Error", "Favor de ingresar un correo electrónico válido");
        return;
      }
    }
    //navigation.navigate("ResumeChoosenPlanScreen", {selectedPlan: selectedView});
    navigation.navigate("PaymentScreen",{email: email, precio: selectedPlan.precio, plan: selectedPlan.nombre, idPlan: selectedPlan.id, fechaExpiracion: expirationDate});
  }
  

  return (
    <SafeAreaView style={styles.container}>
      {/* Título */}
      <View style={styles.tituloContainer}>
        <Text style={styles.tituloText}>RESUMEN DEL PLAN</Text>
      </View>

      {/* Sección de características */}
      <View style={styles.caracteristicasContainer}>
        <Text style={styles.contentTitulo}>{selectedPlan.nombre}</Text>
        <View style={styles.containerPrice}>
          <Text style={styles.pricePlan}>${selectedPlan.precio}</Text>
        </View>

        <View style={styles.containerBullets}>
          {selectedPlan?.descripcion_detallada
            .split("\n")
            .map((linea, index) => (
              <View key={index} style={styles.itemContainer}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.texto}>{linea}</Text>
              </View>
            ))}
        </View>
      </View>

      {/* Sección de vigencia */}
      <View style={styles.bottomContainer}>
        <Text style={styles.textVigencia}>VIGENCIA DEL PLAN</Text>
        <Text style={styles.fechaVigencia}>{validity}</Text>
      </View>

      {/* Sección email*/}
      <TouchableOpacity style={styles.containerEmail} onPress={openModal} disabled={disabledBtnEmail}>
        <Text style={styles.labelEmail}>Ingresa tu correo electrónico</Text>
          <TextInput
            style={styles.inputEmail}
            placeholder=""
            value={email}
            editable={false}
            onTouchStart={openModal}          
          />
        
      </TouchableOpacity>

      {/* Ventana modal */}
      <Modal visible={isModalVisibleEmail} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeIcon} onPress={closeModal}>
              <Icon name="times" size={20} color="black" />
            </TouchableOpacity>
            <TextInput
              style={styles.modalInput}
              placeholder="Correo electrónico"
              value={email}
              autoCapitalize="none"
              onChangeText={(text) => onChange("email", text)}
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleConfirmEmail}
            >
              <Text style={styles.modalButtonText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Sección botón*/}
      <View style={styles.containerBoton}>
        <TouchableOpacity style={styles.boton} onPress={onConfirmPlan}>
          <Text style={styles.textoBoton}>Confirmar y proceder al pago</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tituloContainer: {
    //position: "absolute",
    //flex: 1,
    alignSelf: "center",
    //top:50,
    marginTop: 20,
    justifyContent: "center",
  },
  tituloText: {
    color: "#326807",
    fontSize: 24,
    //fontWeight: "bold",
    fontFamily: "Gotham-Ultra",
  },
  contentTitulo: {
    color: "#55851F",
    //top: 10,
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Gotham-Ultra",
    //fontWeight: "bold",
  },
  containerPrice: {
    backgroundColor: "rgba(85, 133, 31, 0.7)",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
    marginLeft: 40,
    marginRight: 50,
    marginBottom: 20,
  },
  pricePlan: {
    color: "#fff",
    borderRadius: 20,
    textAlign: "center",
    //top: 40,
    fontSize: 24,
    fontFamily: "Gotham-Ultra",
    //fontWeight: "bold",
  },

  caracteristicasContainer: {
    backgroundColor: "#FCFDBD",
    width: "90%",
    //flex: 6,
    height: "55%",
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#55851F",
    //position: "absolute",
    alignSelf: "center",
    //marginTop: "3%",
    //top:1,
    padding: 20,
  },
  containerBullets: {
    flex: 1,
    justifyContent: "center",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    //justifyContent: 'center',
    marginBottom: 8,
  },
  bullet: {
    color: "#55851F",
    fontSize: 20,
    marginRight: 5,
  },
  texto: {
    fontSize: 15,
    //fontWeight: "bold",
    color: "#55851F",
    fontFamily: "Gotham-Medium",
  },
  bottomContainer: {
    //flex: 1,
    //position: "relative",
    alignSelf: "center",
    //top:70
    marginTop: "1%",
    //bottom:10,
  },
  textVigencia: {
    color: "#55851F",
    //top: 10,
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Gotham-Ultra",
    //marginBottom: -5
  },
  fechaVigencia: {
    color: "#55851F",
    top: 5,
    fontSize: 18,
    textAlign: "center",
    //fontWeight: "bold",
    fontFamily: "Gotham-Ultra",
    marginBottom: 10
  },
  containerEmail: {
    //position: "absolute",
    marginTop: "2%",
    flex: 1,
    //marginTop: "3%",
    alignSelf: "center",
    width: "70%",
    backgroundColor: "rgba(85, 133, 31, 0.7)",
    padding: 8,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    bottom: 10,
  },
  labelEmail: {
    color: "white", // Color del texto de la etiqueta
    fontSize: 15,
    marginBottom: 8,
    fontFamily: "Gotham-Medium",
    textAlign: "center",
  },
  inputEmail: {
    height: "40%",
    width: "100%",
    color: "#55851F",
    backgroundColor: "white", // Color del fondo del TextInput
    borderRadius: 5,
    //paddingHorizontal: 10,
    textAlign: "center",
    fontFamily: "Gotham-Medium",
  },
  containerBoton: {
    flex: 1,
    //position: "absolute",
    alignSelf: "center",
    alignItems: "center",
    top: 5,
    //marginTop: 10,
    width: "100%",
  },
  boton: {
    backgroundColor: "#FAA029",
    padding: 14,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  textoBoton: {
    color: "white",
    fontSize: 16,
    fontFamily: "Gotham-Medium",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalInput: {
    height: 40,
    width: "100%",
    color: "#55851F",
    backgroundColor: "white",
    borderRadius: 5,
    borderColor: "#55851F",
    borderWidth: 1,
    textAlign: "center",
    fontFamily: "Gotham-Medium",
    marginTop: 15,
  },
  modalButton: {
    backgroundColor: "#FAA029",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  modalButtonText: {
    color: "white",
    fontFamily: "Gotham-Medium",
    fontSize: 16,
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});
