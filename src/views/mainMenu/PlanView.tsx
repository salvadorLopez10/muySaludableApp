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


interface Ingredient {
  nombre: string;
  porcion: string;
}

interface MealOption {
  nombre: string;
  ingredientes: Ingredient[];
}

interface Meal {
  [key: string]: MealOption;
}

interface SubPlan {
  [key: string]: Meal;
}

interface Plan {
  [key: string]: SubPlan;
}

interface PlanViewProps {
  objPlan: Plan;
}

const PlanView: React.FC<PlanViewProps> = ({ objPlan }) => {
  const renderAccordionItems = (): JSX.Element[] => {
    const accordionItems: JSX.Element[] = [];

    for (const key in objPlan) {
      if (Object.hasOwnProperty.call(objPlan, key)) {
        const subPlan = objPlan[key];
        var titleAccordion = "";
        if( key == "Mes1" ){
          titleAccordion = "Mes 1";
        }else if ( key == "Mes2" ){
          titleAccordion = "Mes 2"
        }else{
          titleAccordion = "Detox";
        }
        const accordionItem = (
          <AccordionItem key={key} title={titleAccordion}>
            {renderSubPlan(subPlan)}
          </AccordionItem>
        );
        accordionItems.push(accordionItem);
      }
    }

    return accordionItems;
  };

  const renderSubPlan = (subPlan: SubPlan): JSX.Element[] => {
    const subPlanItems: JSX.Element[] = [];

    for (const key in subPlan) {
      if (Object.hasOwnProperty.call(subPlan, key)) {
        const meal = subPlan[key];

        let displayKey = key;
        if (key === "Colacion1") {
          displayKey = "Colación 1";
        } else if (key === "Colacion2") {
          displayKey = "Colación 2";
        }
        const accordionItem = (
          <AccordionItem
            key={key}
            title={displayKey}
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

  const renderMeals = (meal: Meal): JSX.Element[] => {
    const mealItems: JSX.Element[] = [];
    let optionNumber = 1;
    for (const key in meal) {
      if (Object.hasOwnProperty.call(meal, key)) {
        const mealOption = meal[key];
        mealItems.push(
          <View key={key} style={styles.containerTextOpcionTitle}>
            <Text style={styles.textTitleNumberOpcion}>Opción {optionNumber}</Text>
            <Text style={styles.textTitleOpcion}>{mealOption.nombre}</Text>
            { mealOption.ingredientes.map((ingrediente, index) => (
              <View key={index} style={styles.ingredientContainer}>
                <Text style={styles.ingredientText}>{ingrediente.nombre} - {ingrediente.porcion}</Text>
              </View>
            ))}
          </View>
        );
        optionNumber++;
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
