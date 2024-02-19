import React, { useState } from "react";
import { StyleSheet, View, Button, TouchableOpacity,Text } from "react-native";
import TextField from "../../components/TextField";
const CreditCardForm = () => {

    const [cardHolder, setCardHolder] = useState("");
    const [errorCardHolder, setErrorCardHolder] = useState("");
    
    const [cardNumber, setCardNumber] = useState("");
    const [errorCardNumber, setErrorCardNumber] = useState("");

    const [expiration, setExpiration] = useState("");
    const [errorExpiration, setErrorExpiration] = useState("");
    
    const [cvv, setCvv] = useState("");
    const [errorCvv, setErrorCvv] = useState("");

    const handleCardNumberChange = (text: string): void => {
      // Eliminar cualquier caracter no numérico
      let formattedText: string = text.replace(/\D/g, "");

      // Agregar un espacio cada 4 dígitos
      if (formattedText.length > 0) {
        formattedText = formattedText
          .match(new RegExp(".{1,4}", "g"))!
          .join(" ");
      }

      // Limitar la longitud a 19 caracteres (16 dígitos + 3 espacios)
      if (formattedText.length <= 19) {
        setCardNumber(formattedText);
      }
    };

    const handleExpiryDateChange = (text:string) => {
        // Eliminar cualquier caracter no numérico
        let formattedText = text.replace(/\D/g, "");

        // Agregar una barra después de los primeros 2 dígitos
        if (formattedText.length > 2) {
        formattedText = formattedText.slice(0, 2) + "/" + formattedText.slice(2);
        }

        setExpiration(formattedText);
    };

    const handleCvvChange = (text: string) => {
      // Limitar la longitud del CVV a 3 caracteres
      if (text.length <= 3) {
        setCvv(text);
      }
    };


    function onSubmit() {
      console.log("Card Number:", cardNumber);
      console.log("Card Number Length:", cardNumber.replace(/\D/g, "").length);
      console.log("Expiry Date:", expiration);
      console.log("CVV:", cvv);
      console.log("Card Holder Name:", cardHolder);

      if (cardHolder.length == 0) {
        setErrorCardHolder("Este campo es requerido");
        return;
      } else {
        setErrorCardHolder("");
      }
      if (cardNumber.length == 0) {
        setErrorCardNumber("Este campo es requerido");
        return;
      } else {
        setErrorCardNumber("");
      }

      if (cardNumber.replace(/\D/g, "").length !== 16) {
        setErrorCardNumber("Favor de establecer 16 dígitos");
        return;
      } else {
        setErrorCardNumber("");
      }

      if (expiration.trim().length == 0) {
        setErrorExpiration("Este campo es requerido");
        return;
      } else {
        setErrorExpiration("");
      }

      // Validar la fecha de vencimiento
      const formattedExpiryDate = expiration.replace(/\s/g, ""); // Eliminar espacios en blanco
      const regex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;

      if (!regex.test(formattedExpiryDate)) {
        setErrorExpiration("El formato de la fecha de vencimiento debe ser MM/YY");
        return;
      }

      const [month, year] = formattedExpiryDate.split("/");
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;

      if (
        parseInt(year, 10) < currentYear ||
        (parseInt(year, 10) === currentYear &&
          parseInt(month, 10) < currentMonth)
      ) {
        setErrorExpiration("La tarjeta está vencida");
        return;
      }

      setErrorExpiration("")

      if (cvv.length == 0) {
        setErrorCvv("Este campo es requerido");
        return;
      } else {
        setErrorCvv("");
      }
    }
    return (
      <View>
        <TextField
          style={styles.textField}
          label="Nombre del Titular"
          errorText={errorCardHolder}
          value={cardHolder}
          onChangeText={(text) => setCardHolder(text)}
        />
        <TextField
          style={styles.textField}
          label="Número de Tarjeta"
          keyboardType="numeric"
          errorText={errorCardNumber}
          value={cardNumber}
          onChangeText={handleCardNumberChange}
        />
        <View style={styles.row}>
          <TextField
            style={[
              styles.textField,
              {
                marginRight: 24,
              },
            ]}
            label="Vencimiento MM/YY"
            keyboardType="numeric"
            errorText={errorExpiration}
            value={expiration}
            onChangeText={handleExpiryDateChange}
          />
          <TextField
            style={styles.textField}
            label="CVV"
            keyboardType="numeric"
            errorText={errorCvv}
            value={cvv}
            onChangeText={handleCvvChange}
          />
        </View>
        <TouchableOpacity onPress={onSubmit} style={styles.styleButton}>
          <Text style={{ color: "white" }}>Pagar</Text>
        </TouchableOpacity>
      </View>
    );
};
const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 36,
  },
  textField: {
    flex: 1,
    marginTop: 24,
  },
  styleButton: {
    padding: 10,
    //width: "80%",
    backgroundColor: "#FAA029",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 15,
    alignContent: "center",
    fontFamily: "Gotham-Medium",
  },
});
export default CreditCardForm;
