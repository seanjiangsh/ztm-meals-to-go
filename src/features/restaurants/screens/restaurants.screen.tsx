import { memo, useState } from "react";
import { FlatList, View } from "react-native";
import { Searchbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

import RestaurantInfoCard from "@/features/restaurants/components/restaurant-info-card.component";
import { colors } from "@/infra/colors";
import { space } from "@/infra/spacing";

const MOCK_RESTAURANTS = Array.from({ length: 15 }, (_, i) => ({
  id: String(i + 1),
  name: `Restaurant ${i + 1}`,
  address: `${(i + 1) * 10} Mock Street`,
  rating: (i % 5) + 1,
  isOpenNow: i % 3 !== 0,
  isClosedTemporarily: i % 7 === 0
}));

const SafeAreaContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: ${colors.bg.primary};
`;

const SearchBarContainer = styled(View)`
  padding: ${space[3]};
`;

const ListContainer = styled(View)`
  flex: 1;
  background-color: ${colors.bg.primary};
  padding: ${space[3]};
`;

function RestaurantsScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SafeAreaContainer>
      <SearchBarContainer>
        <Searchbar
          placeholder="Search restaurants"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </SearchBarContainer>
      <ListContainer>
        <FlatList
          data={MOCK_RESTAURANTS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <RestaurantInfoCard
              name={item.name}
              address={item.address}
              rating={item.rating}
              isOpenNow={item.isOpenNow}
              isClosedTemporarily={item.isClosedTemporarily}
            />
          )}
        />
      </ListContainer>
    </SafeAreaContainer>
  );
}

export default memo(RestaurantsScreen);
