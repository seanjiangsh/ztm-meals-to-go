import { memo, useState } from "react";
import { FlatList, View } from "react-native";
import { Searchbar } from "react-native-paper";
import styled from "styled-components/native";

import { SafeArea } from "@/components/safe-area.component";
import RestaurantInfoCard from "@/features/restaurants/components/restaurant-info-card.component";
import { Spacer } from "@/features/restaurants/components/spacer.component";
import { colors } from "@/infra/colors";
import { space } from "@/infra/spacing";

const MOCK_RESTAURANTS = Array.from({ length: 15 }, (_, i) => ({ name: i + 1 }));

const SearchBarContainer = styled(View)`
  padding: ${space[3]};
`;

const RestaurantList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16
  }
})``;

function RestaurantsScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SafeArea>
      <SearchBarContainer>
        <Searchbar
          placeholder="Search restaurants"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={{ backgroundColor: colors.bg.secondary }}
          inputStyle={{ color: colors.text.primary }}
          placeholderTextColor={colors.text.secondary}
          iconColor={colors.text.secondary}
        />
      </SearchBarContainer>
      <RestaurantList
        data={MOCK_RESTAURANTS}
        keyExtractor={(item) => String((item as { name: number }).name)}
        renderItem={() => (
          <Spacer position="bottom" size="large">
            <RestaurantInfoCard />
          </Spacer>
        )}
      />
    </SafeArea>
  );
}

export default memo(RestaurantsScreen);
