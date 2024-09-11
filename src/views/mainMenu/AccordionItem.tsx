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

interface AccordionItemProps {
  title: string;
  isExpanded: boolean;
  onPress: () => void;
  children: React.ReactNode;
  colorContainer?: string;
}
function AccordionItem({ children, title, colorContainer, isExpanded, onPress }: AccordionItemProps): JSX.Element {
    // const [expanded, setExpanded] = useState(false);

    // function toggleItem() {
    //   LayoutAnimation.configureNext(LayoutAnimation.create(500, 'easeInEaseOut', 'scaleY'));
    //   setExpanded(!expanded);
    // }

    const toggleItem = () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      onPress();
    };

    const body = <View style={styles.accordBody}>{children}</View>;

    // return (
    //   <View style={styles.accordContainer}>
    //     {/* <TouchableOpacity style={[styles.accordHeader,{ backgroundColor:colorContainer }]} onPress={toggleItem}> */}
    //     <TouchableOpacity style={[styles.accordHeader, { backgroundColor: colorContainer || 'rgba(250, 160, 41, 1)' }]} onPress={toggleItem}>
    //       <Text style={styles.datosInfoText}>{title}</Text>
    //       <Icon
    //         name={expanded ? "chevron-up" : "chevron-down"}
    //         size={20}
    //         color="#2E2A21"
    //       />
    //     </TouchableOpacity>
    //     {expanded && body}
    //   </View>
    // );
    return (
      <View style={styles.accordContainer}>
      <TouchableOpacity
        style={[styles.accordHeader, { backgroundColor: colorContainer || 'rgba(250, 160, 41, 1)' }]}
        onPress={toggleItem}
      >
        <Text style={styles.datosInfoText}>{title}</Text>
        <Icon
          name={isExpanded ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="#2E2A21"
        />
      </TouchableOpacity>
      {isExpanded && <View style={styles.accordBody}>{children}</View>}
    </View>
    );
}

export default AccordionItem;
