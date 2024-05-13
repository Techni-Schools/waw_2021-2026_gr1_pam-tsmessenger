import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";
import styles from "./styles";
import { LoginScreenProps } from "./types";
import { TextInput, Button, HelperText } from "react-native-paper";
import { useMutation } from "@tanstack/react-query";
import api from "../../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen: React.FC<LoginScreenProps> = (props) => {
  const { navigation } = props;
  const { navigate } = navigation;

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const {
    mutate: login,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (variables: { email: string; password: string }) =>
      api.auth.login(variables),
    onSuccess: async ({ token }) => {
      await AsyncStorage.setItem("auth-token", token);
      navigate("Splash");
    },
  });

  return (
    <SafeAreaView style={[styles.container]}>
      <KeyboardAvoidingView
        enabled
        behavior="padding"
        keyboardVerticalOffset={10}
        style={{
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <ScrollView style={{ padding: 25 }}>
          <View style={{ gap: 8 }}>
            <TextInput
              label={"Email"}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />
            <TextInput
              label={"Password"}
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
              secureTextEntry
            />
            <Button
              mode={"contained"}
              disabled={isPending}
              onPress={() => login({ email, password })}
            >
              Sign in
            </Button>
            <HelperText type="error" visible={error !== undefined}>
              {error?.message}
            </HelperText>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
