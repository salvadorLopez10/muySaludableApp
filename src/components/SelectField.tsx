import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  TouchableHighlight,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

interface Item {
  id: string;
  label: string;
}

interface SelectFieldProps {
  data: Item[];
  keyboardType?: string;
  onItemSelected: (value: string) => void;
}

const SelectField = ({ data, keyboardType = "default", onItemSelected }:SelectFieldProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [touchedItem, setTouchedItem] = useState<string | null>(null);

  //const data = heightOptionsSelect;

  const filteredData = data.filter((item) =>
    item.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInputChange = (text: string) => {
    setSearchQuery(text);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handleItemSelect = (item: Item) => {
    setSelectedValue(item.label);
    onItemSelected(item.id);
    setModalVisible(false);
  };

  const handleTouch = (itemLabel: string) => {
    setTouchedItem(itemLabel);
  };

  const handleModalShow = () => {
    setSearchQuery("");
    setModalVisible(true);
    setTouchedItem(null);
  };
  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableHighlight
        activeOpacity={0.8}
        underlayColor="#FFFFF"
        style={styles.inputContainer}
        onPress={handleModalShow}
      >
        <View style={styles.selectContainer}>
          <TextInput
            style={styles.inputTextStyle}
            placeholder="Selecciona una opción"
            value={selectedValue}
            editable={false}
          />
          <View style={{ alignItems: "flex-end", backgroundColor:"white" }}>
               <Icon name="angle-down" size={20} color="#2A261B" />
          </View>
          {/* <Icon name="angle-down" size={20} color="#2A261B" /> */}
        </View>
      </TouchableHighlight>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeIcon} onPress={handleModalClose}>
            <Icon name="times" size={20} color="white" />
          </TouchableOpacity>
          <View style={styles.modalContent}>
            <View style={styles.inputContainerSearch}>
              <TextInput
                style={styles.inputTextStyleBuscar}
                placeholder="Buscar"
                keyboardType={keyboardType as any}
                onChangeText={handleInputChange}
                value={searchQuery}
              />
              {searchQuery !== "" && (
                <TouchableHighlight onPress={handleClearSearch}>
                  <Icon name="times" size={20} color="#2A261B" />
                </TouchableHighlight>
              )}
            </View>

            <FlatList
              data={filteredData}
              style={styles.flatListStyle}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableHighlight
                  style={styles.contenedorItem}
                  onPress={() => handleItemSelect(item)}
                  onShowUnderlay={() => handleTouch(item.label)}
                  onHideUnderlay={() => handleTouch("")}
                  underlayColor={
                    touchedItem === item.label ? "lightgray" : "lightgray"
                  }
                >
                  <View style={styles.listItem}>
                    <Text style={styles.textItem}>{item.label}</Text>
                  </View>
                </TouchableHighlight>
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    justifyContent: "center",
    //padding: 16,
    width: "80%",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(23, 12, 12, 0.5)", // Fondo oscuro del modal
  },
  modalContent: {
    width: "80%",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    //height: "40%",
    flexBasis: "auto", //Ajusta la altura con base a la altura de su contenido
    maxHeight: "40%",
  },
  closeIcon: {
    //position: "absolute",
    alignSelf: "flex-end",
    margin: 15,
    right: 20,
  },
  inputTextStyle: {
    color: "#2A261B",
    fontFamily: "Gotham-Medium",
    padding: 10,
    textAlign: "center",
    backgroundColor: "white",
    width: "80%"
  },
  inputTextStyleBuscar:{
    color: "#2A261B",
    fontFamily: "Gotham-Medium",
    paddingVertical: 10,
    paddingHorizontal: 10,
    textAlign: "center",
    backgroundColor: "white",
    flex: 1
  },
  flatListStyle: {
    width: "80%",
  },
  contenedorItem: {
    //width: '90%',
  },
  listItem: {
    paddingVertical: 10,
    width: "100%",
  },
  textItem: {
    color: "#2A261B",
    //fontWeight: "bold",
    fontFamily: "Gotham-Medium",
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
  },
  textCancelarDropdown: {
    marginTop: 5,
  },
  inputContainer: {
    // flexDirection: "row",
    // alignItems: "center",
    // width: "90%",
    // backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
  },
  selectContainer: {
    flexDirection: "row",
    //padding: 10,
    //width: "90%",
    alignItems: "center",
    backgroundColor: "white", // Fondo blanco
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    //paddingHorizontal: 10,
    justifyContent: "center",
  },
  inputContainerSearch: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    //backgroundColor: "blue", // Fondo blanco
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    width: "100%",
    marginBottom: 5,
  },
});

export default SelectField;
