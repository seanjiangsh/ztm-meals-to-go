import { memo, useState } from "react";
import { View } from "react-native";
import { Searchbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

import { colors } from "../../../infra/colors";
import { space } from "../../../infra/spacing";
import RestaurantInfoCard from "../components/restaurant-info-card.component";

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
        <RestaurantInfoCard />
      </ListContainer>
    </SafeAreaContainer>
  );
}

export default memo(RestaurantsScreen);
