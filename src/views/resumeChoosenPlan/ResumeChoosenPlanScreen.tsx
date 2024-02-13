import { useRoute, RouteProp } from "@react-navigation/native";
import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, Keyboard, Alert } from 'react-native'
import useViewModel from './ViewModel'


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

type ResumeChoosenPlanRouteProp = RouteProp<{ ResumeChoosenPlanScreen: { selectedPlan: Plan } }, 'ResumeChoosenPlanScreen'>;

export const ResumeChoosenPlanScreen = ({navigation}: Props) => {

  const { email, onChange } = useViewModel();
  const [validity, setValidity] = useState("")

  const route = useRoute<ResumeChoosenPlanRouteProp>();
  const { selectedPlan } = route.params;


  useEffect(() => {
    //console.log("cambio plan")
    const vigencia = setValidityDate(selectedPlan);
    setValidity(vigencia);

    console.log(vigencia);

  }, [selectedPlan]);

  const setValidityDate = (selectedPlan:Plan) => {
    const currentDate = new Date();
    const sumaMeses = parseInt(selectedPlan.duracion_meses);

    // Suma 1 mes
    const validityDate = new Date();
    validityDate.setMonth(currentDate.getMonth() + sumaMeses);
    //console.log(validityDate)

    const formatDate: { year?: 'numeric'; month?: 'long'; day?: 'numeric' } = { year: 'numeric', month: 'long', day: 'numeric' };

    return `${validityDate.toLocaleDateString(undefined, formatDate)}`;
  }

  const onConfirmPlan = () => {
    Keyboard.dismiss();
    
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

    navigation.navigate("PaymentScreen");
  }
  

  return (
    <View style={styles.container}>
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
        <View style={styles.containerEmail}>
          <Text style={styles.labelEmail}>Ingresa tu correo electrónico</Text>
          <TextInput
            style={styles.inputEmail}
            placeholder=""
            value={email}
            onChangeText={(text) => onChange("email", text)}
          />
        </View>

        {/* Sección botón*/}
        <View style={styles.containerBoton}>
          <TouchableOpacity style={styles.boton} onPress={onConfirmPlan}>
            <Text style={styles.textoBoton}>Confirmar y proceder al pago</Text>
          </TouchableOpacity>
        </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  tituloContainer: {
    //position: "absolute",
    flex: 1,
    alignSelf: "center",
    //top:50,
    marginTop: "10%",
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
    padding:15,
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
    flex: 6,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#55851F",
    //position: "absolute",
    alignSelf: "center",
    //marginTop: "3%",
    //top:1,
    padding: 10,
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
    flex: 1,
    //position: "relative",
    alignSelf: "center",
    //top:70
    //marginTop: "3%",
    //bottom:10,
  },
  textVigencia: {
    color: "#55851F",
    //top: 10,
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Gotham-Ultra",
  },
  fechaVigencia: {
    color: "#55851F",
    top: 5,
    fontSize: 18,
    textAlign: "center",
    //fontWeight: "bold",
    fontFamily: "Gotham-Ultra",
  },
  containerEmail: {
    //position: "absolute",
    //top: "65%",
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
});
