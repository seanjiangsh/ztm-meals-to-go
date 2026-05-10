import { memo } from "react";
import { View } from "react-native";
import { Searchbar } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

import RestaurantInfoCard from "../components/restaurant-info-card.component";

const SafeAreaContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: #fff;
`;

const SearchBarContainer = styled(View)`
  padding: 16px;
`;

const ListContainer = styled(View)`
  flex: 1;
  background-color: #fff;
  padding: 16px;
`;

function RestaurantsScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaContainer>
        <SearchBarContainer>
          <Searchbar placeholder="Search restaurants" value="" />
        </SearchBarContainer>
        <ListContainer>
          <RestaurantInfoCard />
        </ListContainer>
      </SafeAreaContainer>
    </SafeAreaProvider>
  );
}

export default memo(RestaurantsScreen);
