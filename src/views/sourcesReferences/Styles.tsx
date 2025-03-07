import { StyleSheet } from "react-native";

const SourceReferencesStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    //width: "100%"
  },
  imageBackground: {
    // width: "100%",
    // height: "100%",
    flex: 1,
    //justifyContent: "center",
    alignItems: "center",
  },
  containerScroll:{
    //flex: 1,
    marginTop: '6%'
  },
  containerText: {
    margin: "10%",
    alignContent: "stretch",
  },
  textContent: {
    fontFamily: "Gotham-Book",
    textAlign: "justify",
  },
  subtitleText:{
    marginTop: "5%",
    fontFamily: "Gotham-Medium"
  },
  textBullet:{
    //fontSize: 16,
    textAlign: 'left',
    paddingLeft: 10,
    lineHeight: 22,
    flexWrap: 'wrap'
  },
  bullet: {
    fontSize: 16,
    marginRight: 6,
  },
  linkText: {
    color: 'blue', // Color de enlace
    textDecorationLine: 'underline',
    flexWrap: 'wrap',
    width: '100%'
  }
});

export default SourceReferencesStyles;
