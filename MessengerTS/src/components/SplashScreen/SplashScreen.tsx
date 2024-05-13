import React from "react";
import { View } from "react-native";
import styles from "./styles";
import { SplashScreenProps } from "./types";
import { ActivityIndicator } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useFocusEffect from "../../hooks/useFocusEffect";

const SplashScreen: React.FC<SplashScreenProps> = (props) => {
  const { navigation } = props;
  const { navigate } = navigation;

  useFocusEffect(() => {
    AsyncStorage.getItem("auth-token").then((token) => {
      if (token) navigate("Conversations");
      else navigate("Login");
    });
  }, []);

  return (
    <View style={[styles.container]}>
      <ActivityIndicator size={80} />
    </View>
  );
};

export default SplashScreen;
