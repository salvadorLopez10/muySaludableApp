import { StyleSheet } from "react-native";

const MainMenuStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    //width: "100%"
  },
  containerScroll: {
    flex: 1,
    width: "80%",
    backgroundColor: "",
    //marginLeft: '5%',
    //marginRight: "5%"
  },
  imageBackground: {
    // width: "100%",
    // height: "100%",
    flex: 1,
    //justifyContent: "center",
    alignItems: "center",
  },
  scroll: {
    flex: 1,
    width: "100%",
  },
  dataUserContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    //position: "absolute",
  },
  dataTitleContainer: {
    width: "80%",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  datosInfoBox: {
    width: "80%",
    alignItems: "center",
    backgroundColor: "#faa029",
    borderRadius: 10,
    padding: 20,
    top: 5,
    margin: 3,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  datosInfoTitle: {
    width: "80%",
    alignItems: "center",
    backgroundColor: "#faa029",
    //borderRadius: 10,
    padding: 10,
    top: 5,
    margin: 3,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 15,
  },
  datosTitleText: {
    fontSize: 16,
    fontFamily: "Gotham-Ultra",
    marginVertical: 5,
    color: "#ffffff",
  },
  datosInfoText: {
    fontSize: 16,
    fontFamily: "Gotham-Ultra",
    marginVertical: 5,
    color: "#2E2A21",
  },
  contentTitleContainer: {
    width: "90%",
    alignItems: "center",
    //marginTop: 20,
    marginBottom: 1,
  },
  contentInfoTitle: {
    width: "90%",
    alignItems: "center",
    padding: 5,
    //margin: 2,
  },
  contentInstructionTitle: {
    width: "90%",
    alignItems: "center",
    padding: 5,
    //margin: 2,
  },
  contentTitleText: {
    fontSize: 16,
    fontFamily: "Gotham-Ultra",
    //marginVertical: 5,
    color: "#2E2A21",
  },
  contentTitleCalories: {
    fontSize: 16,
    fontFamily: "Gotham-Ultra",
    marginVertical: 5,
    color: "#326807",
  },
  contentInstructionText:{
    fontSize: 12,
    fontFamily: "Gotham-Medium",
    marginVertical: 3,
    color: "#2E2A21",
  },
  textSmall: {
    fontSize: 16,
  },
  seperator: {
    height: 12,
  },
  accordContainer: {
    paddingBottom: 10,
    width: "100%",
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 10,
  },
  accordHeader: {
    padding: 15,
    //backgroundColor: "#faa029",
    color: "#fffff",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 15,
  },
  accordTitle: {
    fontSize: 20,
  },
  accordBody: {
    padding: 5,
  },
  containerTextOpcionTitle: {
    alignItems: "center",
    marginTop: 3,
    marginBottom: 10
  },
  textTitleComida: {
    fontFamily: "Gotham-BlackItalic",
    fontSize: 15,
  },
  textTitleNumberOpcion: {
    fontFamily: "Gotham-Book",
    textDecorationLine: "underline",
    fontSize: 15,
    marginBottom: 10,
  },
  textTitleOpcion: {
    fontFamily: "Gotham-Ultra",
    fontSize: 15,
  },
  ingredienteContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  ingredientContainer: {
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
  ingredientText: {
    fontSize: 14,
    color: '#333',
  },
  bullet: {
    fontSize: 20,
    marginRight: 5,
  },
  textoComida: {
    color: "#2E2A21",
    fontSize: 15,
    fontFamily: "Gotham-Medium",
  },
  btnPDF: {
    backgroundColor: "#326807",
    padding: 10,
    width: "80%",
    alignItems: "center",
    borderRadius: 15,
    marginBottom: "5%",
  },
  textBtnPDF: {
    fontSize: 16,
    fontFamily: "Gotham-Ultra",
    marginVertical: 5,
    color: "#ffffff",
  },
  spacer: {
    height: 8,
  },
  printer: {
    textAlign: "center",
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
  link: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#007bff", // Color de fondo similar a los enlaces
    borderRadius: 5,
  },
  linkText: {
    color: "#fff", // Color del texto similar a los enlaces
    fontWeight: "bold",
    textAlign: "center",
  },
  btnLinkRecetario: {
    backgroundColor: "#2E2A21",
    padding: 10,
    width: "80%",
    alignItems: "center",
    borderRadius: 15,
    marginBottom: "5%",
  },
  containerSinPlan:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredTextSinPlan:{
    fontSize: 18,
    fontFamily: "Gotham-Ultra",
    //marginVertical: 5,
    color: "#2E2A21",
  },
  btnVerify: {
    marginTop:15,
    backgroundColor: "#326807",
    //backgroundColor: "#009144",
    padding: 10,
    //width: "90%",
    alignItems: "center", 
    borderRadius: 15,
    marginBottom: "5%",
  },
  textVerify: {
    fontSize: 16,
    fontFamily: "Gotham-Ultra",
    marginVertical: 5,
    color: "#ffffff",
  },
});

export default MainMenuStyles;
