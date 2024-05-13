import Api from "./lib/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

const hostUri = Constants.expoConfig?.hostUri || "";
const [address] = hostUri.split(":");
const port = 8080;

const api = new Api({
  baseURL: `http://${address}:${port}/api`,
  getAuthToken: async () => {
    const token = await AsyncStorage.getItem("auth-token");
    return token;
  },
  setAuthToken: async (token) => {
    token
      ? await AsyncStorage.setItem("auth-token", token)
      : await AsyncStorage.removeItem("auth-token");
  },
});

export default api;
