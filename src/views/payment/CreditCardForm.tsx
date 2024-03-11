import React, { useEffect, useState } from "react";
import { StyleSheet, View, Button, TouchableOpacity,Text } from "react-native";
import TextField from "../../components/TextField";
import useViewModel from './ViewModel';
import ModalError from "./ModalError";
import ModalSuccess from "./ModalSuccess";

interface ComponentsCreditCard {
  emailProp: string;
  precioProp: string;
  planProp: string;
  idPlanProp: number;
  setLoading: ( val: boolean ) => void;
}
const CreditCardForm = ({
  emailProp,
  precioProp,
  planProp,
  idPlanProp,
  setLoading,
}: ComponentsCreditCard) => {
  const {
    cardHolder,
    errorCardHolder,
    cardNumber,
    errorCardNumber,
    expiration,
    errorExpiration,
    cvv,
    errorCvv,
    modalErrorVisible,
    modalSuccessVisible,
    password,
    confirmPassword,
    onChange,
    handleCardNumberChange,
    handleExpiryDateChange,
    handleCvvChange,
    onSubmitPayment,
    closeErrorModal,
    handlePassword,
    handleConfirmPassword,
    closeSuccessModal,
    handleConfirmContinue,
  } = useViewModel({ emailProp, precioProp, planProp, idPlanProp, setLoading });

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
          label="CVC"
          keyboardType="numeric"
          errorText={errorCvv}
          value={cvv}
          maxLength={4}
          onChangeText={handleCvvChange}
        />
      </View>
      <TouchableOpacity onPress={onSubmitPayment} style={styles.styleButton}>
        <Text style={{ color: "white" }}>Pagar</Text>
      </TouchableOpacity>

      <ModalError visible={modalErrorVisible} onClose={closeErrorModal} />
      <ModalSuccess
        visible={modalSuccessVisible}
        password={password}
        confirmPassword={confirmPassword}
        handlePassword={(text: string) => handlePassword(text)}
        handleConfirmPassword={(text: string) => handleConfirmPassword(text)}
        onConfirmContinue={handleConfirmContinue}
      />
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
