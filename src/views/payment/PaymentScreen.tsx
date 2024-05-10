import { StackScreenProps } from '@react-navigation/stack';
import { useRoute, RouteProp, useNavigation, NavigationProp } from "@react-navigation/native";
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, ScrollView, ActivityIndicator } from "react-native";
import useViewModel from './ViewModel';
import TextField from '../../components/TextField';
import CreditCardForm from './CreditCardForm';
import { View } from 'react-native';
import { RootStackParams } from '../../navigator/StackNavigator';

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



export const PaymentScreen = (  ) => {
  const [loading, setLoading] = useState(false);
  
  const [expirationDate, setExpirationDate] = useState("");
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const params = useRoute<RouteProp<RootStackParams,"PaymentScreen">>().params;
  console.log("");
  console.log(params);
  const { email, precio, plan, idPlan, fechaExpiracion} = params;
  const [currentPrice, setCurrentPrice] = useState(precio);

  function setLoadingState(isLoading: boolean) {
    setLoading(isLoading);
  }

  function changePriceDiscount( valPrice: string ) {
    setCurrentPrice(valPrice);
  }

  useEffect(() => {
    //console.log("ENTRA EFFECT EN SCREEN");
    setExpirationDate(fechaExpiracion);
  }, []);
  
  function LoadingAnimation() {
    return (
      <View style={styles.indicatorWrapper}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.indicatorText}>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.tituloContainer}>
          <Text style={styles.title}>Detalles de Pago</Text>

          <View style={styles.containerDataUser}>
            <Text style={styles.userDetail}>Email: {email}</Text>
            <Text style={styles.userDetail}>
              Total a pagar: ${currentPrice}
            </Text>
          </View>
        </View>
        <CreditCardForm
          emailProp={email}
          precioProp={precio}
          planProp={plan}
          idPlanProp={idPlan}
          fechaExpiracionProp={expirationDate}
          setLoading={setLoadingState}
          setCurrentPrice={changePriceDiscount}
        />
      </ScrollView>
      {loading && <LoadingAnimation />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    //justifyContent: "center",
    //alignItems: "center",
  },
  content: {
    //flex:1,
    paddingTop: 50,
    //paddingHorizontal: 36,
    padding: '5%',
    backgroundColor: "white",
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
  },
  tituloContainer: {
    //position: "absolute",
    flex: 1,
    //alignSelf: "center",
    //top:50,
    marginTop: "10%",
    //justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#326807",
    fontSize: 24,
    //fontWeight: "bold",
    fontFamily: "Gotham-Ultra",
  },
  containerDataUser: {
    backgroundColor: "#FCFDBD",
    alignItems: "center",
    padding: 10,
  },
  userDetail: {
    color: "#326807",
    fontSize: 18,
    fontFamily: "Gotham-Ultra",
  },
  textField: {
    marginBottom: 32,
  },
});