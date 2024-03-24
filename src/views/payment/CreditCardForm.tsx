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
  fechaExpiracionProp: string;
  setLoading: (val: boolean) => void;
  setCurrentPrice: (val: string) => void;
}
const CreditCardForm = ({
  emailProp,
  precioProp,
  planProp,
  idPlanProp,
  fechaExpiracionProp,
  setLoading,
  setCurrentPrice,
}: ComponentsCreditCard) => {
  const {
    discountCode,
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
    indicatorVisible,
    disableButton,
    onChange,
    handleValidateDiscount,
    handleCardNumberChange,
    handleExpiryDateChange,
    handleCvvChange,
    onSubmitPayment,
    closeErrorModal,
    handlePassword,
    handleConfirmPassword,
    closeSuccessModal,
    handleConfirmContinue,
  } = useViewModel({
    emailProp,
    precioProp,
    planProp,
    idPlanProp,
    fechaExpiracionProp,
    setLoading,
    setCurrentPrice
  });

  return (
    <View>
      <View style={styles.rowDiscount}>
        <TextField
          style={styles.textFieldDiscount}
          label="Código de descuento"
          // errorText={errorCardHolder}
          value={discountCode}
          // onChangeText={(text) => setCardHolder(text)}
          onChangeText={(text) => onChange("discountCode", text)}
        />

        <TouchableOpacity
          onPress={() => handleValidateDiscount(discountCode)}
          style={styles.buttonDiscount}
        >
          <Text style={{ color: "#ffffff", fontFamily: "Gotham-Medium" }}>
            Validar descuento
          </Text>
        </TouchableOpacity>
      </View>
      <TextField
        style={styles.textField}
        label="Nombre del Titular"
        errorText={errorCardHolder}
        value={cardHolder}
        // onChangeText={(text) => setCardHolder(text)}
        onChangeText={(text) => onChange("cardHolder", text.toUpperCase())}
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
        visibleIndicator={indicatorVisible}
        disableButton={disableButton}
        handlePassword={(text: string) => handlePassword(text)}
        handleConfirmPassword={(text: string) => handleConfirmPassword(text)}
        onConfirmContinue={handleConfirmContinue}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  rowDiscount: {
    flexDirection: "row",
  },
  textFieldDiscount: {
    flex: 1,
    marginTop: "10%",
    marginRight: 24,
    fontFamily: "Gotham-Medium",
  },
  buttonDiscount: {
    flex: 1,
    backgroundColor: "#FAA029",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FAA029",
    borderRadius: 15,
    marginTop: "10%",
    justifyContent: "center",
    fontFamily: "Gotham-Medium",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    marginBottom: "10%",
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
