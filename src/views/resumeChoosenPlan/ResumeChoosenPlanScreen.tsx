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
  duracion: string;
  precio: string;
  createdAt: string;
  updatedAt: string;
}

type ResumeChoosenPlanRouteProp = RouteProp<{ ResumeChoosenPlanScreen: { selectedPlan: Plan } }, 'ResumeChoosenPlanScreen'>;

export const ResumeChoosenPlanScreen = ({navigation}: Props) => {

  const { email, onChange } = useViewModel();

  const route = useRoute<ResumeChoosenPlanRouteProp>();
  const { selectedPlan } = route.params;


  useEffect(() => {
    console.log("cambio plan")
    console.log(selectedPlan)
  }, [selectedPlan])

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
      <Image
        source={require("../../../assets/BackGroundFresas.png")}
        style={styles.imageBackground}
      />

      {/* Título */}
      <View style={styles.tituloContainer}>
        <Text style={styles.tituloText}>RESUMEN DEL PLAN ELEGIDO </Text>
        <Text style={styles.contentTitulo}>{selectedPlan.nombre}</Text>
        <Text style={styles.pricePlan}>${selectedPlan.precio}</Text>
      </View>

      {/* Sección de características */}
      <View style={styles.caracteristicasContainer}>
        {selectedPlan?.descripcion_detallada.split("\n").map((linea, index) => (
          <View key={index} style={styles.itemContainer}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.texto}>{linea}</Text>
          </View>
        ))}
      </View>

      {/* Sección de vigencia */}
      <View style={styles.bottomContainer}>
        <Text style={styles.contentTitulo}>VIGENCIA DEL PLAN</Text>
        <Text style={styles.fechaVigencia}>14/01/2023</Text>
      </View>

      {/* Sección email*/}
      <View style={styles.overlay}>
        <Text style={styles.etiqueta}>Ingresa tu correo electrónico</Text>
        <TextInput style={styles.input} placeholder="Correo electrónico" value={email} onChangeText={(text)=> onChange('email', text)} />
      </View>

      {/* Sección botón*/}
      <View style={styles.containerBoton}>
        <TouchableOpacity style={styles.boton}
          onPress={ onConfirmPlan }
        >
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
  imageBackground: {
    width: "100%",
    height: "100%",
  },
  tituloContainer: {
    position: "absolute",
    alignSelf: "center",
    top: "10%",
  },
  tituloText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  contentTitulo: {
    color: "#0948A6",
    top: 20,
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  pricePlan: {
    color: "#fff",
    backgroundColor: "rgba(0, 0, 255, 0.5)",
    borderRadius: 20,
    top: 40,
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
    
  },
  containerBullet: {
    padding: 10,
  },
  caracteristicasContainer: {
    position: "absolute",
    alignSelf: "center",
    top: "25%",
    padding: 15
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  bullet: {
    color: "#fff",
    fontSize: 20,
    marginRight: 5,
  },
  texto: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
  },
  bottomContainer: {
    position: "absolute",
    alignSelf: "center",
    top: "50%",
  },
  fechaVigencia: {
    color: "#0948A6",
    top: 25,
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  overlay: {
    position: "absolute",
    top: "62%",
    alignSelf: "center",
    width: "70%",
    backgroundColor: "rgba(0, 0, 255, 0.5)",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  etiqueta: {
    color: "white", // Color del texto de la etiqueta
    fontSize: 15,
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: "100%",
    backgroundColor: "white", // Color del fondo del TextInput
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  containerBoton: {
    position: "absolute",
    alignSelf: "center",
    alignItems: "center",
    top: "85%",
    width: "100%",
  },
  boton: {
    backgroundColor: "#0948A6",
    padding: 10,
    borderRadius: 10,
    width: "70%",
    alignItems: "center",
  },
  textoBoton: {
    color: "white",
    fontSize: 16,
  },
});
