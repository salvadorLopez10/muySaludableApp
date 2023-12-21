import { StackScreenProps } from '@react-navigation/stack';
import React from 'react'
import { Button } from 'react-native';
import { StyleSheet, Text, View } from 'react-native'

interface Props extends StackScreenProps<any,any>{};

export const PaymentScreen = ( {navigation}: Props ) => {

  const onNavigateQuiz = () => {

    navigation.navigate("QuizScreen");
  };

  return (
    <View style={styles.container}>
      <Text>PaymentScreen</Text>
      <Button title="Siguiente" onPress={onNavigateQuiz}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})