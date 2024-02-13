import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { MyColors } from "../theme/AppTheme";

interface Props {
    text: string,
    onPress : () => void
}

export const RoundedButton = ({ text, onPress}:Props) => {
  return (
    <TouchableOpacity
        style={styles.roundedButton}
        onPress={ onPress }
    >
        <Text style={styles.textButton}>{text}</Text>

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    roundedButton: {
        width: "100%",
        backgroundColor: MyColors.backgroundButton,
        padding: 13,
        borderRadius: 15
    },
    textButton : {
        color: 'white',
        fontFamily: "Gotham-Medium"
    }

});