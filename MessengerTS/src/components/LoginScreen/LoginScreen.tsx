import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";
import styles from "./styles";
import { LoginScreenProps } from "./types";
import { Button, HelperText, TextInput } from "react-native-paper";
import { useMutation } from "@tanstack/react-query";
import api from "../../api";

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
    mutationFn: (variables: { email: string; password: string }) =>
      api.auth.login(variables),
    onSuccess: () => {
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
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              label={"Password"}
              autoCapitalize="none"
              autoCorrect={false}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Button
              mode="contained"
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
