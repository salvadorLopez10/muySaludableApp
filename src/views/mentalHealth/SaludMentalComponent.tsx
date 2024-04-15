import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import styles from "./Styles";

interface Props {
  string: string;
}

const SaludMentalComponent: React.FC<Props> = ({ string }) => {
  // Divide el string en partes usando las etiquetas como delimitadores
  const parts = string.split(/<(\/?[^>]+)>/).filter((part) => !!part.trim());

  // Inicializa un array para almacenar los componentes a renderizar
  const components: JSX.Element[] = [];

  // Itera sobre las partes del string
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    // Si la parte actual es un título, renderiza un Text con estilo "title"
    if (part === "title") {
      components.push(
        <Text key={i} style={styles.titleText}>
          {parts[i + 1]}
          {"\n"}
        </Text>
      );
      i++; // Incrementa el índice para evitar renderizar el contenido del título como un componente
    }
    // Si la parte actual es un contenido, renderiza un Text con estilo "content"
    else if (part === "content") {
      components.push(
        <Text key={i} style={styles.textContent}>
          {parts[i + 1]}
          {"\n"}
        </Text>
      );
      i++; // Incrementa el índice para evitar renderizar el contenido del contenido como un componente
    }
    // Si la parte actual es una imagen, renderiza un Image
    else if (part === "image") {
      components.push(
        <Image key={i} source={{ uri: parts[i + 1] }} style={styles.image} />
      );
      i++; // Incrementa el índice para evitar renderizar el contenido de la imagen como un componente
    }
  }

  return (
    //<ScrollView>
    <View style={styles.containerText}>{components}</View>
    //</ScrollView>
  );
};

export default SaludMentalComponent;
