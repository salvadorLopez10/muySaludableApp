import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput, Image } from "react-native";
import Swiper from "react-native-swiper";

const QuizScreen = () => {
  const [respuestas, setRespuestas] = useState(Array(10).fill(""));

  const handleRespuestaChange = (index:number, respuesta:string) => {
    const nuevasRespuestas = [...respuestas];
    nuevasRespuestas[index] = respuesta;
    setRespuestas(nuevasRespuestas);
  };

  const renderPreguntas = () => {
    return respuestas.map((respuesta, index) => (
      <View key={index} style={styles.preguntaContainer}>
        <Text>Pregunta {index + 1}</Text>
        {/* Aquí puedes utilizar un componente de entrada (TextInput) u otros controles según tus necesidades */}
        <Button
          title="Respuesta 1"
          onPress={() => handleRespuestaChange(index, "Respuesta 1")}
        />
        <Button
          title="Respuesta 2"
          onPress={() => handleRespuestaChange(index, "Respuesta 2")}
        />
        <Button
          title="Respuesta 3"
          onPress={() => handleRespuestaChange(index, "Respuesta 3")}
        />
        <Text>Respuesta seleccionada: {respuesta}</Text>
      </View>
    ));
  };

  const handleSubmit = () => {
    // Aquí puedes hacer algo con las respuestas, por ejemplo, enviarlas a un servidor
    console.log("Respuestas:", respuestas);
  };

  return (
    <View style={styles.container}>
      {/* <Swiper style={styles.swiper} loop={false} showsButtons={true}>
        {renderPreguntas()}
      </Swiper>
      <Button title="Enviar Respuestas" onPress={handleSubmit} /> */}
      <Swiper style={styles.wrapper} showsButtons={true} loop={false}>
        <View style={styles.slide1}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../../../assets/logoMuySaludable.png")}
              style={styles.logoImage}
            />
          </View>
          <View style={styles.containerText}>
            <Text style={styles.text}>¡Bienvenido a Muy Saludable!</Text>
            <View style={styles.contentText}>
              <Text style={styles.text2}>
                Para ayudarte a conseguir los objetivos que deseas queremos
                conocer más de ti
              </Text>
              <Text style={styles.text2}>
                por lo tanto te pedimos que nos apoyes a contestar el
                cuestionario que se presenta a continuación
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.slide2}>
          <Text style={styles.text}>Ingresa tu nombre y apellido</Text>
          <TextInput
            style={styles.textInputStyle}
            placeholderTextColor="#d1cccc"
            placeholder="Ingresa tu nombre"
          />
        </View>
        <View style={styles.slide3}>
          <Text style={styles.text}>Beautiful</Text>
        </View>
        <View style={styles.slide4}>
          <Text style={styles.text}>And simple</Text>
        </View>
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  swiper: {
    flex: 1,
  },
  preguntaContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {},
  textInputStyle: {
    backgroundColor: "white",
    color: "blue",
    padding: 10,
    marginTop: 10,
    width: "80%",
  },
  containerText: {
    width: "80%",
    alignItems: "stretch",
  },
  contentText: {
    marginTop: 20,
  },

  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#c46ec9",
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5",
  },
  slide4: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9",
  },
  text: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
  },
  text2: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  logoContainer: {
    position: "absolute",
    alignSelf: "center",
    top: "15%",
  },
  logoImage: {
    width: 100,
    height: 100,
  },
});

export default QuizScreen;