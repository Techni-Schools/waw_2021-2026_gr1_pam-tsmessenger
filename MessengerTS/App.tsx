import { StyleSheet, Text, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import theme from "./theme";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "./src/components/SplashScreen";
import ConversationScreen from "./src/components/ConversationScreen";
import ConversationsScreen from "./src/components/ConversationsScreen";
import ProfileScreen from "./src/components/ProfileScreen";
import LoginScreen from "./src/components/LoginScreen";
import RegisterScreen from "./src/components/RegisterScreen";
import { queryClient } from "./queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { PusherProvider } from "@harelpls/use-pusher";

export type ParamList = {
  Login: undefined;
  Register: undefined;
  Profile: undefined;
  Conversations: undefined;
  Conversation: { conversationId: string };
  Splash: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends ParamList {}
  }
}

const Stack = createNativeStackNavigator<ParamList>();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* @ts-ignore */}
      <PusherProvider clientKey="7d611eb6436fe6e14b1" cluster="eu">
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Splash"
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: theme.colors?.background },
              }}
            >
              <Stack.Screen name="Splash" component={SplashScreen} />
              <Stack.Screen
                name="Conversations"
                component={ConversationsScreen}
              />
              <Stack.Screen
                name="Conversation"
                component={ConversationScreen}
              />
              <Stack.Screen name="Profile" component={ProfileScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </PusherProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
