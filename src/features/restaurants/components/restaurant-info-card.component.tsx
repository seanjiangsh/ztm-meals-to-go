import { memo } from "react";
import { Image, Text, View } from "react-native";
import { Card } from "react-native-paper";
import styled from "styled-components/native";

import { colors } from "@/infra/colors";
import { fontSizes } from "@/infra/fonts";
import { space } from "@/infra/spacing";

const CardContainer = styled(Card)`
  background-color: ${colors.bg.primary};
  border-radius: ${space[3]};
  margin-bottom: ${space[3]};
  overflow: hidden;
`;

const CardCoverImage = styled(Card.Cover)`
  background-color: ${colors.ui.disabled};
  border-top-left-radius: ${space[3]};
  border-top-right-radius: ${space[3]};
  height: 180px;
`;

const RatingRow = styled(View)`
  flex-direction: row;
  margin-bottom: ${space[2]};
`;

const DetailsRow = styled(View)`
  align-items: center;
  flex-direction: row;
  margin-bottom: ${space[2]};
`;

const CardContent = styled(Card.Content)`
  padding-top: ${space[3]};
  padding-bottom: ${space[3]};
`;

const NameText = styled(Text)`
  color: ${colors.text.primary};
  font-size: ${fontSizes.title};
  font-weight: 700;
  margin-bottom: ${space[2]};
`;

const IconImage = styled(Image)`
  border-radius: 12px;
  height: 20px;
  margin-left: auto;
  width: 20px;
`;

const AddressText = styled(Text)`
  color: ${colors.text.secondary};
  font-size: ${fontSizes.button};
`;

const StarText = styled(Text)`
  color: #d4a017;
  font-size: ${fontSizes.button};
  margin-right: 2px;
`;

const ClosedTemporarilyText = styled(Text)`
  color: ${colors.text.error};
  font-size: ${fontSizes.caption};
  font-weight: 700;
  margin-right: 12px;
`;

const OpenNowText = styled(Text)`
  color: ${colors.text.success};
  font-size: ${fontSizes.caption};
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
    <CardContainer mode="elevated">
      <CardCoverImage source={{ uri: photos[0] }} />
      <CardContent>
        <NameText numberOfLines={1}>{name}</NameText>

        <RatingRow>
          {ratingArray.map((_, index) => (
            <StarText key={`${name}-star-${index}`}>★</StarText>
          ))}
        </RatingRow>

        <DetailsRow>
          {isClosedTemporarily ? (
            <ClosedTemporarilyText>CLOSED TEMPORARILY</ClosedTemporarilyText>
          ) : null}

          {isOpenNow ? <OpenNowText>OPEN NOW</OpenNowText> : null}

          {icon ? <IconImage source={{ uri: icon }} /> : null}
        </DetailsRow>

        <AddressText numberOfLines={2}>{address}</AddressText>
      </CardContent>
    </CardContainer>
  );
}

export default memo(RestaurantInfoCard);
