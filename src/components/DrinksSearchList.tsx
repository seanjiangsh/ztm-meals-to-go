import { memo, useMemo, useState } from "react";
import { Text, View } from "react-native";
import { Searchbar } from "react-native-paper";
import styled from "styled-components/native";

const SearchHeaderContainer = styled(View)`
  width: 100%;
  background-color: #8f8f8f;
  padding-horizontal: 20px;
  padding-vertical: 8px;
  justify-content: center;
`;

const ContentContainer = styled(View)`
  flex: 1;
  width: 100%;
  padding-horizontal: 20px;
  background-color: #e0e0e0;
`;

const ListItem = styled(View)`
  flex-direction: row;
  align-items: center;
  padding-vertical: 8px;
`;

const ListBullet = styled(Text)`
  font-size: 18px;
  margin-right: 8px;
`;

const ListItemText = styled(Text)`
  font-size: 16px;
`;

const EmptyStateText = styled(Text)`
  margin-top: 16px;
  font-size: 16px;
  color: #4f4f4f;
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
