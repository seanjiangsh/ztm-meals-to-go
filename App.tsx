import { Provider as PaperProvider } from "react-native-paper";

import RestaurantsScreen from "./src/features/restaurants/screens/restaurants.screen";

export default function App() {
  return (
    <PaperProvider>
      <RestaurantsScreen />
    </PaperProvider>
  );
}
