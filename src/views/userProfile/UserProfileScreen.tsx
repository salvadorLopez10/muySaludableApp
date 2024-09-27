import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native';
import { Text, View, ScrollView,Image, TouchableOpacity } from "react-native";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { activityLevelSelect } from '../quiz/DataDropdown';
import { StackScreenProps } from "@react-navigation/stack";

interface Props extends StackScreenProps<any,any>{};

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
  tmb: null | string;
}

interface ListType {
  id: string;
  label: string;
}


export const UserProfileScreen = ({ navigation }: Props) => {
  const [userState, setUserState] = useState<UserProps | undefined>();
  //const [userState, setUserState] = useState(null);

  const getLabelById = (
    id: string | undefined,
    list: ListType[]
  ): string | undefined => {
    const selectedOption = list.find((option) => option.id === id);
    return selectedOption?.label;
  };

   const userProfile = useAuthStore((state) => state.user);
   console.log("USEEEER PROFILE");
   console.log(JSON.stringify(userProfile, null, 2));

    const labelLevelActivity = getLabelById(
      userProfile?.actividad_fisica ?? undefined,
      activityLevelSelect
    );

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../../assets/logoMuySaludableMR.png")}
          style={styles.logoImage}
        />
      </View>
      <ScrollView>
        {userProfile && (
          <>
            <View style={styles.generalInfoContainer}>
              <Text style={styles.generalInfoSubtitleText}>
                {userProfile.email}
              </Text>
            </View>

            <View style={styles.infoUserContainer}>
              <View style={styles.dataUserBox}>
                <Text style={styles.dataUser}>{userProfile.edad} años</Text>
              </View>
              <View style={styles.dataUserBox}>
                <Text style={styles.dataUser}>
                  {Number(userProfile?.altura) / 100} m
                </Text>
              </View>
              <View style={styles.dataUserBox}>
                <Text style={styles.dataUser}>{userProfile?.peso} kg</Text>
              </View>
            </View>

            <View style={styles.statusSuscriptionContainer}>
              <Text style={styles.suscriptionText}>SUSCRIPCIÓN ACTIVA</Text>
              <Text style={styles.suscriptionPlan}>
                {userProfile.nombre_plan?.toUpperCase()}
              </Text>
            </View>

            <View style={styles.dataUserContainer}>
              <View style={styles.datosInfoBox}>
                <Text style={styles.datosInfoText}>TU TASA METABÓLICA BASAL:</Text>
                <Text style={styles.datosInfoText}>
                  {/* {Number(userProfile?.tmb).toFixed(2)} calorías */}
                  { Math.round(Number(userProfile?.tmb)).toLocaleString("es-MX") } calorías
                </Text>
              </View>
            </View>

            <View style={styles.dataUserContainer}>
              <View style={styles.datosInfoBox}>
                <Text style={styles.datosInfoText}>OBJETIVO:</Text>
                <Text style={styles.datosInfoText}>
                  {userProfile?.objetivo}
                </Text>
              </View>
            </View>

            <View style={styles.dataUserContainer}>
              <View style={styles.datosInfoBox}>
                <Text style={styles.datosInfoText}>TIPO DE DIETA:</Text>
                <Text style={styles.datosInfoText}>
                  {userProfile?.tipo_dieta}
                </Text>
              </View>
            </View>

            <View style={styles.dataUserContainer}>
              <View style={styles.datosInfoBox}>
                <Text style={styles.datosInfoText}>
                  NIVEL DE ACTIVIDAD FíSICA:
                </Text>
                <Text style={styles.datosInfoText}>{labelLevelActivity}</Text>
              </View>
            </View>
            <View style={styles.dataUserContainer}>
              <View style={styles.datosInfoBox}>
                <Text style={styles.datosInfoText}>ALIMENTOS A EVITAR:</Text>
                <Text style={styles.datosInfoText}>
                  {userProfile?.alimentos_evitar?.length == 0
                    ? "Sin alergia y/o consume cualquier alimento"
                    : userProfile?.alimentos_evitar}
                </Text>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    //justifyContent: "center",
  },
  logoContainer: {
    marginVertical: 20,
    alignSelf: "center",
    //top: "10%",
  },
  logoImage: {
    width: 100,
    height: 103,
  },
  generalInfoContainer: {
    width: "100%",
    alignItems: "center",
  },
  generalInfoTitleText: {
    fontSize: 20,
    color: "#326807",
    //fontWeight: "bold",
    marginVertical: 5,
    fontFamily: "Gotham-Ultra",
  },
  generalInfoSubtitleText: {
    fontSize: 16,
    color: "#326807",
    //fontWeight: "bold",
    fontFamily: "Gotham-Ultra",
  },
  infoUserContainer: {
    flexDirection: "row",
    width: "80%",
    top: 10,
    alignItems: "center",
    margin: "10%",
    marginVertical: 10,
  },
  dataUserBox: {
    width: "33%",
    alignItems: "center",
    backgroundColor: "#faa029",
    borderRadius: 10,
    padding: 5,
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
  dataUser: {
    fontSize: 16,
    //fontWeight: "bold",
    marginVertical: 5,
    color: "#ffff",
    fontFamily: "Gotham-Medium",
  },
  statusSuscriptionContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 15,
  },
  suscriptionText: {
    fontSize: 18,
    color: "#326807",
    //fontWeight: "bold",
    marginVertical: 3,
    fontFamily: "Gotham-Ultra",
  },
  suscriptionPlan: {
    fontSize: 18,
    color: "#326807",
    //fontWeight: "bold",
    marginVertical: 3,
    textDecorationLine: "underline",
    fontFamily: "Gotham-Ultra",
  },
  dataUserContainer: {
    width: "100%",
    alignItems: "center",
  },
  datosInfoBox: {
    width: "90%",
    alignItems: "center",
    backgroundColor: "#faa029",
    borderRadius: 10,
    padding: 5,
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
  datosInfoText: {
    fontSize: 16,
    //fontWeight: "bold",
    marginVertical: 5,
    color: "#ffff",
    fontFamily: "Gotham-Medium",
  },
  footer: {
    width: "100%",
    alignItems: "center",
  },
  buttonDeleteContainer: {
    width: "80%",
    alignItems: "center",
  },
  buttonDelete: {
    padding: 10,
    width: "100%",
    borderWidth: 1,
    borderColor: "rgba(224, 26, 0, 0.8)",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    alignItems: "center",
    //marginTop: 10,
    borderRadius: 15,
    marginVertical: 10,
  },
});