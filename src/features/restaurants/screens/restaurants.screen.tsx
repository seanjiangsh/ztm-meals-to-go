import { memo, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { Searchbar } from "react-native-paper";
import styled from "styled-components/native";

import { SafeArea } from "@/components/safe-area.component";
import Search from "@/components/search.component";
import RestaurantInfoCard from "@/features/restaurants/components/restaurant-info-card.component";
import { Spacer } from "@/features/restaurants/components/spacer.component";
import { colors } from "@/infra/colors";
import { space } from "@/infra/spacing";
import { useRestaurants } from "@/services/restaurants/restaurants.context";
import type { Restaurant } from "@/services/restaurants/restaurants.types";

const LoadingContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

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
  const { restaurants, isLoading } = useRestaurants();

  return (
    <SafeArea>
      <Search />
      {isLoading ? (
        <LoadingContainer>
          <ActivityIndicator size="large" animating color={colors.brand.primary} />
        </LoadingContainer>
      ) : (
        <RestaurantList
          data={restaurants}
          keyExtractor={(item) => (item as Restaurant).placeId}
          renderItem={({ item }) => {
            const r = item as Restaurant;
            return (
              <Spacer position="bottom" size="large">
                <RestaurantInfoCard
                  name={r.name}
                  icon={r.icon}
                  photos={r.photos}
                  address={r.address}
                  isOpenNow={r.isOpenNow}
                  rating={r.rating}
                  isClosedTemporarily={r.isClosedTemporarily}
                />
              </Spacer>
            );
          }}
        />
      )}
    </SafeArea>
  );
}

export default memo(RestaurantsScreen);
