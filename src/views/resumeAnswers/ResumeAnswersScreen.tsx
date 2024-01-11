import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StyleSheet
} from "react-native";
import { ListItem, Icon } from "react-native-elements";

interface ElementItem {
  id: string;
  title: string;
}

const ResumeAnswersScreen: React.FC = () => {
  const data: ElementItem[] = Array.from({ length: 16 }, (_, index) => ({
    id: index.toString(),
    title: `Elemento ${index + 1}`,
  }));

  const renderItem = ({ item }: { item: ElementItem }) => (
    <ListItem bottomDivider>
      <Icon name="list" type="font-awesome" />
      <ListItem.Content>
        <ListItem.Title>{item.title}</ListItem.Title>
      </ListItem.Content>
      <TouchableOpacity onPress={() => handleButtonPress(item.id)}>
        <Icon name="arrow-right" type="font-awesome" />
      </TouchableOpacity>
    </ListItem>
  );

  const handleButtonPress = (itemId: string) => {
    // Implementa la lógica al presionar el botón
    console.log(`Botón presionado para el elemento con ID ${itemId}`);
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, marginBottom: 16, marginTop: 20 }}>
        Resumen de Respuestas
      </Text>
      <ScrollView style={{ width: "80%" }}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </ScrollView>

      <View style={styles.containerButton}>
        <TouchableOpacity onPress={() => console.log("CONFIRMANDO")} style={styles.styleCorregirButton}>
          <Text style={{ color: "white" }}>Corregir</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("CONFIRMANDO")} style={styles.styleConfirmarButton}>
          <Text style={{ color: "white" }}>Confirmar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  containerButton: {
    flexDirection: "row",
    marginBottom: 15,
    width: "80%",
    alignItems: "center",
  },
  styleCorregirButton: {
    padding: 10,
    width: "50%",
    backgroundColor: "#c54747",
    alignItems: "center",
    marginTop: 10,
    marginRight: 10,
    borderRadius: 15,
    borderColor: "red"
  },
  styleConfirmarButton: {
    padding: 10,
    width: "50%",
    backgroundColor: "#1257A4",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 15,
  },
});

export default ResumeAnswersScreen;
