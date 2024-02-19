import React, { useState } from "react";
import { StyleSheet, View, Button, TouchableOpacity,Text } from "react-native";
import TextField from "../../components/TextField";
const CreditCardForm = () => {
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvv, setCvv] = useState("");
  function onSubmit() {
    console.log("form submitted");
  }
  return (
    <View>
      <TextField
        style={styles.textField}
        label="Nombre del Titular"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextField
        style={styles.textField}
        label="Número de Tarjeta"
        value={cardNumber}
        onChangeText={(text) => setCardNumber(text)}
      />
      <View style={styles.row}>
        <TextField
          style={[
            styles.textField,
            {
              marginRight: 24,
            },
          ]}
          label="Fecha de expiración"
          value={expiration}
          onChangeText={(text) => setExpiration(text)}
        />
        <TextField
          style={styles.textField}
          label="CVV"
          value={cvv}
          onChangeText={(text) => setCvv(text)}
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
