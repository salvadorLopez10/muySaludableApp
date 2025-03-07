import React from "react";
import styles from "./Styles";
import { ImageBackground, SafeAreaView, Text, View, ScrollView, Linking } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";

export const SourcesReferencesScreen = () => {

  const handlePressOMS = () => {
    Linking.openURL("https://www.who.int/es");
  };

  const handlePressFAO = () => {
    Linking.openURL("https://www.fao.org/nutrition/en");
  };

  const handlePressNIH = () => {
    Linking.openURL("https://www.nih.gov/");
  };

  const handlePressAND = () => {
    Linking.openURL("https://www.eatright.org/");
  }

  const handlePressMifflin = () => {
    Linking.openURL("https://academic.oup.com/ajcn/article/51/2/241/4695517");
  }

  const handlePressDistribution = () => {
    Linking.openURL("https://www.ncbi.nlm.nih.gov/books/NBK56068/");
  }

  const handlePressPlate = () => {
    Linking.openURL("https://www.hsph.harvard.edu/nutritionsource/healthy-eating-plate/");
  }
  const handlePressGuides = () => {
    Linking.openURL("https://www.dietaryguidelines.gov/");
  }
  const handlePressODS = () => {
    Linking.openURL("https://ods.od.nih.gov/");
  }
  const handlePressEffective = () => {
    Linking.openURL("https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7567128/ ");
  }
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../../../assets/MealPlanBG.jpg")}
        style={styles.imageBackground}
      >
        <ScrollView style={styles.containerScroll}>
          <View style={styles.containerText}>
            <Text style={styles.subtitleText}>
              Fuentes y Referencias
              {"\n"}
            </Text>
            <Text style={styles.textContent}>
              En <Text style={styles.subtitleText}>Muy Saludable</Text> nos comprometemos a proporcionar información basada en evidencia científica para ayudarte a alcanzar tus objetivos de salud y bienestar. Nuestro enfoque en planes alimenticios personalizados se basa en investigaciones de organismos reconocidos, estudios científicos y metodologías validadas en nutrición y salud.
              A continuación, te presentamos las fuentes en las que basamos nuestras recomendaciones:
            </Text>
            
            <Text style={styles.subtitleText}>
              1.⁠ ⁠Organismos Internacionales de Salud
            </Text>

            <Text style={styles.textBullet}>
              <Text style={styles.bullet}>•</Text> Organización Mundial de la Salud (OMS) – Guías sobre alimentación saludable y prevención de enfermedades
            </Text>

            <Text style={styles.textBullet}>
              <Text style={styles.bullet}>•</Text> 
              <TouchableOpacity onPress={handlePressOMS}>
                <Text style={styles.linkText}> https://www.who.int/es</Text>
              </TouchableOpacity>
            </Text>

            <Text style={styles.textBullet}>
              <Text style={styles.bullet}>•</Text> Food and Agriculture Organization (FAO) – Información sobre nutrición y seguridad alimentaria.
            </Text>

            <Text style={styles.textBullet}>
              <Text style={styles.bullet}>•</Text> 
              <TouchableOpacity onPress={handlePressFAO}>
                <Text style={styles.linkText}> https://www.fao.org/nutrition/en/</Text>
              </TouchableOpacity>
            </Text>

            <Text style={styles.textBullet}>
              <Text style={styles.bullet}>•</Text> National Institutes of Health (NIH) – Publicaciones sobre requerimientos nutricionales y salud metabólica.
            </Text>

            <Text style={styles.textBullet}>
              <Text style={styles.bullet}>•</Text> 
              <TouchableOpacity onPress={handlePressNIH}>
                <Text style={styles.linkText}> https://www.nih.gov/</Text>
              </TouchableOpacity>
            </Text>

            <Text style={styles.subtitleText}>
              2. Metodologías de Cálculo Nutricional
            </Text>

            <Text style={styles.textBullet}>
              <Text style={styles.bullet}>•</Text> Ecuación de Harris-Benedict (para calcular Tasa Metabólica Basal - TMB)
              {"\n"}
              •	Fuente: Harris, J.A., Benedict, F.G. (1919). A Biometric Study of Basal Metabolism in Man. Carnegie Institution of Washington
            </Text>

            <Text style={styles.textBullet}>
              <Text style={styles.bullet}>•</Text> Ecuación de Mifflin-St Jeor (versión más moderna de la TMB)
              {"\n"}
              •	Fuente: Mifflin, M.D., St Jeor, S.T., et al. (1990). A new predictive equation for resting energy expenditure in healthy individuals. The American Journal of Clinical Nutrition, 51(2), 241-247.
            </Text>

            <Text style={styles.textBullet}>
              <Text style={styles.bullet}>•</Text> 
              <TouchableOpacity onPress={handlePressMifflin}>
                <Text style={styles.linkText}> https://academic.oup.com/ajcn/article/51/2/241/4695517</Text>
              </TouchableOpacity>
            </Text>

            <Text style={styles.textBullet}>
              <Text style={styles.bullet}>•</Text> Distribución de Macronutrientes (según la National Academy of Sciences
              {"\n"}
              •	Fuente:  Dietary Reference Intakes for Energy, Carbohydrate, Fiber, Fat, Fatty Acids, Cholesterol, Protein, and Amino Acids (2005). National Academies Press.
            </Text>

            <Text style={styles.textBullet}>
              <Text style={styles.bullet}>•</Text> 
              <TouchableOpacity onPress={handlePressDistribution}>
                <Text style={styles.linkText}> https://www.ncbi.nlm.nih.gov/books/NBK56068/</Text>
              </TouchableOpacity>
            </Text>
            

            <Text style={styles.subtitleText}>
              3. Guías de alimentación saludable
            </Text>

            <Text style={styles.textBullet}>
              <Text style={styles.bullet}>•</Text> Academy of Nutrition and Dietetics (AND) – Recomendaciones sobre alimentación equilibrada.
            </Text>

            <Text style={styles.textBullet}>
              <Text style={styles.bullet}>•</Text> 
              <TouchableOpacity onPress={handlePressAND}>
                <Text style={styles.linkText}> https://www.eatright.org/</Text>
              </TouchableOpacity>
            </Text>

            <Text style={styles.textBullet}>
              <Text style={styles.bullet}>•</Text> Harvard T.H. Chan School of Public Health – Plato para Comer Saludable.
            </Text>

            <Text style={styles.textBullet}>
              <Text style={styles.bullet}>•</Text> 
              <TouchableOpacity onPress={handlePressPlate}>
                <Text style={styles.linkText}> https://www.hsph.harvard.edu/nutritionsource/healthy-eating-plate/</Text>
              </TouchableOpacity>
            </Text>

            <Text style={styles.textBullet}>
              <Text style={styles.bullet}>•</Text> Dietary Guidelines for Americans 2020-2025 – Guía oficial del Departamento de Salud de EE.UU.
            </Text>

            <Text style={styles.textBullet}>
              <Text style={styles.bullet}>•</Text> 
              <TouchableOpacity onPress={handlePressGuides}>
                <Text style={styles.linkText}> https://www.dietaryguidelines.gov/</Text>
              </TouchableOpacity>
            </Text>

            <Text style={styles.subtitleText}>
              4. Suplementación y Micronutrientes
            </Text>

            <Text style={styles.textBullet}>
              <Text style={styles.bullet}>•</Text> National Institutes of Health – Office of Dietary Supplements (ODS) – Información sobre vitaminas y minerales.
            </Text>

            <Text style={styles.textBullet}>
              <Text style={styles.bullet}>•</Text> 
              <TouchableOpacity onPress={handlePressODS}>
                <Text style={styles.linkText}> https://ods.od.nih.gov/</Text>
              </TouchableOpacity>
            </Text>

            <Text style={styles.textBullet}>
              <Text style={styles.bullet}>•</Text> World Journal of Clinical Cases - Revisión sobre la efectividad de suplementos nutricionales.
            </Text>

            <Text style={styles.textBullet}>
              <Text style={styles.bullet}>•</Text> 
              <TouchableOpacity onPress={handlePressEffective}>
                <Text style={styles.linkText}>  https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7567128/</Text>
              </TouchableOpacity>
            </Text>

            <Text style={styles.subtitleText}>
              Importante
            </Text>

            <Text style={styles.textContent}>
            La información proporcionada en <Text style={styles.subtitleText}>Muy Saludable</Text> está basada en estudios científicos y fuentes reconocidas en el ámbito de la nutrición y la salud. Sin embargo, cada persona es única, y recomendamos que consultes con un profesional de la salud antes de realizar cambios significativos en tu alimentación o suplementación.
            Si tienes dudas o comentarios sobre nuestros planes alimenticios, puedes contactarnos en <Text style={styles.subtitleText}>danna@muysaludable.com.mx</Text>, donde nuestro equipo estará disponible para brindarte orientación y resolver cualquier inquietud.
            {"\n"}
            Nuestro objetivo es apoyar y facilitar la adopción de hábitos saludables con herramientas accesibles y basadas en ciencia, siempre con el respaldo de profesionales.

            </Text>

          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};
