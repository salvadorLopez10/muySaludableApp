import React, { useEffect, useState } from "react";
import { StyleSheet, View, Button, TouchableOpacity,Text, TouchableHighlight } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
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
    inputEditable,
    textButtonDiscount,
    onChange,
    setInputEditable,
    clearDiscountCode,
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
  useEffect(() => {
    //Se aplica useEffect ya que no se estaba limpiando el campo del código de descuento si se llamaba la función de limpieza en el ViewModel
    //sobre la función handleValidateDiscount que se ejecuta al dar click en el botón para validar descuento
    if (textButtonDiscount === "Validar descuento") {
      clearDiscountCode();
    }
  }, [textButtonDiscount]);
  return (
    <View>
      <View style={styles.rowDiscount}>
        <TextField
          style={styles.textFieldDiscount}
          label="Código de descuento"
          // errorText={errorCardHolder}
          value={discountCode}
          styleEditable={inputEditable}
          onChangeText={(text) => onChange("discountCode", text)}
        />

        <TouchableOpacity
          onPress={() => handleValidateDiscount(discountCode)}
          style={styles.buttonDiscount}
        >
          <Text style={{ color: "#ffffff", fontFamily: "Gotham-Medium" }}>
            {textButtonDiscount}
          </Text>
        </TouchableOpacity>
      </View>
      <TextField
        //style={styles.textField}
        style={[
          styles.textField,
          !inputEditable && { backgroundColor: "#EEEEEE" },
        ]} //Background gris para mostrar deshabilitado el campo
        label="Nombre del Titular"
        errorText={errorCardHolder}
        styleEditable={inputEditable}
        value={cardHolder}
        // onChangeText={(text) => setCardHolder(text)}
        autoCapitalize={"characters"}
        editable={inputEditable}
        onChangeText={(text) => onChange("cardHolder", text)}
      />
      <TextField
        //style={styles.textField}
        style={[
          styles.textField,
          !inputEditable && { backgroundColor: "#EEEEEE" },
        ]}
        label="Número de Tarjeta"
        keyboardType="numeric"
        errorText={errorCardNumber}
        styleEditable={inputEditable}
        value={cardNumber}
        editable={inputEditable}
        onChangeText={handleCardNumberChange}
      />
      <View style={styles.row}>
        <TextField
          // style={[
          //   styles.textField,
          //   {
          //     marginRight: 24,
          //   },
          // ]}
          style={[
            styles.textField,
            { marginRight: 24 },
            !inputEditable && { backgroundColor: "#EEEEEE" },
          ]}
          label="Expiración MM/YY"
          keyboardType="numeric"
          errorText={errorExpiration}
          styleEditable={inputEditable}
          value={expiration}
          editable={inputEditable}
          onChangeText={handleExpiryDateChange}
        />
        <TextField
          //style={styles.textField}
          style={[
            styles.textField,
            !inputEditable && { backgroundColor: "#EEEEEE" },
          ]}
          label="CVC"
          keyboardType="numeric"
          errorText={errorCvv}
          styleEditable={inputEditable}
          value={cvv}
          maxLength={4}
          editable={inputEditable}
          onChangeText={handleCvvChange}
        />
      </View>
      <TouchableOpacity onPress={onSubmitPayment} style={styles.styleButton}>
        <Text style={{ color: "white" }}>
          {inputEditable ? "Pagar" : "Registrar"}
        </Text>
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
  deleteCuppon: {
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
