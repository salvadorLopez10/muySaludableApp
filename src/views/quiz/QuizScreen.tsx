import React, { useState, useEffect } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { View, Text, Button, StyleSheet, TextInput, Image, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import Swiper from "react-native-swiper";
import { heightOptions, weightOptions, hoursSleep, yesNoOptions, numberFoodsOptions, sourceContactOptions, heightOptionsSelect, weightOptionsSelect, sexOptionsSelect, activityLevelSelect, dietOptionsSelect, goalOptionsSelect, statesMexicoOptionsSelect } from './DataDropdown';
import SelectField from "../../components/SelectField";
import { MuySaludableApi } from "../../api/MuySaludableApi";
import MultiSelectField from "../../components/MultiSelectField";

interface Props extends StackScreenProps<any,any>{};

interface Alimentos {
  id: number;
  nombre: string;
  tipo: string;
  informacion_nutrimental: string;
  createdAt: string;
  updatedAt: string;
}

//Food representa la estructura de los elementos que se establecen en el campo select en donde se eleige los alimentos a los que se es alérgico
interface Food {
  label: string;
  id: string;
}

const QuizScreen = ({navigation}: Props) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");
  const [physicalActivity, setPhysicalActivity] = useState("");
  const [dietType, setDietType] = useState("");
  const [foodAvoid, setFoodAvoid] = useState("");
  const [foodAvoidList, setFoodAvoidList] = useState<Food[]>([]);//Lista completa
  const [foodAvoidListFiltered, setFoodAvoidListFiltered] = useState<Food[]>([]);//Lista completa
  const [goal, setGoal] = useState("");
  const [stateMexico, setStateMexico] = useState("");

  const handleHeightSelect = (value: string) => {
    setHeight(value);
  };

  const handleGenderSelect = (value: string) => {
    setGender(value);
  };

  const handlePhysicalActivitySelect = (value: string) => {
    setPhysicalActivity(value);
  };

  const handleDietTypeSelect = (value: string) => {
    setDietType(value);
  };
  
  const handleFoodAvoidSelect = (value: string) => {
    setFoodAvoid(value);
  };

  const handleGoalSelect = (value: string) => {
    setGoal(value);
  };

  const handleStateMexicoSelect = (value: string) => {
    setStateMexico(value);
  };

  const handleFoidAvoidListFiltered = ( array: Food[] ) => {
    setFoodAvoidListFiltered(array);
  }

  useEffect(() => {
    console.log("entra effect");
    getAlimentos();
  }, []);

  const getAlimentos = async () => {
    try {
      const resp = await MuySaludableApi.get("/alimentos");

      //console.log( resp.data.alimentos )
      const foodList = transformarArreglo(resp.data.alimentos);
      //console.log(foodList);
      setFoodAvoidList(foodList);
    } catch (error) {
      console.log(error);
    }
  };

function transformarArreglo( original: Alimentos[]): Food[] {
  return original.map((alimento) => ({
    label: alimento.nombre,
    id: alimento.nombre,
  }));
}
  const [respuestas, setRespuestas] = useState(Array(10).fill(""));

  const handleRespuestaChange = (index:number, respuesta:string) => {
    const nuevasRespuestas = [...respuestas];
    nuevasRespuestas[index] = respuesta;
    setRespuestas(nuevasRespuestas);
  };

  

  const handleSubmit = () => {
    console.log("Respuestas:", respuestas);
  };

  const swiperRef = React.useRef<Swiper>(null);
  const goNext = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(1);
    }
  };

  const renderButton = () => (
    <TouchableOpacity onPress={() => swiperRef.current?.scrollBy(2)}>
      <View style={{ backgroundColor: "blue", padding: 10, borderRadius: 5 }}>
        <Text style={{ color: "white" }}>Siguiente</Text>
      </View>
    </TouchableOpacity>
  );
  
  const[selectedHeight, setSelectedHeight] = useState("");
  
  const placeholder = {
    label: "Select an option...",
    value: null,
  };

  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      {/* <Swiper style={styles.swiper} loop={false} showsButtons={true}>
        {renderPreguntas()}
      </Swiper>
      <Button title="Enviar Respuestas" onPress={handleSubmit} /> */}
      <Swiper
        style={styles.wrapper}
        //activeDotColor="#FCFDBD"
        // showsButtons={true}
        loop={false}
        ref={swiperRef}
        scrollEnabled={true}
      >
        <ImageBackground
          source={require("../../../assets/background_manzana.jpg")}
          style={styles.slide15}
        >
          <View style={styles.logoContainer}>
            <Image
              source={require("../../../assets/logoMuySaludable.png")}
              style={styles.logoImage}
            />
          </View>
          <View style={styles.containerText}>
            <Text style={styles.textTitle}>¡BIENVENIDO A MUY SALUDABLE!</Text>
            <View style={styles.contentText}>
              <Text style={styles.text2}>
                Contesta el siguiente cuestionario
              </Text>
              <Text style={styles.text2}>para poder desarrollar tu plan</Text>
              <Text style={styles.text2}>alimenticio</Text>
            </View>
          </View>
          <TouchableOpacity onPress={goNext} style={styles.styleBeginButton}>
            <Text style={{ color: "white" }}>Comenzar</Text>
          </TouchableOpacity>
        </ImageBackground>
        <ImageBackground
          source={require("../../../assets/fondoSlides.jpg")}
          style={styles.slide15}
        >
          <Text style={styles.text}>Ingresa tu nombre y apellido</Text>
          <TextInput
            style={styles.textInputStyle}
            placeholderTextColor="#d1cccc"
            placeholder="Ingresa tu nombre"
            value={name}
            onChangeText={(value) => setName(value)}
          />
          <TouchableOpacity onPress={goNext} style={styles.styleNextButton}>
            <Text style={{ color: "#2A261B", fontWeight: "bold" }}>
              Siguiente
            </Text>
          </TouchableOpacity>
        </ImageBackground>

        <ImageBackground
          source={require("../../../assets/fondoSlides.jpg")}
          style={styles.slide15}
        >
          <Text style={styles.text}>Ingresa tu edad</Text>
          <View style={styles.containerTextLabel}>
            <TextInput
              style={styles.textInputStyleEdad}
              keyboardType="numeric"
              placeholderTextColor="#d1cccc"
              placeholder="Edad"
              value={age}
              onChangeText={(value) => setAge(value)}
            />
            <Text style={{ color: "white", fontWeight: "bold" }}> años</Text>
          </View>
          <TouchableOpacity onPress={goNext} style={styles.styleNextButton}>
            <Text style={{ color: "#2A261B", fontWeight: "bold" }}>
              Siguiente
            </Text>
          </TouchableOpacity>
        </ImageBackground>

        <ImageBackground
          source={require("../../../assets/fondoSlides.jpg")}
          style={styles.slide15}
        >
          <Text style={styles.text}>Ingresa tu altura</Text>
          <SelectField
            data={heightOptionsSelect}
            keyboardType="numeric"
            onItemSelected={handleHeightSelect}
          />
          <TouchableOpacity onPress={goNext} style={styles.styleNextButton}>
            <Text style={{ color: "#2A261B", fontWeight: "bold" }}>
              Siguiente
            </Text>
          </TouchableOpacity>
        </ImageBackground>

        <ImageBackground
          source={require("../../../assets/fondoSlides.jpg")}
          style={styles.slide15}
        >
          <Text style={styles.text}>Ingresa tu peso</Text>
          {/* <SelectField data={weightOptionsSelect} keyboardType="numeric" /> */}
          <View style={styles.containerTextLabel}>
            <TextInput
              style={styles.textInputStyleEdad}
              keyboardType="numeric"
              placeholderTextColor="#d1cccc"
              placeholder="Peso"
              value={weight}
              onChangeText={(value) => setWeight(value)}
            />
            <Text style={{ color: "white", fontWeight: "bold" }}> kg</Text>
          </View>
          <TouchableOpacity onPress={goNext} style={styles.styleNextButton}>
            <Text style={{ color: "#2A261B", fontWeight: "bold" }}>
              Siguiente
            </Text>
          </TouchableOpacity>
        </ImageBackground>

        <ImageBackground
          source={require("../../../assets/fondoSlides.jpg")}
          style={styles.slide15}
        >
          <Text style={styles.text}>Sexo</Text>
          <SelectField
            data={sexOptionsSelect}
            onItemSelected={handleGenderSelect}
          />
          <TouchableOpacity onPress={goNext} style={styles.styleNextButton}>
            <Text style={{ color: "#2A261B", fontWeight: "bold" }}>
              Siguiente
            </Text>
          </TouchableOpacity>
        </ImageBackground>

        <ImageBackground
          source={require("../../../assets/fondoSlides.jpg")}
          style={styles.slide15}
        >
          <Text style={styles.text}>
            ¿Cuál es el nivel de actividad física que realizas?
          </Text>
          <SelectField
            data={activityLevelSelect}
            onItemSelected={handlePhysicalActivitySelect}
          />
          <TouchableOpacity onPress={goNext} style={styles.styleNextButton}>
            <Text style={{ color: "#2A261B", fontWeight: "bold" }}>
              Siguiente
            </Text>
          </TouchableOpacity>
        </ImageBackground>

        <ImageBackground
          source={require("../../../assets/fondoSlides.jpg")}
          style={styles.slide15}
        >
          <Text style={styles.text}>¿Qué tipo de dieta prefieres seguir?</Text>
          <SelectField
            data={dietOptionsSelect}
            onItemSelected={handleDietTypeSelect}
          />
          <TouchableOpacity onPress={goNext} style={styles.styleNextButton}>
            <Text style={{ color: "#2A261B", fontWeight: "bold" }}>
              Siguiente
            </Text>
          </TouchableOpacity>
        </ImageBackground>

        <ImageBackground
          source={require("../../../assets/fondoSlides.jpg")}
          style={styles.slide15}
        >
          <Text style={styles.text}>
            Selecciona los alimentos a los que seas alérgico o no consumas
          </Text>

          <MultiSelectField
            data={foodAvoidList}
            onItemSelected={handleFoidAvoidListFiltered}
          />
          <TouchableOpacity onPress={goNext} style={styles.styleNextButton}>
            <Text style={{ color: "#2A261B", fontWeight: "bold" }}>
              Siguiente
            </Text>
          </TouchableOpacity>
        </ImageBackground>

        <ImageBackground
          source={require("../../../assets/fondoSlides.jpg")}
          style={styles.slide15}
        >
          <Text style={styles.text}>¿Cuál es tu objetivo?</Text>
          <SelectField
            data={goalOptionsSelect}
            onItemSelected={handleGoalSelect}
          />
          <TouchableOpacity onPress={goNext} style={styles.styleNextButton}>
            <Text style={{ color: "#2A261B", fontWeight: "bold" }}>
              Siguiente
            </Text>
          </TouchableOpacity>
        </ImageBackground>

        <ImageBackground
          source={require("../../../assets/fondoSlides.jpg")}
          style={styles.slide15}
        >
          <Text style={styles.text}>
            ¿De qué parte de México nos contactas?
          </Text>
          <SelectField
            data={statesMexicoOptionsSelect}
            onItemSelected={handleStateMexicoSelect}
          />
          <TouchableOpacity
            // onPress={() => navigation.navigate("ResumeAnswersScreen")}
            onPress={() => {
              console.log(foodAvoidListFiltered);
            }}
            style={styles.styleNextButton}
          >
            <Text style={{ color: "#2A261B", fontWeight: "bold" }}>
              Finalizar
            </Text>
          </TouchableOpacity>
        </ImageBackground>
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    //padding: 16,
  },
  swiper: {
    flex: 1,
  },
  preguntaContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {},
  textInputStyle: {
    backgroundColor: "white",
    color: "#2A261B",
    fontWeight: "bold",
    padding: 10,
    marginTop: 10,
    width: "80%",
    textAlign: "center",
  },
  textInputStyleEdad: {
    backgroundColor: "white",
    color: "#2A261B",
    fontWeight: "bold",
    padding: 10,
    marginTop: 10,
    width: "30%",
    textAlign: "center",
  },
  containerText: {
    width: "80%",
    alignItems: "center",
  },
  contentText: {
    marginTop: 20,
  },
  styleBeginButton: {
    padding: 10,
    width: "80%",
    backgroundColor: "#FAA029",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 15,
  },
  styleNextButton: {
    padding: 10,
    width: "80%",
    backgroundColor: "#FCFDBD",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 15,
  },

  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFF",
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#89ca89",
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5",
  },
  slide4: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#92BBD9",
    alignItems: "center",
    //padding: 30,
  },
  slide5: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F78291",
    alignItems: "center",
    //padding: 30,
  },
  slide6: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F78291",
    alignItems: "center",
    //padding: 30,
  },
  slide7: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F78291",
    alignItems: "center",
    //padding: 30,
  },
  slide8: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F78291",
    alignItems: "center",
    //padding: 30,
  },
  slide9: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F78291",
    alignItems: "center",
    //padding: 30,
  },
  slide10: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F78291",
    alignItems: "center",
    //padding: 30,
  },
  slide11: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F78291",
    alignItems: "center",
    //padding: 30,
  },
  slide12: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F78291",
    alignItems: "center",
    //padding: 30,
  },
  slide13: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F78291",
    alignItems: "center",
    //padding: 30,
  },
  slide14: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F78291",
    alignItems: "center",
    //padding: 30,
  },
  slide15: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F78291",
    alignItems: "center",
    //padding: 30,
  },
  imageBackground: {
    width: "100%",
    height: "100%",
  },
  slide16: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F78291",
    alignItems: "center",
    //padding: 30,
  },
  textTitle: {
    color: "#55851f",
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
  },
  text2: {
    color: "#55851F",
    fontSize: 18,
    alignSelf: "center",
  },
  logoContainer: {
    position: "absolute",
    alignSelf: "center",
    top: "15%",
  },
  logoImage: {
    width: 100,
    height: 100,
  },

  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: "white",
    marginTop: 10,
    width: "60%",
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  selectedStyle: {
    borderRadius: 12,
  },
  containerSlide: {
    flex: 1,
  },
  containerTextLabel: {
    flexDirection: "row",
    alignItems: "baseline",
  },
});

export default QuizScreen;