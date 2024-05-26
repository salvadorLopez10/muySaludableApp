import React, { useEffect, useState } from "react";
import styles from "./Styles";
import {
  ImageBackground,
  SafeAreaView,
  Text,
  View,
  Image,
  ScrollView,
} from "react-native";
import PlanContent from "./PlanContent";
import { useAuthStore } from "../../store/auth/useAuthStore";

interface UserProps {
  id: number;
  nombre: null | string;
  email: null | string;
  password: null | string;
  edad: null | string;
  altura: null | string;
  peso: null | string;
  sexo: null | string;
  actividad_fisica: null | string;
  tipo_dieta: null | string;
  alimentos_evitar: null | string;
  objetivo: null | string;
  estado_mexico: null | string;
  activo: boolean;
  createdAt: Date;
  updatedAt: Date;
  id_plan_alimenticio: number;
  nombre_plan: null | string;
  //nombre_plan: "Paquete Clásico" | "Paquete Intermedio" | "Paquete Premium" | "Paquete Anual" | undefined;
  tmb: null | string;
}

export const WorkoutPlanScreen = () => {

  const [userState, setUserState] = useState<UserProps | undefined>();

  useEffect(() => {
    const fetchDataUser = async () => {
      const user = await useAuthStore.getState().user;
      if (user) {
        //console.log(user);
        setUserState(user);
      }
    };
    fetchDataUser();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../../../assets/WorkoutBG.jpg")}
        style={styles.imageBackground}
      >
        {/* <ScrollView> */}
          <PlanContent planName={userState?.nombre_plan}/>
        {/* </ScrollView> */}
      </ImageBackground>
    </SafeAreaView>
  );
};
