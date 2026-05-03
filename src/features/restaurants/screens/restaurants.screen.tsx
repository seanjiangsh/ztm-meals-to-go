import { memo } from "react";
import { StyleSheet, View } from "react-native";
import { Searchbar } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import RestaurantInfo from "../components/restaurant-info.component";

function RestaurantsScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.searchBar}>
          <Searchbar placeholder="Search restaurants" value="" />
        </View>
        <View style={styles.list}>
          <RestaurantInfo />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default memo(RestaurantsScreen);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff"
  },
  searchBar: {
    padding: 16
  },
  list: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16
  }
});
