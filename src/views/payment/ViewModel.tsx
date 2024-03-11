import React,{useEffect, useState} from 'react'
// @ts-ignore
import stripe from "react-native-stripe-client";
import { MuySaludableApi } from '../../api/MuySaludableApi';
import { AxiosError } from 'axios';
import { Alert } from 'react-native';


interface ComponentsCreditCard {
  emailProp: string;
  precioProp: string;
  planProp: string;
  idPlanProp: number;
  setLoading: (val: boolean) => void;
}

const PaymentScreenViewModel = ({ emailProp, precioProp, planProp,idPlanProp, setLoading }: ComponentsCreditCard) => {
  const [values, setValues] = useState({
    cardHolder: "",
    errorCardHolder: "",
    cardNumber: "",
    errorCardNumber: "",
    expiration: "",
    errorExpiration: "",
    cvv: "",
    errorCvv: "",
    precio: precioProp,
    email: emailProp,
    plan: planProp,
    idPlan: idPlanProp,
    modalErrorVisible: false,
    modalSuccessVisible: false,
    password: "",
    confirmPassword: "",
    idPago: "",
  });

  useEffect(() => {
    // console.log("EFFECT VALUES CREDITCARDFORM");
    // console.log("VALUES: " + JSON.stringify(values, null, 3));
  }, [values]);

  //Se utiliza este useEffect para establecer los valores de email y precio  que vienen a través del padre CreditCardForm
  useEffect(() => {
    setValues((prevState) => ({
      ...prevState,
      precio: precioProp,
      email: emailProp,
    }));
  }, [emailProp, precioProp]);

  const stripeClient = stripe(
    "pk_test_51Oq6azDzbFBwqYhA6mgKDESqSCCkb35K5f50LwY2MWh5QWYjm756QnFTrWt14E8lJNMttoxiYs7CXOYlmgjRdsOy00xHRmKGWg"
  );

  const createTokenPayment = async () => {
    const response = await stripeClient.createToken({
      card: {
        number: values.cardNumber.replace(/\s/g, ""),
        exp_month: parseInt(values.expiration.split("/")[0]),
        exp_year: parseInt("20" + values.expiration.split("/")[1]),
        cvc: values.cvv,
      },
    });

    console.log("RESPONSE STRIPE: " + JSON.stringify(response, null, 3));

    if (response.id !== undefined && response.id !== null) {
      //Mandar a llamar el post del endpoint de stripe para generar el pago
      //el endpoint espera: amount, id (token de stripe), description (para identificar el plan contratado)
      console.log(
        "SE MANDA EL PAGO STRIPE CON EL TOKEN OBTENIDO : " + response.id
      );

      
      setLoading(true);
      const body = {
        id: response.id,
        amount: parseInt(values.precio) * 100,
        plan: values.plan
      };

      const responsePayment = await MuySaludableApi.post(
        "/stripe/create",
        body
      ).then((respuesta) => {
          
          console.log("RESPUESTA PAGO");
          console.log(JSON.stringify(respuesta, null, 2));

          //Se obtiene ID de pago
          setIdPago(respuesta.data.data.id);

          //Inserta usuario con su suscripción
          const bodyUser = {
            "email": values.email
          };
          console.log("BODY USER");
          console.log(JSON.stringify(bodyUser, null, 2));

          const usuario = MuySaludableApi.post("/usuarios", bodyUser)
            .then((responseUsuario) => {
              console.log("RESPUESTA CREACIÓN DE USUARIO");
              console.log(JSON.stringify(responseUsuario, null, 2));
              //Una vez creado el usuario, se procede a generar el registro de suscripción
              const bodySuscripcion = {
                id_usuario: responseUsuario.data.data.id,
                id_plan_alimenticio: values.idPlan,
                id_pago: respuesta.data.data.id,
                fecha_expiracion: "2024-04-03 23:55:00",
                estado: "Activo",
              };
              console.log(JSON.stringify(bodySuscripcion, null, 2));
              //Una vez creado el usuario, se procede a generar el registro de suscripción
              const suscripción = MuySaludableApi.post("/suscripciones", bodySuscripcion)
                .then((responseSuscripcion) => {
                  console.log("RESPUESTA SUSCRIPCIÓN");
                  console.log(JSON.stringify(responseSuscripcion, null, 2));
                  
                  setLoading(false);

                  //Muestra ventana modal para establecer contraseña
                  showSuccessModal();
                }).catch((errorSuscripcion) => {
                   setLoading(false);
                   console.log("Mensaje de error en suscripción: ",errorSuscripcion.response.data.message);

                });


            }).catch((errorUsuario) => {
               setLoading(false);
               console.log("Mensaje de error en creación de usuario: ",errorUsuario.response.data.message);

            });


          

      }).catch(error => {
        // Manejar el error
          setLoading(false);
          console.log("ERROR POST PAGO CATCH BLOQUE");
          //console.log(`Error: ${(error as AxiosError)?.response?.data}`);

        if (error.response && error.response.data) {
          if( !error.response.data.success ){
              showErrorModal();
              console.log("Mensaje de error: ", error.response.data.message);
          }
        } else {
          console.log("Error en la transacción SIN DATA:", error.message);
        }
      });
       
    } else {
      console.log("NO SE MANDA EL PAGO");
    }
  };

  const onChange = (property: string, value: any) => {
    //Cada que se detecte que se tiene valor en la variable, se limpia el error
    let errorPropertyName =
      "error" + property.charAt(0).toUpperCase() + property.slice(1);
    if (values.hasOwnProperty(errorPropertyName) && value.trim().length > 0) {
      setValues({ ...values, [property]: value, [errorPropertyName]: "" });
    } else {
      setValues({ ...values, [property]: value });
    }
  };

  const showErrorModal = () => {
    onChange("modalErrorVisible", true);
  };

  const closeErrorModal = () => {
     onChange("modalErrorVisible", false);
  };
  
  const handlePassword = (text: string) => {
    onChange("password", text);
  };

  const handleConfirmPassword = (text: string) => {
    onChange("confirmPassword", text);
  };

  const showSuccessModal = () => {
    onChange("modalSuccessVisible", true);
  };

  const closeSuccessModal = () => {
    onChange("modalSuccessVisible", false);
  };

  const setIdPago = (id: string) => {
    onChange("idPago", id);
    
  };

  const handleConfirmContinue = () => {

    console.log("PASSWORD");
    console.log(values.password, values.confirmPassword);

    if( values.password.trim().length < 8 ){
      Alert.alert("Error","La contraseña debe tener al menos 8 caracteres");
      return;
    }

    if (values.confirmPassword.trim().length == 0) {
      Alert.alert("Error", "Por favor confirma la contraseña");
      return;
    }

    if ( values.password.trim() !== values.confirmPassword.trim() ) {
      Alert.alert("Error", "Las contraseñas no coinciden, favor de verificar");
      return;
    }

    //ToDo: NAVEGA A LA PANTALLA DE QUIZ Y ACTUALIZA USUARIO CON SU CONTRASEÑA



  }

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
      onChange("cardNumber", formattedText);
    }
  };

  const handleExpiryDateChange = (text: string) => {
    // Eliminar cualquier caracter no numérico
    let formattedText = text.replace(/\D/g, "");

    // Agregar una barra después de los primeros 2 dígitos
    if (formattedText.length > 2) {
      formattedText = formattedText.slice(0, 2) + "/" + formattedText.slice(2);
    }

    //setExpiration(formattedText);
    onChange("expiration", formattedText);
  };

  function isAmex(cardNumber: string): boolean {
    // Eliminar espacios en blanco y caracteres no numéricos
    const cleanCardNumber = cardNumber.replace(/\s/g, "").replace(/\D/g, "");

    // El patrón comúnmente utilizado para los números de tarjeta AMEX es que comienzan con 34 o 37
    return /^3[47]\d{13}$/.test(cleanCardNumber);
  }

  const handleCvvChange = (text: string) => {
    onChange("cvv", text);
  };

  

  function onSubmitPayment() {

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
    } else if (values.cardNumber.replace(/\D/g, "").length !== 16 && values.cardNumber.replace(/\D/g, "").length !== 15) {
      onChange("errorCardNumber", "Favor de establecer al menos 15 dígitos");
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
    } else if (values.cvv.trim().length < 3 && values.cvv.trim().length > 4) {
      onChange("errorCvv", "CVC no válido");
    } else {
      //setErrorCvv("");
      onChange("errorCvv", "");
    }

    console.log("PROCEDEMOS A GENERAR EL PAGO");
    console.log("ERRORES", JSON.stringify(values));
    if (
      values.cardNumber !== "" &&
      values.expiration !== "" &&
      values.cvv !== ""
    ) {
      createTokenPayment();
    } else {
      console.log("DATOS INCOMPLETOS, AÚN NO SE MANDA EL PAGO");
    }
  }

  return {
    ...values,
    onChange,
    handleCardNumberChange,
    handleExpiryDateChange,
    handleCvvChange,
    onSubmitPayment,
    showErrorModal,
    closeErrorModal,
    handlePassword,
    handleConfirmPassword,
    showSuccessModal,
    closeSuccessModal,
    handleConfirmContinue
  };
};

export default PaymentScreenViewModel;