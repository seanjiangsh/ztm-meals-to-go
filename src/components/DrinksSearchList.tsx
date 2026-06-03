import { memo, useMemo, useState } from "react";
import { View } from "react-native";
import { Searchbar } from "react-native-paper";
import styled from "styled-components/native";

import { Text } from "@/features/restaurants/components/typography/text.component";
import { colors } from "@/infra/colors";
import { space } from "@/infra/spacing";

const SearchHeaderContainer = styled(View)`
  width: 100%;
  background-color: ${colors.ui.secondary};
  padding-horizontal: ${space[3]};
  padding-vertical: ${space[2]};
  justify-content: center;
`;

const ContentContainer = styled(View)`
  flex: 1;
  width: 100%;
  padding-horizontal: ${space[3]};
  background-color: ${colors.ui.disabled};
`;

const ListItem = styled(View)`
  flex-direction: row;
  align-items: center;
  padding-vertical: ${space[2]};
`;

const ListBullet = styled(Text)`
  margin-right: ${space[2]};
`;

const ListItemText = styled(Text)``;

const EmptyStateText = styled(Text).attrs({ variant: "hint" })`
  margin-top: ${space[3]};
`;

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
      <SearchHeaderContainer>
        <Searchbar placeholder="Search drinks" value={searchQuery} onChangeText={setSearchQuery} />
      </SearchHeaderContainer>

      <ContentContainer>
        {filteredDrinks.map((drink) => (
          <ListItem key={drink}>
            <ListBullet>{"\u2022"}</ListBullet>
            <ListItemText>{drink}</ListItemText>
          </ListItem>
        ))}

        {filteredDrinks.length === 0 ? <EmptyStateText>No drinks found.</EmptyStateText> : null}
      </ContentContainer>
    </>
  );
}

export default memo(DrinksSearchList);
