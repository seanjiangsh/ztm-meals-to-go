import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import DrinksSearchList from "./src/components/DrinksSearchList";

// console.log("Platform:", Platform.OS, StatusBar.currentHeight);

const DRINKS = ["Coffee", "Tea", "Milk"];

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
            <DrinksSearchList drinks={DRINKS} />
            <ExpoStatusBar style="auto" />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff"
  },
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
