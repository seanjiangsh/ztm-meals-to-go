import { Lato_400Regular } from "@expo-google-fonts/lato";
import { Oswald_400Regular } from "@expo-google-fonts/oswald";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import type { ComponentProps } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "styled-components/native";

import MapScreen from "@/features/map/screens/map.screen";
import RestaurantsScreen from "@/features/restaurants/screens/restaurants.screen";
import SettingsScreen from "@/features/settings/screens/settings.screen";
import { theme } from "@/infra/index";
import { RestaurantsContextProvider } from "@/services/restaurants/restaurants.context";

const Tab = createBottomTabNavigator();

type IoniconName = ComponentProps<typeof Ionicons>["name"];

const TAB_ICONS: Record<string, IoniconName> = {
  Restaurants: "restaurant",
  Map: "map",
  Settings: "settings"
};

const tabScreenOptions = ({ route }: { route: { name: string } }) => ({
  tabBarIcon: ({ color, size }: { color: string; size: number }) => (
    <Ionicons name={TAB_ICONS[route.name]} size={size} color={color} />
  )
});

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
          <NavigationContainer>
            <RestaurantsContextProvider>
              <Tab.Navigator screenOptions={tabScreenOptions}>
                <Tab.Screen name="Restaurants" component={RestaurantsScreen} />
                <Tab.Screen name="Map" component={MapScreen} />
                <Tab.Screen name="Settings" component={SettingsScreen} />
              </Tab.Navigator>
            </RestaurantsContextProvider>
          </NavigationContainer>
        </PaperProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
