import { PropsWithChildren, useState } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
  UIManager,
  LayoutAnimation,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./Styles";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type AccordionItemPros = PropsWithChildren<{
  title: string;
}>;
function AccordionItem({ children, title }: AccordionItemPros): JSX.Element {
    const [expanded, setExpanded] = useState(false);

    function toggleItem() {
      LayoutAnimation.configureNext(LayoutAnimation.create(500, 'linear', 'scaleY'));
      setExpanded(!expanded);
    }

    const body = <View style={styles.accordBody}>{children}</View>;

    return (
        <View style={styles.accordContainer}>
        <TouchableOpacity style={styles.accordHeader} onPress={toggleItem}>
            <Text style={styles.datosInfoText}>{title}</Text>
            <Icon
            name={expanded ? "chevron-up" : "chevron-down"}
            size={20}
            color="#2E2A21"
            />
        </TouchableOpacity>
        {expanded && body}
        </View>
    );
}

export default AccordionItem;
