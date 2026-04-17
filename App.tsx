import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const drinks = ["Coffee", "Tea", "Milk"];

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.searchHeaderContainer}>
            <Text style={styles.searchText}>Search</Text>
          </View>
          <View style={styles.mainContent}>
            {drinks.map((drink) => (
              <View key={drink} style={styles.listItem}>
                <Text style={styles.listBullet}>{"\u2022"}</Text>
                <Text style={styles.listItemText}>{drink}</Text>
              </View>
            ))}
          </View>
          <StatusBar style="auto" />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#8f8f8f",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchHeaderContainer: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 6,
    backgroundColor: "#8f8f8f",
  },
  searchText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  mainContent: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: "#e0e0e0",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  listBullet: {
    fontSize: 18,
    marginRight: 8,
  },
  listItemText: {
    fontSize: 16,
  },
});
