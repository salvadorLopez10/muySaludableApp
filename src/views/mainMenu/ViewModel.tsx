import React, { useState } from "react";
import { MuySaludableApi } from "../../api/MuySaludableApi";
import { Alert } from "react-native";
import {
  useNavigation,
  NavigationProp,
  CommonActions,
} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootStackParams } from "../../navigator/StackNavigator";
import { useAuthStore } from "../../store/auth/useAuthStore";

const MainMenuViewModel = (  ) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const onChange = (property: string, value: any) => {
    setValues({ ...values, [property]: value });
  };

  const handleLogout = async () => {
    console.log("CERRANDO SESSIÓN");

    await AsyncStorage.removeItem("user");

    useAuthStore.setState({status:"unauthenticated"});
    useAuthStore.setState({user:undefined});


    // navigation.dispatch(
    //   CommonActions.reset({
    //     index: 1,
    //     routes: [{ name: "LoginScreen" }],
    //   })
    // );
    //navigation.navigate();
  };

  return {
    ...values,
    onChange,
    handleLogout,
  };
};

export default MainMenuViewModel;
