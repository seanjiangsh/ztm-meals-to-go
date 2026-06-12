import { Lato_400Regular } from "@expo-google-fonts/lato";
import { Oswald_400Regular } from "@expo-google-fonts/oswald";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { ComponentProps } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "styled-components/native";

import MapScreen from "@/features/map/screens/map.screen";
import RestaurantsScreen from "@/features/restaurants/screens/restaurants.screen";
import SettingsScreen from "@/features/settings/screens/settings.screen";
import { theme } from "@/infra/index";

const Tab = createBottomTabNavigator();

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
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                  let iconName: ComponentProps<typeof Ionicons>["name"];

                  if (route.name === "Restaurants") {
                    iconName = "restaurant";
                  } else if (route.name === "Map") {
                    iconName = "map";
                  } else {
                    iconName = "settings";
                  }

                  return <Ionicons name={iconName} size={size} color={color} />;
                }
              })}
            >
              <Tab.Screen name="Restaurants" component={RestaurantsScreen} />
              <Tab.Screen name="Map" component={MapScreen} />
              <Tab.Screen name="Settings" component={SettingsScreen} />
            </Tab.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
