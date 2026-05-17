import { memo, useMemo, useState } from "react";
import { Text, View } from "react-native";
import { Searchbar } from "react-native-paper";
import styled from "styled-components/native";

import { colors } from "@/infra/colors";
import { fontSizes } from "@/infra/fonts";
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
  color: ${colors.text.primary};
  font-size: ${fontSizes.body};
  margin-right: ${space[2]};
`;

const ListItemText = styled(Text)`
  color: ${colors.text.primary};
  font-size: ${fontSizes.body};
`;

const EmptyStateText = styled(Text)`
  margin-top: ${space[3]};
  font-size: ${fontSizes.body};
  color: ${colors.text.secondary};
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
