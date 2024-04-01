import React from "react";
import styles from "./Styles";
import { ImageBackground, SafeAreaView, Text, View, ScrollView } from 'react-native';

export const PrivacyLegalScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../../../assets/MealPlanBG.jpg")}
        style={styles.imageBackground}
      >
        <ScrollView>
          <View style={styles.containerText}>
            <Text style={styles.subtitleText}>
              Aviso de Privacidad
              {"\n"}
            </Text>
            <Text style={styles.textContent}>
              Muy Saludable se compromete a proteger la privacidad de los
              usuarios de nuestra aplicación móvil. Este aviso de privacidad
              describe cómo recopilamos, utilizamos y protegemos la información
              personal que los usuarios proporcionan al utilizar nuestra
              Aplicación.
            </Text>
            <Text style={styles.subtitleText}>
              Información que recopilamos:
            </Text>

            <Text style={styles.textContent}>
              {"\n"}
              <Text style={styles.subtitleText}>
                Información de Registro:
              </Text>{" "}
              Al registrarse en la Aplicación, podemos solicitar información
              personal como nombre, dirección de correo electrónico, fecha de
              nacimiento, género y otros datos relevantes para la prestación del
              servicio.
              {"\n"}
              {"\n"}
              <Text style={styles.subtitleText}>Información de Uso:</Text>{" "}
              Recopilamos información sobre el uso de la Aplicación, incluidos
              datos sobre interacciones con la aplicación, dispositivos
              utilizados, ubicación aproximada, actividad de navegación y otros
              datos similares.
              {"\n"}
              {"\n"}
            </Text>

            <Text style={styles.subtitleText}>Uso de la información:</Text>

            <Text style={styles.textContent}>
              {"\n"}
              <Text style={styles.subtitleText}>
                Prestación del Servicio:
              </Text>{" "}
              Utilizamos la información recopilada para ofrecer y mantener la
              funcionalidad de la Aplicación, personalizar la experiencia del
              usuario, responder a consultas y proporcionar soporte técnico.
              {"\n"}
              {"\n"}
              <Text style={styles.subtitleText}>Comunicaciones:</Text> Podemos
              utilizar la información de contacto proporcionada por los usuarios
              para enviar comunicaciones relacionadas con el servicio, como
              notificaciones sobre actualizaciones de la aplicación, cambios en
              los términos de servicio o información relevante para el uso
              continuado de la Aplicación.
              {"\n"}
              {"\n"}
            </Text>

            <Text style={styles.subtitleText}>
              Seguridad de la información:
            </Text>
            <Text style={styles.textContent}>
              Implementamos medidas de seguridad apropiadas para proteger la
              información personal contra el acceso no autorizado, la
              alteración, la divulgación o la destrucción no autorizados. Sin
              embargo, debes tener en cuenta que ninguna medida de seguridad es
              completamente infalible
            </Text>
            <Text style={styles.subtitleText}>Derechos del Usuario:</Text>
            <Text style={styles.textContent}>
              Los usuarios tienen derecho a acceder, corregir, actualizar o
              eliminar su información personal en cualquier momento. Si deseas
              ejercer estos derechos o tienes alguna pregunta sobre nuestro
              manejo de datos personales, contáctanos utilizando la información
              proporcionada al final de este aviso de privacidad.
            </Text>

            <Text style={styles.subtitleText}>
              Cambios en este aviso de privacidad:
            </Text>
            <Text style={styles.textContent}>
              Nos reservamos el derecho de actualizar o modificar este aviso de
              privacidad en cualquier momento. Te notificaremos sobre cualquier
              cambio significativo enviando una notificación a la dirección de
              correo electrónico proporcionada o publicando un aviso destacado
              en la Aplicación.
            </Text>

            <Text style={styles.subtitleText}>Contacto:</Text>
            <Text style={styles.textContent}>
              Si tienes alguna pregunta sobre este aviso de privacidad o sobre
              nuestras prácticas de privacidad, no dudes en contactarnos a
              través de{" "}
              <Text style={styles.subtitleText}>danna@muysaludable.com</Text>
            </Text>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};
