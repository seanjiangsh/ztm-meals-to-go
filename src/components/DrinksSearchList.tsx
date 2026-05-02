import { memo, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Searchbar } from "react-native-paper";

type DrinksSearchListProps = {
  drinks: string[];
};

function DrinksSearchList({ drinks }: DrinksSearchListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDrinks = useMemo(
    () => drinks.filter((drink) => drink.toLowerCase().includes(searchQuery.trim().toLowerCase())),
    [drinks, searchQuery]
  );

  return (
    <>
      <View style={styles.searchHeaderContainer}>
        <Searchbar placeholder="Search drinks" value={searchQuery} onChangeText={setSearchQuery} />
      </View>

      <View style={styles.mainContent}>
        {filteredDrinks.map((drink) => (
          <View key={drink} style={styles.listItem}>
            <Text style={styles.listBullet}>{"\u2022"}</Text>
            <Text style={styles.listItemText}>{drink}</Text>
          </View>
        ))}

        {filteredDrinks.length === 0 ? (
          <Text style={styles.emptyStateText}>No drinks found.</Text>
        ) : null}
      </View>
    </>
  );
}

export default memo(DrinksSearchList);

const styles = StyleSheet.create({
  searchHeaderContainer: {
    width: "100%",
    backgroundColor: "#8f8f8f",
    paddingHorizontal: 20,
    paddingVertical: 8,
    justifyContent: "center"
  },
  mainContent: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: "#e0e0e0"
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8
  },
  listBullet: {
    fontSize: 18,
    marginRight: 8
  },
  listItemText: {
    fontSize: 16
  },
  emptyStateText: {
    marginTop: 16,
    fontSize: 16,
    color: "#4f4f4f"
  }
});
