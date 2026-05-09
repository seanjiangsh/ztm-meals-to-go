import { memo } from "react";
import { Image, Text, View } from "react-native";
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

const CardContent = styled(Card.Content)`
  padding-top: 14px;
  padding-bottom: 16px;
`;

const NameText = styled(Text)`
  color: #1e1e1e;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
`;

const Icon = styled(Image)`
  border-radius: 12px;
  height: 20px;
  margin-left: auto;
  width: 20px;
`;

const AddressText = styled(Text)`
  color: #5b5b5b;
  font-size: 14px;
`;

const StarText = styled(Text)`
  color: #d4a017;
  font-size: 14px;
  margin-right: 2px;
`;

const ClosedTemporarilyText = styled(Text)`
  color: #c1121f;
  font-size: 12px;
  font-weight: 700;
  margin-right: 12px;
`;

const OpenNowText = styled(Text)`
  color: #2d6a4f;
  font-size: 12px;
  font-weight: 700;
  margin-right: 12px;
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
      <CardContent>
        <NameText numberOfLines={1}>
          {name}
        </NameText>

        <RatingRow>
          {ratingArray.map((_, index) => (
            <StarText key={`${name}-star-${index}`}>
              ★
            </StarText>
          ))}
        </RatingRow>

        <DetailsRow>
          {isClosedTemporarily ? (
            <ClosedTemporarilyText>CLOSED TEMPORARILY</ClosedTemporarilyText>
          ) : null}

          {isOpenNow ? <OpenNowText>OPEN NOW</OpenNowText> : null}

          {icon ? <Icon source={{ uri: icon }} /> : null}
        </DetailsRow>

        <AddressText numberOfLines={2}>
          {address}
        </AddressText>
      </CardContent>
    </StyledCard>
  );
}

export default memo(RestaurantInfoCard);
