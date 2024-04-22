import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { MyColors } from "../theme/AppTheme";

interface Props {
    text: string,
    disabled?:boolean,
    onPress : () => void
}

export const RoundedButton = ({ text,disabled ,onPress}:Props) => {
  return (
    <TouchableOpacity
        style={styles.roundedButton}
        disabled={disabled}
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
        borderRadius: 15,
        alignItems:"center"
    },
    textButton : {
        color: 'white',
        fontFamily: "Gotham-Medium"
    }

});