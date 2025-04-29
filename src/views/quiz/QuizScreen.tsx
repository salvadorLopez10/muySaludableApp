import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { View, Text, Button, StyleSheet, TextInput, Image, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import Swiper from "react-native-swiper";
import { heightOptions, weightOptions, hoursSleep, yesNoOptions, numberFoodsOptions, sourceContactOptions, heightOptionsSelect, weightOptionsSelect, sexOptionsSelect, activityLevelSelect, dietOptionsSelect, goalOptionsSelect, statesMexicoOptionsSelect, socialMediaOptions, foodPreferenceOptionsSelect } from './DataDropdown';
import SelectField from "../../components/SelectField";
import { MuySaludableApi } from "../../api/MuySaludableApi";
import MultiSelectField, { Item } from "../../components/MultiSelectField";
import { useAuthStore } from "../../store/auth/useAuthStore";
import DateOfBirthPicker from "../../components/DateOfBirthPicker";

interface Props extends StackScreenProps<any,any>{};

// interface Alimentos {
//   id: number;
//   nombre: string;
//   tipo_alimento: string;
//   porcion: string;
//   tipo_porcion: string;
//   proteinas: number;
//   carbohidratos: number;
//   grasas: number;
//   calorias: number;
//   informacion_nutrimental: string;
//   createdAt: string;
//   updatedAt: string;
// }
interface Alimentos {
  id: number,
  nombre: string;
  grupo: string;
  equivalente: string;
  unidad_medida: string;
  proteinas: number;
  lipidos: number;
  hco: number;
  kcal: number;
  tiempo_comida: string;
  categoria: string;
  createdAt: string;
  updatedAt: string;
}

//Food representa la estructura de los elementos que se establecen en el campo select en donde se eleige los alimentos a los que se es alérgico
interface Food {
  label: string;
  id: string;
  grupo: string;
}

const QuizScreen = ({route,navigation}: Props) => {
  //console.log("QUIZ");
  //console.log(route.params);
  const [idUser, setIdUser] = useState("");
  const [name, setName] = useState("");
  const [dateBirth, setDateBirth] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [weightValue, setWeightValue] = useState("");
  const [gender, setGender] = useState("");
  const [physicalActivity, setPhysicalActivity] = useState("");
  const [dietType, setDietType] = useState("");
  const [foodPreference, setFoodPreference] = useState("");
  const [foodAvoid, setFoodAvoid] = useState("");
  const [foodAvoidList, setFoodAvoidList] = useState<Food[]>([]);//Lista completa
  const [foodAvoidListFiltered, setFoodAvoidListFiltered] = useState<Food[]>([]);
  const [foodPreferenceList, setFoodPreferenceList] = useState<Food[]>([]);
  const [foodPreferenceListFiltered, setFoodPreferenceListFiltered] = useState<Food[]>([]);
  const [goal, setGoal] = useState("");
  const [socialMedia, setSocialMedia] = useState("");
  const [stateMexico, setStateMexico] = useState("");

  const userInfo = useAuthStore((state) => state.user);
  const status = useAuthStore((state) => state.status);

  const handleLogout = async () => {

    await AsyncStorage.multiRemove(["user", "mealPlan"]);

    useAuthStore.setState({
      status: "unauthenticated",
      user: undefined,
    });
      
      navigation.dispatch(
          CommonActions.reset({
              index: 0,
              routes: [{ name: "LoginScreen" }],
          })
      );
  }

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

  const handleFoodPreferenceSelect = (value: string) => {
    setFoodPreference(value);
  };
  
  const handleFoodAvoidSelect = (value: string) => {
    setFoodAvoid(value);
  };

  const handleGoalSelect = (value: string) => {
    setGoal(value);
  };
  const handleSocialMediaSelect = (value: string) => {
    setSocialMedia(value);
  };

  const handleStateMexicoSelect = (value: string) => {
    setStateMexico(value);
  };

  const handleFoodAvoidListFiltered = ( array: Food[] ) => {
    setFoodAvoidListFiltered(array);
  }
  
  const handleFoodPreferenceListFiltered = ( array: Food[] ) => {
    setFoodPreferenceListFiltered(array);
  }

  const handleDateSelected = (date: Date) => {
    const today = new Date();
    let calculatedAge = today.getFullYear() - date.getFullYear();
    const m = today.getMonth() - date.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
      calculatedAge--;
    }
    setAge(calculatedAge.toString());
  };

  useEffect(() => {
    console.log("entra effect");
    console.log("USER INFO");
    console.log(JSON.stringify(userInfo,null,3));

    console.log("ROUTE PARAMS");
    console.log(JSON.stringify(route.params, null, 3));
    //Cuando los parámetros son undefined, quiere decir que la pantalla QUIZ se mostró al detectar que ya se creó el usuario pero no contestó cuestionario
    if( status !== 'unauthenticated' ){

      if(userInfo?.nombre == undefined && route.params?.idUsuario == undefined){
  
        let idUsuario = (userInfo?.id != undefined) ? userInfo?.id.toString() : "";
        setIdUser(idUsuario);
        Alert.alert(
          "Contestar cuestionario",
          "Hemos detectado que aún no contestas el cuestionario.\nEs necesario contestarlo para generar el plan correcto de acuerdo a tus objetivos.\n¡Te invitamos a contestarlo!",
          [
            {
              text: "Comenzar",
              onPress: () => console.log("RENOVAR PLAN"),
            },
          ],
          { cancelable: false }
        );
      }else{
  
        setIdUser(route.params!.idUsuario);
      }
      getAlimentos();
    }
  }, []);

  const getAlimentos = async () => {
    try {
      const resp = await MuySaludableApi.get("/nuevosAlimentos");

      //console.log( resp.data.alimentos )
      const foodList = transformarArreglo(resp.data.alimentos);
      //console.log(foodList);
      setFoodAvoidList(foodList);
      setFoodPreferenceList(foodList);
    } catch (error) {
      console.log(error);
    }
  };

  const transformarArreglo = (alimentos: any[]): Item[] => {
    return alimentos.map((alimento) => ({
      id: alimento.id.toString(),
      label: alimento.nombre.trim(),
      grupo: alimento.grupo?.trim() || "Sin Grupo", // Si no viene grupo, ponemos 'Sin Grupo'
    }));
  };

  const [respuestas, setRespuestas] = useState(Array(10).fill(""));

  const handleRespuestaChange = (index:number, respuesta:string) => {
    const nuevasRespuestas = [...respuestas];
    nuevasRespuestas[index] = respuesta;
    setRespuestas(nuevasRespuestas);
  };

  

  const handleSubmit = () => {

    console.log("ALIMENTOS PREFERENCIA");
    console.log(JSON.stringify(foodPreferenceListFiltered, null, 2));
    console.log(JSON.stringify(foodAvoidListFiltered, null, 2));

    let textFieldsEmpty = "";

    if(name.trim()== ""){
      textFieldsEmpty += "Nombre\n";
    }

    if(dateBirth.trim() == ""){
      textFieldsEmpty += "Fecha de nacimiento\n";
    }

    if (age.trim() == "") {
      textFieldsEmpty += "Edad\n";
    }

    if(height.trim() == ""){
       textFieldsEmpty += "Altura\n";
    }

    if (weight.trim() == "") {
      textFieldsEmpty += "Peso\n";
    }

    if (gender.trim() == "") {
      textFieldsEmpty += "Sexo\n";
    }

    if (physicalActivity.trim() == "") {
      textFieldsEmpty += "Nivel de Actividad Física\n";
    }
    if (dietType.trim() == "") {
      textFieldsEmpty += "Tipo de dieta\n";
    }


    if (goal.trim() == "") {
      textFieldsEmpty += "Objetivo\n";
    }
    if (stateMexico.trim() == "") {
      textFieldsEmpty += "Parte de México\n";
    }
    // Alert.alert("Error", "Favor de ingresar Sexo");

    if( textFieldsEmpty != "" ){
      //Eliminando la última coma del string
      textFieldsEmpty = textFieldsEmpty.substring(0,textFieldsEmpty.length -1);
      Alert.alert("Para continuar, favor de ingresar la siguiente información:", textFieldsEmpty);

      return;
    }
    
    navigation.navigate("ResumeAnswersScreen",{ idUser, name, dateBirth, age, height, weight, gender, physicalActivity, dietType, foodAvoidListFiltered, foodPreferenceListFiltered, goal, socialMedia, stateMexico });
  };

  const validateFieldEmpty = ( nameField: string, value: string ) => {


    return "";
  }

  const swiperRef = React.useRef<Swiper>(null);
  const goNext = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(1);
    }
  };
  
  const[selectedHeight, setSelectedHeight] = useState("");

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
          style={styles.slide}
        >
          {/* Botón de Cerrar Sesión */}
          <View style={styles.logoutContainer}>
            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
              <Text style={styles.logoutText}>Cerrar sesión</Text>
            </TouchableOpacity>
          </View>


          <View style={styles.logoContainer}>
            <Image
              source={require("../../../assets/logoMuySaludableMR.png")}
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
              <Text style={styles.text2}>alimenticio.</Text>
            </View>
          </View>
          <TouchableOpacity onPress={goNext} style={styles.styleBeginButton}>
            <Text style={{ color: "white", fontFamily: "Gotham-Medium" }}>
              Comenzar
            </Text>
          </TouchableOpacity>
        </ImageBackground>
        <ImageBackground
          source={require("../../../assets/fondoSlides.jpg")}
          style={styles.slide}
        >
          <Text style={styles.text}>Ingresa tu nombre y apellido</Text>
          <View style={styles.containerTextInput}>
            <TextInput
              style={styles.textInputStyle}
              placeholderTextColor="#d1cccc"
              autoCapitalize={"characters"}
              placeholder="Ingresa tu nombre"
              value={name}
              onChangeText={(value) => setName(value)}
            />
          </View>
          <TouchableOpacity onPress={goNext} style={styles.styleNextButton}>
            <Text style={styles.nextButtonText}>Siguiente</Text>
          </TouchableOpacity>
        </ImageBackground>

        <ImageBackground
          source={require("../../../assets/fondoSlides.jpg")}
          style={styles.slide}
        >
          <Text style={styles.text}>Selecciona tu fecha de nacimiento</Text>
          <View style={styles.containerTextInput}>
            {/* <TextInput
              style={styles.textInputStyleEdad}
              keyboardType="numeric"
              placeholderTextColor="#d1cccc"
              placeholder="Edad"
              value={age}
              onChangeText={(value) => setAge(value)}
            /> */}

            <DateOfBirthPicker
                onDateSelected={(calculatedAge, selectedDate) => {
                  setAge(calculatedAge.toString());
                  setDateBirth(selectedDate);
                }}
            />
          </View>
          
          <TouchableOpacity onPress={goNext} style={styles.styleNextButton}>
            <Text style={{ color: "#2A261B", fontWeight: "bold" }}>
              Siguiente
            </Text>
          </TouchableOpacity>
        </ImageBackground>

        <ImageBackground
          source={require("../../../assets/fondoSlides.jpg")}
          style={styles.slide}
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
          style={styles.slide}
        >
          <Text style={styles.text}>Ingresa tu peso (kg)</Text>
          {/* <SelectField data={weightOptionsSelect} keyboardType="numeric" /> */}
          <View style={styles.containerTextInput}>
            <TextInput
              style={styles.textInputStyleEdad}
              keyboardType="numeric"
              placeholderTextColor="#d1cccc"
              placeholder="Peso"
              value={weight}
              onChangeText={(value) => setWeight(value)}
            />
          </View>
          <TouchableOpacity onPress={goNext} style={styles.styleNextButton}>
            <Text style={{ color: "#2A261B", fontWeight: "bold" }}>
              Siguiente
            </Text>
          </TouchableOpacity>
        </ImageBackground>

        <ImageBackground
          source={require("../../../assets/fondoSlides.jpg")}
          style={styles.slide}
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
          style={styles.slide}
        >
          <Text style={styles.text}>¿Cuál es el nivel de</Text>
          <Text style={styles.text}>actividad física que realizas?</Text>
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
          style={styles.slide}
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
          style={styles.slide}
        >
          <Text style={styles.text}>¿Tienes alimentos de preferencia</Text>
          <Text style={styles.text}>que te gustaría tomar en cuenta</Text>
          <Text style={styles.text}>para armar tu plan?</Text>
          <Text style={styles.text}>(puedes omitir esta pregunta)</Text>

          {/* <MultiSelectField
            data={foodAvoidList}
            onItemSelected={handleFoidAvoidListFiltered}
          /> */}
          <SelectField
            data={foodPreferenceOptionsSelect}
            onItemSelected={handleFoodPreferenceSelect}
          />
          <TouchableOpacity onPress={goNext} style={styles.styleNextButton}>
            <Text style={{ color: "#2A261B", fontWeight: "bold" }}>
              Siguiente
            </Text>
          </TouchableOpacity>
        </ImageBackground>
        
        {
          foodPreference === "Me gustaría elegir" && (
            <ImageBackground
              source={require("../../../assets/fondoSlides.jpg")}
              style={styles.slide}
            >
              <Text style={styles.text}>Selecciona los alimentos</Text>
              <Text style={styles.text}>de tu preferencia</Text>

              <MultiSelectField
                data={foodPreferenceList}
                onItemSelected={handleFoodPreferenceListFiltered}
              />
              <TouchableOpacity onPress={goNext} style={styles.styleNextButton}>
                <Text style={{ color: "#2A261B", fontWeight: "bold" }}>
                  Siguiente
                </Text>
              </TouchableOpacity>
            </ImageBackground>
          )
        }
        
        <ImageBackground
          source={require("../../../assets/fondoSlides.jpg")}
          style={styles.slide}
        >
          <Text style={styles.text}>Selecciona los alimentos a los que</Text>
          <Text style={styles.text}>seas alérgico o no consumas</Text>
          <Text style={styles.text}>(puedes omitir este paso)</Text>

          <MultiSelectField
            data={foodAvoidList}
            onItemSelected={handleFoodAvoidListFiltered}
          />
          <TouchableOpacity onPress={goNext} style={styles.styleNextButton}>
            <Text style={{ color: "#2A261B", fontWeight: "bold" }}>
              Siguiente
            </Text>
          </TouchableOpacity>
        </ImageBackground>

        <ImageBackground
          source={require("../../../assets/fondoSlides.jpg")}
          style={styles.slide}
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
          style={styles.slide}
        >
          <Text style={styles.text}>¿Cómo te enteraste de</Text>
          <Text style={styles.text}>nuestros servicios?</Text>
          <SelectField
            data={socialMediaOptions}
            onItemSelected={handleSocialMediaSelect}
          />
          <TouchableOpacity onPress={goNext} style={styles.styleNextButton}>
            <Text style={{ color: "#2A261B", fontWeight: "bold" }}>
              Siguiente
            </Text>
          </TouchableOpacity>
        </ImageBackground>

        <ImageBackground
          source={require("../../../assets/fondoSlides.jpg")}
          style={styles.slide}
        >
          <Text style={styles.text}>¿De qué parte de México</Text>
          <Text style={styles.text}>nos contactas?</Text>
          <SelectField
            data={statesMexicoOptionsSelect}
            onItemSelected={handleStateMexicoSelect}
          />
          <TouchableOpacity
            onPress={handleSubmit}
            // onPress={() => {
            //   console.log(foodAvoidListFiltered);
            // }}
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
  containerTextInput: {
    margin: 10,
    borderRadius: 15,
    width: "80%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    //paddingHorizontal: 10,
    //padding: 5
  },
  textInputStyle: {
    color: "#2A261B",
    // fontWeight: "bold",
    padding: 10,
    //marginTop: 10,
    width: "80%",
    textAlign: "center",
    fontFamily: "Gotham-Medium",
  },
  textInputStyleEdad: {
    backgroundColor: "white",
    color: "#2A261B",
    //fontWeight: "bold",
    fontFamily: "Gotham-Medium",
    padding: 10,
    //marginTop: 10,
    width: "50%",
    textAlign: "center",
  },
  containerText: {
    width: "90%",
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
    fontFamily: "Gotham-Medium",
  },
  styleNextButton: {
    padding: 10,
    width: "80%",
    backgroundColor: "#FCFDBD",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 15,
  },
  nextButtonText: {
    color: "#2A261B",
    fontFamily: "Gotham-Medium",
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    //backgroundColor: "#F78291",
    alignItems: "center",
    //padding: 30,
  },
  logoutContainer: {
    position: "absolute",
    //marginTop: '50%',
    top: "9%",
    right: "9%",
    //marginTop:45
  },
  logoutButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth:1,
    borderColor: "#faa029",
  },
  logoutText: {
    color: "#faa029",
    fontSize: 16,
    fontFamily: "Gotham-Medium",
  },
  imageBackground: {
    width: "100%",
    height: "100%",
  },
  slide16: {
    flex: 1,
    justifyContent: "center",
    //backgroundColor: "#F78291",
    alignItems: "center",
    //padding: 30,
  },
  textTitle: {
    color: "#55851f",
    fontSize: 18,
    //fontWeight: "bold",
    fontFamily: "Gotham-Ultra",
    alignSelf: "center",
    textAlign:"center"
  },
  text: {
    color: "white",
    fontSize: 18,
    //fontWeight: "bold",
    fontFamily: "Gotham-Ultra",
    alignSelf: "center",
  },
  text2: {
    color: "#55851F",
    fontSize: 18,
    alignSelf: "center",
    fontFamily: "Gotham-Medium",
    textAlign:"center"
  },
  logoContainer: {
    position: "absolute",
    alignSelf: "center",
    top: "15%",
    height: "25%",
    //backgroundColor:"blue"
    //padding: 10,
  },
  logoImage: {
    width: 100,
    height: 103,
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