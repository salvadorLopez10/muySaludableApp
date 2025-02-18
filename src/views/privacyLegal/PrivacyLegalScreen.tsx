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
        <ScrollView style={styles.containerScroll}>
          <View style={styles.containerText}>
            <Text style={styles.subtitleText}>
              Política de Privacidad
              {"\n"}
            </Text>
            <Text style={styles.textContent}>
              <Text style={styles.subtitleText}>Muy Saludable</Text>, operada por <Text style={styles.subtitleText}>ZENITRAMDOM SA DE CV</Text>, se compromete a proteger la privacidad de los usuarios de nuestra aplicación móvil. Este aviso de privacidad describe cómo recopilamos, utilizamos y protegemos la información personal que los usuarios proporcionan al utilizar nuestra aplicación.
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

            <Text style={styles.subtitleText}>Responsable del Tratamiento de Datos</Text>
            <Text style={styles.textContent}>
              <Text style={styles.subtitleText}>Muy Saludable</Text> es operada y administrada por <Text style={styles.subtitleText}>ZENITRAMDOM SA DE CV</Text>,
                una empresa legalmente constituida con domicilio en |domicilio|. Para cualquier consulta sobre esta política de privacidad, puedes contactarnos a través de:
                {"\n"}
                {"\n"}
                
                <Text style={styles.subtitleText}>Correo electrónico:</Text> daniel@muysaludable.com.mx 
                {"\n"}
                <Text style={styles.subtitleText}>Dirección:</Text> Av privada de tules 230, No 48, Bosques del Alba, CP: 54753, Cuautitlán Izcalli, Edo Méx
            </Text>

            <Text style={styles.textContent}>
            {"\n"}
            {"\n"}
              Para más detalles sobre cómo recopilamos, utilizamos y protegemos tu información personal, consulta nuestra Política de Privacidad completa en la dirección: <Text style={styles.subtitleText}>https://muysaludable.com.mx/politica-privacidad.htm</Text>
            </Text>
            
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};
