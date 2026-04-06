import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <View style={styles.searchHeaderContainer}>
          <Text style={styles.searchText}>Search</Text>
        </View>
        <View style={styles.mainContent}>
          <ul>
            <li>Coffee</li>
            <li>Tea</li>
            <li>Milk</li>
          </ul>
        </View>
        <StatusBar style="auto" />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  searchHeaderContainer: {
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: "#8f8f8f",
  },
  searchText: {
    fontSize: 24,
    fontWeight: "bold",
    paddingTop: 5,
    paddingBottom: 5,
  },
  mainContent: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: "#e0e0e0",
  },
});
