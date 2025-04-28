import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

interface Props {
    onDateSelected: (age: number, dateBirth: string) => void;
}

const DateOfBirthPicker : React.FC<Props> = ({ onDateSelected }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (date: Date) => {
    setSelectedDate(date);
    const today = new Date();
    let age = today.getFullYear() - date.getFullYear();
    
    const monthDiff = today.getMonth() - date.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
      age--;
    }

    const formattedDate = moment(date).format("YYYY-MM-DD");
    onDateSelected(age, formattedDate); // ← enviamos edad y fecha formateada
    hideDatePicker();
  };

  return (
    <View style={{ alignItems: "center", marginVertical: 10, marginTop:10 }}>
      <TouchableOpacity
        onPress={showDatePicker}
        style={{
            backgroundColor: "white",
            alignItems: "center"
        }}
      >
        <Text style={ {color: "#A0A0A0", fontFamily: "Gotham-Medium",} }>{selectedDate ? moment(selectedDate).format("DD/MM/YYYY") : "Fecha de nacimiento"}</Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        maximumDate={new Date()}
      />
    </View>
  );
};

export default DateOfBirthPicker;
