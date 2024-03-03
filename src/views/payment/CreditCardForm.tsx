import React, { useState } from "react";
import { StyleSheet, View, Button, TouchableOpacity,Text } from "react-native";
import TextField from "../../components/TextField";
import useViewModel from './ViewModel';
const CreditCardForm = () => {

    const { 
      cardHolder,
      errorCardHolder,
      cardNumber,
      errorCardNumber,
      expiration,
      errorExpiration,
      cvv,
      errorCvv,
      onChange,
      handleCardNumberChange,
      handleExpiryDateChange,
      handleCvvChange, 
      onSubmitPayment 
    } = useViewModel();

    return (
      <View>
        <TextField
          style={styles.textField}
          label="Nombre del Titular"
          errorText={errorCardHolder}
          value={cardHolder}
          // onChangeText={(text) => setCardHolder(text)}
          onChangeText={(text) => onChange("cardHolder", text)}
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
        <TouchableOpacity onPress={onSubmitPayment} style={styles.styleButton}>
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
