import React, { useEffect, useState } from "react";
import { View,Text,TextInput,Modal,TouchableHighlight,TouchableOpacity,FlatList,StyleSheet } from "react-native";
import { CheckBox } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

interface Item {
  id: string;
  label: string;
}

interface SelectFieldProps {
  data: Item[];
  keyboardType?: string;
  onItemSelected: (array: Item[]) => void;
}

const MultiSelectField = ({ data, keyboardType = "default", onItemSelected }: SelectFieldProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [touchedItem, setTouchedItem] = useState<string | null>(null);


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
    // Verificar si el elemento ya está seleccionado
    const isSelected = selectedItems.some( (selectedItem:Item) => selectedItem.id === item.id );

    if (isSelected) {
      // Si está seleccionado, quitarlo de la lista de seleccionados
      const updatedSelectedItems = selectedItems.filter(
        (selectedItem:Item) => selectedItem.id !== item.id
      );
      setSelectedItems(updatedSelectedItems);
      onItemSelected(updatedSelectedItems)
    } else {
      // Si no está seleccionado, agregarlo a la lista de seleccionados
      setSelectedItems([...selectedItems, item]);
      onItemSelected([...selectedItems, item]);
    }
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

  const confirmSelection = () => {
    setModalVisible(false);
  };

//   useEffect(() => {
//     // Restablece selectedItems al mostrar el modal
//     setSelectedItems([]);
//   }, [modalVisible]);

  return (
    <View style={styles.container}>
      <TouchableHighlight
        activeOpacity={0.8}
        underlayColor="#FFFFF"
        onPress={handleModalShow}
      >
        <View style={styles.selectContainer}>
          <TextInput
            style={styles.inputTextStyle}
            placeholder="Selecciona una opción"
            value={selectedItems.map((item) => item.label).join(", ")} // Mostrar elementos seleccionados
            editable={false}
          />
          <Icon name="angle-down" size={20} color="#2A261B" />
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
                  <View style={styles.listItemContainer}>
                    <CheckBox
                      checkedColor="#F79E04"
                      checked={selectedItems.some(
                        (selectedItem) => selectedItem.id === item.id
                      )}
                      onPress={() => handleItemSelect(item)}
                    />
                    <Text style={styles.listItemText}>{item.label}</Text>
                  </View>
                </TouchableHighlight>
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />

            <TouchableOpacity
              onPress={confirmSelection}
              style={styles.styleButtonConfirm}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Confirmar
              </Text>
            </TouchableOpacity>
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
    height: "40%",
  },
  closeIcon: {
    //position: "absolute",
    alignSelf: "flex-end",
    margin: 15,
    right: 20,
  },
  inputTextStyle: {
    // color: "#2A261B",
    // fontWeight: "bold",
    // padding: 10,
    // marginTop: 10,
    // textAlign: "center",
    // backgroundColor: "white",
    // width: "80%",
    color: "#2A261B",
    //fontWeight: "bold",
    fontFamily: "Gotham-Medium",
    padding: 10,
    //marginTop: 10,
    textAlign: "center",
    backgroundColor: "white",
    //justifyContent: "center",
    width: "80%",
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
    //width: 200,
    width:'90%',
    flexDirection: "row",
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
    // flexDirection: "row",
    // alignItems: "center",
    // backgroundColor: "white", // Fondo blanco
    // borderWidth: 1,
    // borderColor: "#ccc",
    // borderRadius: 15,
    // paddingHorizontal: 10,
    // justifyContent: "space-between",
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
    backgroundColor: "white", // Fondo blanco
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    width: "100%",
    marginBottom: 5,
  },
  listItemContainer: {
    flexDirection: "row", // Muestra los elementos en la misma fila
    alignItems: "center",
    //paddingVertical: 5,
  },
  listItemText: {
    //marginLeft: 5,
    color: "#2A261B",
    fontWeight: "bold",
    fontFamily: "Gotham-Medium",
  },
  styleButtonConfirm: {
    padding: 10,
    width: "80%",
    backgroundColor: "#F79E04",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 15,
  },
});

export default MultiSelectField;
