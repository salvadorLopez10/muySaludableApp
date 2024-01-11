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
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
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
        // style={styles.inputContainer}
        onPress={handleModalShow}
      >
        <View style={styles.selectContainer}>
          <TextInput
            style={styles.inputTextStyle}
            placeholder="Selecciona una opción"
            value={selectedValue}
            editable={false}
          />
          <Icon name="angle-down" size={20} color="#1257A4" />
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
                style={styles.inputTextStyle}
                placeholder="Buscar..."
                keyboardType={keyboardType as any}
                onChangeText={handleInputChange}
                value={searchQuery}
              />
              {searchQuery !== "" && (
                <TouchableHighlight onPress={handleClearSearch}>
                  <Icon name="times" size={20} color="#1257A4" />
                </TouchableHighlight>
              )}
            </View>

            <FlatList
              data={filteredData}
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
                    <Text>{item.label}</Text>
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
    padding: 16,
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
    height: "25%",
  },
  closeIcon: {
    //position: "absolute",
    alignSelf: "flex-end",
    margin: 15,
    right: 20,
  },
  inputTextStyle: {
    color: "#1257A4",
    padding: 10,
    marginTop: 10,
    textAlign: "center",
    backgroundColor: "white",
    width: "80%",
  },
  contenedorItem: {
    width: 200,
  },
  listItem: {
    paddingVertical: 10,
    width: "100%",
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
  },
  textCancelarDropdown: {
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    backgroundColor: "white",
  },
  selectContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white", // Fondo blanco
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  inputContainerSearch: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white", // Fondo blanco
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    width: "100%",
    marginBottom: 5,
  },
});

export default SelectField;
