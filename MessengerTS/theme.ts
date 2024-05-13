import { MD3DarkTheme, configureFonts } from "react-native-paper";
import { MD3Type, ThemeProp } from "react-native-paper/lib/typescript/types";

const theme: ThemeProp = {
  ...MD3DarkTheme,

  colors: {
    ...MD3DarkTheme.colors,
    primary: "#0EF5E3", // Kolor główny, użyty na przyciskach
    background: "#201a31", // Kolor tła
    surface: "#38304d", // Kolor powierzchni dla elementów jak karty czy modale
    error: "#ff6080",
  },
};

export default theme;
