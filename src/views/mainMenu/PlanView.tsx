import React, { useEffect, useState } from "react";
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
import { CarouselField } from "../../components/CarouselField";
import { MuySaludableApi } from "../../api/MuySaludableApi";


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
  planContratado: string | null | undefined;
}

const PlanView: React.FC<PlanViewProps> = ({ objPlan, planContratado }) => {

  const [expandedParentIndex, setExpandedParentIndex] = useState<number | null>(null);
  const [expandedChildIndex, setExpandedChildIndex] = useState<{ [key: string]: number | null }>({});

  const [carouselData, setCarouselData] = useState([]);
  const [loadingCarousel, setLoadingCarousel] = useState(true);

  const handleParentAccordionToggle = (index: number) => {
    setExpandedParentIndex(expandedParentIndex === index ? null : index);
  };

  const handleChildAccordionToggle = (parentKey: string, index: number) => {
    setExpandedChildIndex(prevState => ({
      ...prevState,
      [parentKey]: prevState[parentKey] === index ? null : index
    }));
  };

  const renderAccordionItems = (): JSX.Element[] => {
    return Object.keys(objPlan)
      .map((key, index) => {
        if (planContratado === '1. PLAN CLÁSICO' && key === 'Mes2') {
          return null; // Retorna null para no incluir el Mes 2
        }
  
        const subPlan = objPlan[key];
        const titleAccordion = key === 'Mes1' ? 'Mes 1' : key === 'Mes2' ? 'Mes 2' : 'Detox';
  
        return (
          <AccordionItem
            key={key}
            title={titleAccordion}
            isExpanded={expandedParentIndex === index}
            onPress={() => handleParentAccordionToggle(index)}
          >
            {renderSubPlan(subPlan, key)}
          </AccordionItem>
        );
      })
      .filter((item): item is JSX.Element => item !== null); // Filtra los elementos nulos usando una función de tipo de predicado
  };

  const renderSubPlan = (subPlan: any, parentKey: string): JSX.Element[] => {
    return Object.keys(subPlan).map((key, index) => {
      const meal = subPlan[key];
      let displayKey = key === "Colacion1" ? "Colación 1" : key === "Colacion2" ? "Colación 2" : key;

      return (
        <AccordionItem
          key={key}
          title={displayKey}
          colorContainer="rgba(250, 160, 41, 0.6)"
          isExpanded={expandedChildIndex[parentKey] === index}
          onPress={() => handleChildAccordionToggle(parentKey, index)}
        >
          {renderMeals(meal)}
        </AccordionItem>
      );
    });
  };

  const renderMeals = (meal: any): JSX.Element[] => {
    return Object.keys(meal).map((key, index) => {
      const mealOption = meal[key];
      return (
        <View key={index} style={styles.containerTextOpcionTitle}>
          <Text style={styles.textTitleNumberOpcion}>Opción {index + 1}</Text>
          <Text style={styles.textTitleOpcion}>{mealOption.nombre}</Text>
          {mealOption.ingredientes.map((ingrediente: any, i: number) => (
            <View key={i} style={styles.ingredientContainer}>
              <Text style={styles.ingredientText}>{ingrediente.nombre} - {ingrediente.porcion}</Text>
            </View>
          ))}
        </View>
      );
    });
  };

  useEffect(() => {
    const fetchCarousel = async () => {
      try {
        const response = await MuySaludableApi.get('/carousel/filter_tipo/Plan');          
        const data = response.data.records;
        console.log("Imágenes del carrusel:", data);
        setCarouselData(data);
      } catch (error) {
        console.error('Error al obtener imágenes del carrusel:', error);
      } finally {
        setLoadingCarousel(false);
      }
    };

    fetchCarousel();
    
  }, [])
  
  return (
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.containerScroll}
        >
          {renderAccordionItems()}

        <View style={styles.carouselContainer}>
          <CarouselField images={ carouselData } />
        </View>

        </ScrollView>
  );
};

export default PlanView;
