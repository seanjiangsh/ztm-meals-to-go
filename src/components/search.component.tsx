import React, { memo, useContext, useState } from "react";
import styled from "styled-components/native";
import { Searchbar } from "react-native-paper";

import { LocationContext } from "@/services/restaurants/location/location.context";

const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

function Search() {
  const { keyword, search } = useContext(LocationContext);
  const [searchKeyword, setSearchKeyword] = useState(keyword);

  return (
    <SearchContainer>
      <Searchbar
        placeholder="Search for a location"
        value={searchKeyword}
        onSubmitEditing={() => {
          search(searchKeyword);
        }}
        onChangeText={(text) => {
          setSearchKeyword(text);
        }}
      />
    </SearchContainer>
  );
}

export default memo(Search);
