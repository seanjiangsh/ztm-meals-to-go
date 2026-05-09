import { memo } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-paper";
import styled from "styled-components/native";

const StyledCard = styled(Card)`
  background-color: #ffffff;
  border-radius: 16px;
  margin-bottom: 16px;
  overflow: hidden;
`;

const StyledCardCover = styled(Card.Cover)`
  background-color: #e3e3e3;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  height: 180px;
`;

const RatingRow = styled(View)`
  flex-direction: row;
  margin-bottom: 8px;
`;

const DetailsRow = styled(View)`
  align-items: center;
  flex-direction: row;
  margin-bottom: 8px;
`;

interface RestaurantInfoProps {
  name?: string;
  icon?: string;
  photos?: Array<string>;
  address?: string;
  isOpenNow?: boolean;
  rating?: number;
  isClosedTemporarily?: boolean;
}

function RestaurantInfoCard(props: RestaurantInfoProps) {
  const {
    name = "Unknown Restaurant",
    icon,
    photos = ["https://remix-recipes.sean-j.dev/images/e0a78337-c3e2-4b9b-8bdb-db63861c21cf.jpeg"],
    address = "100 some random street",
    isOpenNow = true,
    rating = 4,
    isClosedTemporarily = false
  } = props;

  const ratingArray = Array.from({ length: Math.max(0, Math.floor(rating)) });

  return (
    <StyledCard mode="elevated">
      <StyledCardCover source={{ uri: photos[0] }} />
      <Card.Content style={styles.content}>
        <Text numberOfLines={1} style={styles.name}>
          {name}
        </Text>

        <RatingRow>
          {ratingArray.map((_, index) => (
            <Text key={`${name}-star-${index}`} style={styles.star}>
              ★
            </Text>
          ))}
        </RatingRow>

        <DetailsRow>
          {isClosedTemporarily ? (
            <Text style={styles.closedTemporarily}>CLOSED TEMPORARILY</Text>
          ) : null}

          {isOpenNow ? <Text style={styles.openNow}>OPEN NOW</Text> : null}

          {icon ? <Image style={styles.icon} source={{ uri: icon }} /> : null}
        </DetailsRow>

        <Text numberOfLines={2} style={styles.address}>
          {address}
        </Text>
      </Card.Content>
    </StyledCard>
  );
}

export default memo(RestaurantInfoCard);

const styles = StyleSheet.create({
  content: {
    paddingTop: 14,
    paddingBottom: 16
  },
  name: {
    color: "#1e1e1e",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8
  },
  star: {
    color: "#d4a017",
    fontSize: 14,
    marginRight: 2
  },
  closedTemporarily: {
    color: "#c1121f",
    fontSize: 12,
    fontWeight: "700",
    marginRight: 12
  },
  openNow: {
    color: "#2d6a4f",
    fontSize: 12,
    fontWeight: "700",
    marginRight: 12
  },
  icon: {
    borderRadius: 12,
    height: 20,
    marginLeft: "auto",
    width: 20
  },
  address: {
    color: "#5b5b5b",
    fontSize: 14
  }
});
