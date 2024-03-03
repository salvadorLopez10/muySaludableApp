import React,{useEffect, useState} from 'react'
// @ts-ignore
import stripe from "react-native-stripe-client";

const PaymentScreenViewModel = () => {

  const [values, setValues] = useState({
    cardHolder: "",
    errorCardHolder: "",
    cardNumber: "",
    errorCardNumber: "",
    expiration: "",
    errorExpiration: "",
    cvv: "",
    errorCvv: ""
  });

  useEffect(() => {
    console.log("EFFECT VALUES CREDITCARDFORM");
    console.log("VALUES: "+ JSON.stringify(values,null,3));

    if( values.cardNumber !=='' && values.expiration !== '' && values.cvv !=="" ){
      createTokenPayment();
    }
    else{
      console.log("DATOS INCOMPLETOS");
    }
    
  }, [values])
  
  const stripeClient = stripe("pk_test_51Oq6azDzbFBwqYhA6mgKDESqSCCkb35K5f50LwY2MWh5QWYjm756QnFTrWt14E8lJNMttoxiYs7CXOYlmgjRdsOy00xHRmKGWg");

  const createTokenPayment = async () => {
    const response = await stripeClient.createToken({
      card: {
        number: values.cardNumber.replace(/\s/g, ""),
        exp_month: parseInt(values.expiration.split("/")[0]),
        exp_year: parseInt("20" + values.expiration.split("/")[1]),
        cvc: values.cvv,
      }, 
    });

    console.log("RESPONSE STRIPE: " + JSON.stringify(response,null,3));
  }

  const onChange = (property: string, value: any) => {
    //Cada que se detecte que se tiene valor en la variable, se limpia el error
    let errorPropertyName = "error" + property.charAt(0).toUpperCase() + property.slice(1);
    if (values.hasOwnProperty(errorPropertyName) && value.trim().length > 0) {
        setValues({ ...values, [property]: value, [errorPropertyName]: "" });
    } else {
        setValues({ ...values, [property]: value });
    }
  }; 

  const handleCardNumberChange = (text: string): void => {
    // Eliminar cualquier caracter no numérico
    let formattedText: string = text.replace(/\D/g, "");

    // Agregar un espacio cada 4 dígitos
    if (formattedText.length > 0) {
      formattedText = formattedText.match(new RegExp(".{1,4}", "g"))!.join(" ");
    }

    // Limitar la longitud a 19 caracteres (16 dígitos + 3 espacios)
    if (formattedText.length <= 19) {
      //setCardNumber(formattedText);
      onChange("cardNumber",formattedText);
    }
  };

  const handleExpiryDateChange = (text:string) => {
        // Eliminar cualquier caracter no numérico
        let formattedText = text.replace(/\D/g, "");

        // Agregar una barra después de los primeros 2 dígitos
        if (formattedText.length > 2) {
        formattedText = formattedText.slice(0, 2) + "/" + formattedText.slice(2);
        }

        //setExpiration(formattedText);
        onChange("expiration", formattedText);
    };

  const handleCvvChange = (text: string) => {
    // Limitar la longitud del CVV a 3 caracteres
    if (text.length <= 3) {
      //setCvv(text);
      onChange("cvv", text);
    }
  };

  function onSubmitPayment() {

    console.log("DESDE VIEWMODEL MODIFICANDO ERRORES");
    // console.log("Card Number:", values.cardNumber);
    // console.log("Card Number Length:", values.cardNumber.replace(/\D/g, "").length);
    // console.log("Expiry Date:", values.expiration);
    // console.log("CVV:", values.cvv);
    // console.log("Card Holder Name:", values.cardHolder);
    console.log("ANTES");
    console.log("ERRORES", JSON.stringify(values));

    // Validar cardHolder
    if (values.cardHolder.trim().length === 0) {
      onChange("errorCardHolder", "Este campo es requerido");
      return;
    } else {
      onChange("errorCardHolder", "");
    }

    // Validar cardNumber
    if (values.cardNumber.trim().length === 0) {
      onChange("errorCardHolder", "");
      onChange("errorCardNumber", "Este campo es requerido");
      return;
    } else if (values.cardNumber.replace(/\D/g, "").length !== 16) {
      onChange("errorCardNumber", "Favor de establecer 16 dígitos");
      return;
    } else {
      onChange("errorCardNumber", "");
    }

    if (values.expiration.trim().length === 0) {
      onChange("errorExpiration", "Este campo es requerido");
      return;
    } else {
      const formattedExpiryDate = values.expiration.replace(/\s/g, ""); // Eliminar espacios en blanco
      const regex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;

      if (!regex.test(formattedExpiryDate)) {
        onChange(
          "errorExpiration",
          "El formato de la fecha de vencimiento debe ser MM/YY"
        );
        return;
      } else {
        const [month, year] = formattedExpiryDate.split("/");
        const currentYear = new Date().getFullYear() % 100;
        const currentMonth = new Date().getMonth() + 1;

        if (
          parseInt(year, 10) < currentYear ||
          (parseInt(year, 10) === currentYear &&
            parseInt(month, 10) < currentMonth)
        ) {
          onChange("errorExpiration", "La tarjeta está vencida");
          return;
        } else {
          onChange("errorExpiration", "");
        }
      }
    }

    if (values.cvv.trim().length === 0) {
      //setErrorCvv("Este campo es requerido");
      onChange("errorCvv", "Este campo es requerido");
      return;
    } else {
      //setErrorCvv("");
      onChange("errorCvv", "");
    }

    console.log("DESPUÉS");
    console.log("ERRORES", JSON.stringify(values));
  }

  return {
    ...values,
    onChange,
    handleCardNumberChange,
    handleExpiryDateChange,
    handleCvvChange,
    onSubmitPayment,
  };
};

export default PaymentScreenViewModel;