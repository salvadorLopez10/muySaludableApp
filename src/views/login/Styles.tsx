import { StyleSheet } from "react-native";

const LoginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  imageBackground: {
    //top:"2%",
    width: "100%",
    height: "75%",
    opacity: 0.7,
    bottom: "5%",
  },
  form: {
    width: "100%",
    height: "44%",
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 30,
  },
  formText: {
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "Gotham-Medium",
  },
  formIcon: {
    width: 25,
    height: 25,
    marginTop: 5,
  },
  formInput: {
    flexDirection: "row",
    marginTop: 30,
  },
  formTextInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#AAAAAA",
    marginLeft: 15,
  },
  formForgotPassword: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  formForgotPasswordText: {
    fontStyle: "italic",
    color: "orange",
    borderBottomWidth: 1,
    borderBottomColor: "orange",
    //marginLeft: 10,
  },
  formRegister: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  formRegisterText: {
    fontStyle: "italic",
    color: "orange",
    borderBottomWidth: 1,
    borderBottomColor: "orange",
    marginLeft: 10,
  },
  brandMark:{
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },
  textBrandMark:{
    fontStyle: "italic",
    color: "#d3cfcf",
    fontSize: 11
  },
  logoContainer: {
    position: "absolute",
    alignSelf: "center",
    alignItems: "center",
    top: "35%",
  },
  logoImage: {
    width: 100,
    height: 100,
  },
  logoText: {
    color: "white",
    //textAlign: "center",
    fontSize: 20,
    //marginTop: 10,
    //fontWeight: "bold",
    fontFamily: "Gotham-Ultra",
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
  inputContainer: {
    flexDirection: "row", // Permite colocar el ícono de ojo al lado del TextInput
    alignItems: "center",
    //marginBottom: 10,
    //width: '90%', // Asegurar que ocupe todo el ancho
  },
  eyeIconContainer: {
    //justifyContent: "center", // Centrar el icono verticalmente
    //alignItems: "center",
    //padding: 10,
    marginRight: 30
  },
});

export default LoginStyles;
