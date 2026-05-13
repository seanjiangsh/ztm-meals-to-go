import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "styled-components";

import RestaurantsScreen from "./src/features/restaurants/screens/restaurants.screen";
import { theme } from "./src/infra/index";

export default function App() {
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
