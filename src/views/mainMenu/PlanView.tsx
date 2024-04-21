import React from "react";
import styles from "./Styles";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import AccordionItem from "./AccordionItem";


interface PlanViewProps {
  objPlan: {
    [key: string]: {
      [key: string]: {
        [key: string]: string;
      };
    };
  };
}

const PlanView: React.FC<PlanViewProps> = ({ objPlan }) => {
  const renderAccordionItems = (): JSX.Element[] => {
    const accordionItems: JSX.Element[] = [];

    for (const key in objPlan) {
      if (Object.hasOwnProperty.call(objPlan, key)) {
        const subPlan = objPlan[key];
        const accordionItem = (
          <AccordionItem key={key} title={key}>
            {renderSubPlan(subPlan)}
          </AccordionItem>
        );
        accordionItems.push(accordionItem);
      }
    }

    return accordionItems;
  };

  const renderSubPlan = (subPlan: {
    [key: string]: { [key: string]: string };
  }): JSX.Element[] => {
    const subPlanItems: JSX.Element[] = [];

    for (const key in subPlan) {
      if (Object.hasOwnProperty.call(subPlan, key)) {
        const meal = subPlan[key];
        const accordionItem = (
          <AccordionItem
            key={key}
            title={key}
            colorContainer="rgba(250, 160, 41, 0.6)"
          >
            {renderMeals(meal)}
          </AccordionItem>
        );
        subPlanItems.push(accordionItem);
      }
    }

    return subPlanItems;
  };

  const renderMeals = (meal: { [key: string]: string }): JSX.Element[] => {
    const mealItems: JSX.Element[] = [];

    for (const key in meal) {
      if (Object.hasOwnProperty.call(meal, key)) {
        const mealOption = meal[key];
        mealItems.push(
          <View key={key} style={styles.containerTextOpcionTitle}>
            <Text style={styles.textTitleOpcion}>{mealOption}</Text>
          </View>
        );
      }
    }

    return mealItems;
  };

  return (
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.containerScroll}
        >
          {renderAccordionItems()}
        </ScrollView>
  );
};

export default PlanView;
