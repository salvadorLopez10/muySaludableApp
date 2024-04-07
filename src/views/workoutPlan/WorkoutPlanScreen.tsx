import React from "react";
import styles from "./Styles";
import {
  ImageBackground,
  SafeAreaView,
  Text,
  View,
  Image,
  ScrollView,
} from "react-native";
export const WorkoutPlanScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../../../assets/WorkoutBG.jpg")}
        style={styles.imageBackground}
      >
        <ScrollView>
          <View style={styles.containerText}>
            <Text style={styles.subtitleText}>
              RUTINA DE CARDIO
              {"\n"}
            </Text>
            <Text style={styles.textContent}>
              <Image
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9IMH6evN9BBkVPCJEUDkWrl0qkzroikbBdFk4-wWcig&s",
                }}
                style={styles.image}
              />
            </Text>
            <Text style={styles.subtitleText}>RUTINA DE ABDOMEN{"\n"}</Text>
            <Text style={styles.textContent}>
              <Image
                source={{
                  uri: "https://i.pinimg.com/564x/15/17/fc/1517fcaab8c44cbcfabf46566f901c8d.jpg",
                }}
                style={styles.image}
              />
            </Text>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};
