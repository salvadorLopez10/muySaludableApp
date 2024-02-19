import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react'
import { StyleSheet, Text, ScrollView, Button } from 'react-native'
import useViewModel from './ViewModel';
import TextField from '../../components/TextField';
import CreditCardForm from './CreditCardForm';
import { View } from 'react-native';

interface Props extends StackScreenProps<any,any>{};

export const PaymentScreen = ( {navigation}: Props ) => {

  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiration, setExpiration] = useState("");
  
  const [cvv, setCvv] = useState("");
   const [value, setValue] = useState('')
  const [error, setError] = useState<string | null>(null)
  function onSubmit() {
    console.log("form submitted");
  }

  const onNavigateQuiz = () => {

    navigation.navigate("QuizScreen");
  };


  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* <Text style={styles.title}>Payment details</Text>
        <TextField
          style={styles.textField}
          value={value}
          label="Cardholder name"
          errorText={error}
          onChangeText={(text) => setValue(text)}
        />
        <Button
          title="ERROR"
          onPress={() => setError('Este campo es requerido')}
        /> */}
        {/* <Button title="Siguiente" onPress={onNavigateQuiz}></Button> */}
        <View style={styles.tituloContainer}>
          <Text style={styles.title}>Detalles de Pago</Text>
        </View>
        <CreditCardForm />
      </ScrollView>
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
    paddingHorizontal: 36,
    backgroundColor: "white",
  },
  tituloContainer: {
    //position: "absolute",
    flex: 1,
    alignSelf: "center",
    //top:50,
    marginTop: "10%",
    justifyContent: "center",
  },
  title: {
    color: "#326807",
    fontSize: 24,
    //fontWeight: "bold",
    fontFamily: "Gotham-Ultra",
  },
  textField: {
    marginBottom: 32,
  },
});