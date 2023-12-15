import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";
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
      <Swiper style={styles.wrapper} showsButtons={true}>
        <View style={styles.slide1}>
          <Text style={styles.text}>¿Cuál es tu nombre?</Text>
          <TextInput placeholderTextColor="#d1cccc"
                        placeholder="Ingresa tu nombre"/>
        </View>
        <View style={styles.slide2}>
          <Text style={styles.text}>Beautiful</Text>
        </View>
        <View style={styles.slide3}>
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
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5",
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default QuizScreen;