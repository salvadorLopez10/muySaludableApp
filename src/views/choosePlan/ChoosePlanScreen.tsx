import { useEffect,useState } from 'react';
import {
  SafeAreaView,Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
  ScrollView,
  Dimensions
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { RoundedButton } from '../../components/RoundedButton';
import { MyColors } from '../../theme/AppTheme';
import { StackScreenProps } from '@react-navigation/stack';
import { MuySaludableApi } from '../../api/MuySaludableApi';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from "@react-navigation/native";


interface Props extends StackScreenProps<any,any>{};

const { height } = Dimensions.get("window");

interface Characteristic {
  id: number;
  title: string;
  price: number;
  resume: string;
  characteristics: string[];
}

interface Planes {
  id: number;
  nombre: string;
  resumen: string;
  descripcion_detallada: string;
  duracion_meses: string;
  precio: string;
  precio_regular: string;
  createdAt: string;
  updatedAt: string;
}

export const ChoosePlanScreen = ( {navigation}: Props ) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedView, setSelectedView] = useState<Planes | null>(null);
    const [showRenew, setShowRenew] = useState(false);
    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");
    const [textErrorEmail, setTextErrorEmail] = useState("");
    const [textErrorPwd, setTextErrorPwd] = useState("");
    const [showTextUser, setShowTextUser] = useState(false);
    const [showTextPwd, setShowTextPwd] = useState(false);
    const [planes, setPlanes] = useState<Planes[]>([]);
    const [loading, setLoading] = useState(false);
    const [telefono, setTelefono] = useState("");
    const [showTooltip, setShowTooltip] = useState(false);

    const userInfo = useAuthStore((state) => state.user);


  const handleOpenModal = ( element: Planes ) => {
    setSelectedView(element);
    setModalVisible(true);
  }

  const openModalUserPassword = () => {
    setModalVisible(true);
  }

  const handleCloseModal = () => {
    setModalVisible(false);
  }

  const handleRenewNow = async() => {

    if( userInfo?.email ){
      const requestEmail = {
        email: userInfo.email
      };

      setLoading(true);
      await MuySaludableApi.post(
        "/sendEmail/sendEmailRenew",
        requestEmail
      ).then(( responseEmailEnviado: any ) => {
        setLoading(false);
        Alert.alert("Información", "Hemos enviado información para renovación a tu correo "+ userInfo.email);

      }).catch((errorReenvioCorreo:any) =>{
        setLoading(false);
        Alert.alert("Error", "El email no se ha podido enviar " +  JSON.stringify(errorReenvioCorreo,null,1));

      });
    }else{
      Alert.alert('Información',"El email no se ha podido enviar");
    }
  }

  useEffect(() => {
    //Cuando se tiene información en userInfo quiere decir que la pantalla se muestra a partir de una renovación
    //Cuando está vacío, la pantalla se está mostrando por primera vez
    if( userInfo ){
      setShowRenew(true);
      Alert.alert(
        "Actualizar plan alimenticio",
        "El plan contratado ha vencido.\n¡Te invitamos a renovarlo!",
        [
          {
            text: "Más información",
            onPress: () => {
              console.log("RENOVAR PLAN");
              //getPlanes();
            }
          },
        ],
        { cancelable: false }
      );
    }
    //getPlanes();
  }, []);

  const formatPhoneNumber = (value: string) => {
    // Elimina todo lo que no sea número
    const cleaned = value.replace(/\D/g, '');
  
    // Corta a máximo 10 dígitos
    const limited = cleaned.substring(0, 10);
  
    // Inserta guiones cada 2 dígitos
    const formatted = limited.match(/.{1,2}/g)?.join('-') || '';
  
    return formatted;
  };

  const onNavigate = () =>{
    setModalVisible(false)
    //navigation.navigate("ResumeChoosenPlanScreen", {selectedPlan: selectedView});
    Alert.alert(
      "Información", // Título del Alert
      "Para conocer más detalles te invitamos a visitar nuestro sitio web:\nhttps://muysaludable.com.mx/planes", // Mensaje del Alert
      [
        {
          text: "Ok", // Texto del botón
          onPress: () => navigation.navigate("LoginScreen")
        },
      ],
      { cancelable: false } // Evita cerrar el Alert tocando fuera
    );
  }

  const createAccount = async () =>{

    setShowTextUser(false);
    setShowTextPwd(false);
    if( user.trim() == "" ){
      setShowTextUser(true);
      setTextErrorEmail("El email es requerido");
      return;
    }else {
      const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (!user.match(validRegex)) {
        setShowTextUser(true);
        setTextErrorEmail("Email no válido");
        return;
      }
    }

    if( pwd.trim() == "" ){
      setShowTextPwd(true);
      setTextErrorPwd("La contraseña es requerida");
      return;
    }else{
      if( pwd.trim().length < 8 ){
        setShowTextPwd(true);
        setTextErrorPwd("Al menos 8 caracteres");
        return;
      }
    }

    const requestNewUser = {
      "email": user,
      "password": pwd,
      ...(telefono ? { telefono: telefono.replace(/-/g, '') } : {}) // Agrega el teléfono solo si no está vacío

    }
    setLoading(true);
    //Mandamos la creación de la cuenta y enviamos el correo electrónico
    await MuySaludableApi.post(
      "/usuarios",
      requestNewUser
    ).then((responseUser:any) => {
      console.log("SE CREÓ USUARIO");
      console.log(JSON.stringify(responseUser,null,1));
      if( responseUser.data.status == "Duplicate" ){
        setLoading(false);
        Alert.alert("Ya existe una cuenta con el email proporcionado, favor de verificar");
        setUser("");
        setPwd("");
      }else{
        //Aquí ya se creó usuario
        //Enviamos correo
        const requestEmail = {
          email: user
        };
        MuySaludableApi.post(
          "/sendEmail/sendWelcomeEmailOnlyUser",
          requestEmail
        ).then((responseEmail:any) =>{
          console.log("El email se envió correctamente");
          
          const requestLogin = {
            email: responseUser.data.data.email, 
            password: responseUser.data.data.password, 
          };
          //Simulamos el login
          MuySaludableApi.post(
            "/usuarios/login",
            requestLogin
          ).then( (responseLoginSimulado:any) => {
            console.log("LOGIN SIMULADO");
            console.log(JSON.stringify(responseLoginSimulado,null,1));
            setLoading(false);
            if( responseLoginSimulado.data.status == "Ok" ) {
              //Al establecer valores en authStore, entra el App.tsx y ahí se valida cual pantalla de muestra
              //AsyncStorage.setItem( "user", JSON.stringify(responseLoginSimulado.data.data) );
              //useAuthStore.setState({ status: "userWithoutSuscription" });

              AsyncStorage.setItem("user", JSON.stringify(responseLoginSimulado.data.data)).then(() => {
                useAuthStore.setState({ status: "userWithoutSuscription" });
              });
            }
          }).catch( (errorLogin:any) =>{
            console.log("LOGIN SIMULADO INCORRECTO");
            console.log(JSON.stringify(errorLogin,null,1));
            setLoading(false);
          });



          //Establecemos información en AsyncStorage para guardar info del usuario creado y simular el login
          //AsyncStorage.setItem( "user", JSON.stringify(responseUser.data.data) );

          //useAuthStore.setState({ status: "authenticated" });
          //useAuthStore.setState({ user: responseUser.data.data });
          setLoading(false);
          setModalVisible(false);
          //Aquí ya se envió el email, procedemos a mostrar la página de bienvenida
          navigation.navigate("NewUserScreen");
        }).catch( (error:any) =>{
          console.log("NO SE ENVIÓ CORREO");
          console.log(JSON.stringify(error,null,1));
          setLoading(false);
        })
      }

    }).catch((error:any) => {
      console.log("NO SE CREÓ USUARIO");
      console.log(JSON.stringify(error,null,1));
      setLoading(true);
                     
    });


    
  }

  const getPlanes = async() => {
    try {
        setLoading(true);
        const resp = await MuySaludableApi.get("/planesAlimenticios")
        .then((responsePlanes:any) => {
          setPlanes(responsePlanes.data.elementos);
          setLoading(false);
        })
        .catch((error:any) =>{
          console.log(JSON.stringify( error,null,3 ));
          setLoading(false);
        });

        //console.log( resp.data.elementos )
        //setPlanes(resp.data.elementos);

    } catch (error) {
        console.log(error)
        setLoading(false);
    }

  }

  const generarId = () => {
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36);

    return random + fecha;
  };

  function LoadingAnimation() {
    return (
      <View style={styles.indicatorWrapper}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.indicatorText}>Cargando...</Text>
      </View>
    );
  }

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

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../../assets/background_carrete_frutas.jpg")}
        style={styles.imageBackground}
      />

      {
        !showRenew ? 
        <View>
          {/* Título */}
          <View style={styles.tituloContainer}>
            <Text style={styles.tituloText}>LLEGÓ EL MOMENTO</Text>
            <Text style={styles.tituloText}>DE MANTENERTE</Text>
            <Text style={styles.tituloTextOrange}>MUY SALUDABLE</Text>
          </View>

          <View style={styles.contentContainer}>

          
            <View style={styles.contentContainer}>
              <Text style={styles.contentTitulo}>Mejora tu alimentación,</Text>
              <Text style={styles.contentTitulo}>fortalece tu cuerpo,</Text>
              <Text style={styles.contentTitulo}>equilibra tu mente y potencía</Text>
              <Text style={styles.contentTitulo}>tu bienestar financiero.</Text>
            </View>

            <View style={styles.contentContainer}>
              <Text style={styles.contentTitulo}>Empieza hoy tu camino</Text>
              <Text style={styles.contentTitulo}>hacia una vida más saludable.</Text>
            </View>

            {/* <View style={styles.contentContainer}>
              <Text style={styles.tituloText}>¡Regístrate!</Text>
            </View> */}

            <TouchableOpacity 
              style={styles.containerClick}
              onPress={() => openModalUserPassword()}
              >
              <Text style={styles.textClic}>
                ¡Comienza ya!
              </Text>
            </TouchableOpacity>

            <View style={styles.logoContainer}>
              <Image
                source={require("../../../assets/logoMuySaludableMR.png")}
                style={styles.logoImage}
              />
            </View>
          </View>
        </View>
        : 
        <View>
          <View style={styles.logoutContainer}>
            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
              <Text style={styles.logoutText}>Cerrar sesión</Text>
            </TouchableOpacity>
          </View>
          {/* Título */}
          <View style={styles.tituloContainer}>
            <Text style={styles.tituloText}>TU PLAN HA EXPIRADO</Text>
            <Text style={styles.tituloText}>ES MOMENTO DE</Text>
            <Text style={styles.tituloTextOrange}>RENOVARLO</Text>
          </View>

          <View style={styles.contentContainerRenew}>
          <View style={styles.contentContainerRenew}>
            <Text style={styles.contentTitulo}>Recupera tu alimentación</Text>
            <Text style={styles.contentTitulo}>balanceada, tu bienestar</Text>
            <Text style={styles.contentTitulo}>físico, mental y financiero.</Text>
            
          </View>

          <View style={styles.contentContainerRenew}>
            <Text style={styles.contentTitulo}>Renueva hoy y continúa</Text>
            <Text style={styles.contentTitulo}>tu camino hacia una vida</Text>
            <Text style={styles.contentTituloRenew}>Muy Saludable</Text>
          </View>

          <TouchableOpacity 
            style={styles.containerClick}
            onPress={() => handleRenewNow()}
            >
            <Text style={styles.textClic}>
              ¡Renovar ahora!
            </Text>
          </TouchableOpacity>

          <View style={styles.logoContainer}>
            <Image
              source={require("../../../assets/logoMuySaludableMR.png")}
              style={styles.logoImage}
            />
          </View>
      </View>

        </View>
      }

      {/* Menú selección de planes */}
      {/* <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}> */}

      {/* {planes.map((element) => (
          <TouchableOpacity
            key={element.id}
            onPress={() => handleOpenModal(element)}
            style={styles.containerPlan}
          >
            <Text style={styles.titlePlanText}>{element.nombre}</Text>
            <Text style={styles.contentPlanText}>{element.resumen}</Text>
             <View style={styles.priceContainer}>
              <Text style={styles.priceText}>De </Text>
              <View style={styles.strikeThroughContainer}>
                <Text style={styles.priceStrike}>${element.precio_regular}</Text>
                <View style={styles.strikeThroughLine} />
              </View>
              <Text style={styles.priceText}> a ${element.precio}</Text>
            </View> 
            <View style={styles.containerClick}>
              <Text style={styles.textClic}>
                DA CLIC
              </Text>
            </View>
          </TouchableOpacity>
        ))} */}
        
      {/* </ScrollView> */}
      
      {/* Modal */}
      <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.closeIcon}
                onPress={handleCloseModal}
              >
                <Icon name="times" size={20} color="#55851F" />
              </TouchableOpacity>

              {/* Sección de Título */}
              <View style={styles.modalSection}>
                <Text style={styles.texto}>Ingresa la siguiente información</Text>
                <Text style={styles.texto}>para crear una cuenta</Text>
                <Text style={styles.texto}>y descubre como</Text>
                <Text style={styles.texto}>transformar tu vida</Text>
              </View>
              <View style={styles.containerTextInput}>
                <TextInput
                  style={styles.textInputStyle}
                  //placeholderTextColor="#55851F"
                  //autoCapitalize={"characters"}
                  placeholder="Email"
                  value={user}
                  onChangeText={(value) => setUser(value)}
                />
                
              </View>
              {
                (showTextUser) && <Text style={styles.textError}>{ textErrorEmail }</Text> 
                //El email es requerido
              }
              <View style={styles.containerTextInput}>

                <TextInput
                  style={styles.textInputStyle}
                  placeholder="Teléfono"
                  value={telefono}
                  keyboardType="phone-pad"
                  onChangeText={(value) => setTelefono(formatPhoneNumber(value))}
                />
                
                <TouchableOpacity onPress={() => setShowTooltip(!showTooltip)} style={styles.tooltipIcon}>
                  <Icon name="info-circle" size={18} color="#55851F" />
                </TouchableOpacity>

                {showTooltip && (
                  <View style={styles.tooltipContainer}>
                    <Text style={styles.tooltipText}>
                      Al agregar tu teléfono podremos enviarte ofertas especiales y consejos útiles para cuidar tu salud.
                    </Text>
                  </View>
                )}
              </View>
              

              <View style={styles.containerTextInput}>
                <TextInput
                  style={styles.textInputStyle}
                  //placeholderTextColor="#55851F"
                  //autoCapitalize={"characters"}
                  placeholder="Contraseña"
                  secureTextEntry={true}
                  value={pwd}
                  onChangeText={(value) => setPwd(value)}
                />
              </View>
              {
                (showTextPwd) && <Text style={styles.textError}>{ textErrorPwd }</Text>
                //La contraseña es requerida
              }


              {/* Sección de Subtítulo */}
{/*               
              <View style={styles.modalSection}>
                <Text style={styles.subtitle}>{selectedView?.nombre}</Text>
              </View> */}

              {/* Sección de características */}
{/* 
              <View style={styles.modalSection}>
                <View style={styles.characteristicItem}>
                  <View style={styles.containerBullet}>
                    {selectedView?.descripcion_detallada
                      .split("\n")
                      .slice(0, -1)
                      .map((linea, index) => (
                        <View key={index} style={styles.itemContainer}>
                          <Text style={styles.bullet}>•</Text>
                          <Text style={styles.texto}>{linea}</Text>
                        </View>
                      ))}
                  </View>
                </View>
              </View>
               */}
              {/* Botón para seleccionar */}
              <View style={styles.modalSection}>
                <RoundedButton
                  text="Crear cuenta"
                  // onPress={() => navigation.navigate("ResumeChoosenPlanScreen",{ selectedPlan: selectedView })}
                  // onPress={onNavigate}
                  onPress={ createAccount }
                />
              </View>
            </View>
          </View>
          {loading && <LoadingAnimation />}
        </Modal>

      {loading && <LoadingAnimation />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  imageBackground: {
    width: "100%",
    height: height,
    position: 'absolute',
  },
  tituloContainer: {
    //position: "absolute",
    alignSelf: "center",
    //top: "5%",
    marginTop: '20%',
  },
  tituloText: {
    color: "#326807",
    alignSelf: "center",
    fontSize: 24,
    //fontWeight: "bold",
    fontFamily: "Gotham-Ultra",
  },
  tituloTextOrange: {
    color: "#faa029",
    alignSelf: "center",
    fontSize: 24,
    //fontWeight: "bold",
    fontFamily: "Gotham-Ultra",
  },
  contentContainer: {
    //position: "absolute",
    alignSelf: "center",
    //top: "5%",
    marginTop: 30,
  },
  contentContainerRenew: {
    //position: "absolute",
    alignSelf: "center",
    //top: "5%",
    marginTop: 20,
  },
  contentTitulo: {
    color: "#326807",
    top: 10,
    fontSize: 20,
    textAlign: "center",
    //fontWeight: "bold",
    fontFamily: "Gotham-Book",
  },
  contentTituloRenew: {
    color: "#faa029",
    top: 10,
    fontSize: 20,
    textAlign: "center",
    //fontWeight: "bold",
    fontFamily: "Gotham-Book",
  },
  planContainerMain: {
    flex: 1,
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    marginTop: "12%",
    //backgroundColor: "blue",
    // flex: 1,
    // width: "80%",
  },

  containerPlan: {
    width: "90%",
    //height: "15%",
    //backgroundColor: "#faa029",
    borderRadius: 9,
    padding: 7,
    top: 5,
    borderColor: "#faa029",
    borderWidth: 2,
    marginVertical: 13,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    alignItems: "center",
    //shadowOpacity: 0.1,
    //shadowRadius: 3.84,
    //elevation: 5,
  },

  titlePlanText: {
    color: "#faa029",
    //fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Gotham-Ultra",
  },
  contentPlanText: {
    color: "#326807",
    textAlign: "center",
    fontSize: 14,
    fontFamily: "Gotham-Medium",
    top: 5,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 5,
  },
  priceText: {
    fontSize: 20,
    color: "#326807",
    fontFamily: "Gotham-Ultra",
  },
  strikeThroughContainer: {
    position: "relative",
  },
  priceStrike: {
    color: "#326807",
    fontSize: 20,
    fontFamily: "Gotham-Ultra",
    textDecorationLine: "line-through",
    textDecorationColor: "red", // No afecta el color de la línea en todos los dispositivos
  },
  strikeThroughLine: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 2, // Grosor de la línea
    backgroundColor: "#faa029", // Color de la línea
    top: "50%", // Coloca la línea en la mitad vertical del texto
  },
  containerClick: {
    borderRadius: 15,
    padding: 10,
    width: '50%',
    //top: 5,
    backgroundColor: "#faa029",
    marginVertical: 30,
    alignItems: "center",
    alignSelf:"center"
    
  },
  textClic: {
    color: "#ffffff",
    fontSize: 18,
    fontFamily: "Gotham-Medium",
    textAlign: "center",
    //top: 10,
    //marginBottom: 7,
  },
  logoContainer: {
    //position: "absolute",
    alignSelf: "center",
    alignItems: "center",
    //top: "35%",
  },
  logoImage: {
    width: 100,
    height: 103,
  },
  logoutContainer: {
    position: "absolute",
    //marginTop: '50%',
    //top: 10,
    right: 10,
    marginTop:20
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo oscuro del modal
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: MyColors.backgroundViews,
    borderRadius: 10,
    alignItems: "center",
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  modalSection: {
    margin: 10,
    alignItems:"center"
  },
  title: {
    color: "#55851F",
    fontSize: 24,
    //fontWeight: "bold",
    fontFamily: "Gotham-Ultra",
  },
  containerTextInput: {
    margin: 10,
    borderRadius: 15,
    width: "80%",
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    //paddingHorizontal: 10,
    //padding: 5
  },
  textInputStyle: {
    color: "#55851F",
    // fontWeight: "bold",
    padding: 10,
    //marginTop: 10,
    width: "80%",
    textAlign: "center",
    fontFamily: "Gotham-Medium",
  },
  tooltipIcon: {
    position: 'absolute',
    right: 10,
    top: '35%', // Centrado verticalmente en el TextInput
    zIndex: 2, // Asegura que el ícono esté por encima del tooltip
  },
  tooltipContainer: {
    position: 'absolute',
    top: -50, // Aparece arriba del input, puedes ajustar el valor
    //right: '3%',
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    maxWidth: 220,
    zIndex: 1, // Tooltip debajo del icono
  },
  tooltipText: {
    fontSize: 12,
    color: '#55851F',
  },
  textError: {
    color: "red",
    fontSize: 12,
    fontFamily: "Gotham-Medium",
  },
  subtitle: {
    color: "#55851F",
    fontSize: 18,
    //fontStyle: "italic",
    fontFamily: "Gotham-BlackItalic",
  },
  characteristicItem: {
    marginBottom: 5,
  },
  containerBullet: {
    padding: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  bullet: {
    fontSize: 20,
    marginRight: 5,
  },
  texto: {
    color: "#55851F",
    fontSize: 15,
    fontFamily: "Gotham-Medium",
  },
  indicatorWrapper: {
    flex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(100, 100, 100, 0.6)",
  },
  indicatorText: {
    fontSize: 18,
    marginTop: 12,
    color: "#ffffff",
    fontFamily: "Gotham-Medium",
  },
  scrollView: {
    flex: 1, // Ocupa el espacio restante debajo de título.
    marginTop: 20, // Ajustar según sea necesario.
    width: '100%', // Asegura que el ScrollView ocupe todo el ancho disponible.
    //height: '50%',
    paddingHorizontal: 20,
    marginBottom: '28%',
  },
  scrollViewContent: {
    justifyContent: "center",
    alignItems: "center",
    //paddingBottom: '25%', // Ajuste adicional para asegurar el contenido no toque el borde.
  },
  text: {
    fontSize: 42,
  },
});

