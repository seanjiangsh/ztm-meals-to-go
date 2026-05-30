import { Lato_400Regular } from "@expo-google-fonts/lato";
import { Oswald_400Regular } from "@expo-google-fonts/oswald";
import { useFonts } from "expo-font";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "styled-components/native";

import RestaurantsScreen from "@/features/restaurants/screens/restaurants.screen";
import { theme } from "@/infra/index";

export default function App() {
  const [fontsLoaded] = useFonts({
    Lato_400Regular,
    Oswald_400Regular
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <PaperProvider>
          <RestaurantsScreen />
        </PaperProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
