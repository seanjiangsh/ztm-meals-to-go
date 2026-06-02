import { memo } from "react";
import { Image, View } from "react-native";
import { Card } from "react-native-paper";
import IsOpen from "@/assets/is-open.svg";
import RatingStar from "@/assets/rating-star.svg";
import styled from "styled-components/native";

import { colors } from "@/infra/colors";
import { space } from "@/infra/spacing";
import { Text } from "./typography/text.component";
import { Spacer } from "./spacer.component";

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

const InfoRow = styled(View)`
  align-items: center;
  flex-direction: row;
`;

const RatingContainer = styled(View)`
  flex-direction: row;
`;

const StatusContainer = styled(View)`
  align-items: center;
  flex-direction: row;
  margin-left: auto;
`;

const CardContent = styled(Card.Content)`
  padding-top: ${space[3]};
  padding-bottom: ${space[3]};
`;

const NameText = styled(Text)`
  font-size: ${({ theme }) => theme.fontSizes.title};
  font-weight: 700;
`;

const IconImage = styled(Image)`
  border-radius: 12px;
  height: 20px;
  margin-left: auto;
  width: 20px;
`;

const AddressText = styled(Text)`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.button};
`;

const ClosedTemporarilyText = styled(Text).attrs({ variant: "caption" })`
  color: ${({ theme }) => theme.colors.text.error};
  font-family: ${({ theme }) => theme.fonts.heading};
  margin-right: 12px;
`;

const OpenNowText = styled(Text).attrs({ variant: "caption" })`
  color: ${({ theme }) => theme.colors.text.success};
  font-family: ${({ theme }) => theme.fonts.heading};
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

        <InfoRow>
          <RatingContainer>
            {ratingArray.map((_, index) => (
              <RatingStar key={`${name}-star-${index}`} width={20} height={20} />
            ))}
          </RatingContainer>
          <StatusContainer>
            {isClosedTemporarily ? (
              <ClosedTemporarilyText>CLOSED TEMPORARILY</ClosedTemporarilyText>
            ) : null}
            <Spacer position="left" size="large" />
            {isOpenNow ? <OpenNowText>OPEN NOW</OpenNowText> : null}
            <Spacer position="left" size="large" />
            {icon ? <IconImage source={{ uri: icon }} /> : null}
            {isOpenNow ? <IsOpen width={20} height={20} /> : null}
          </StatusContainer>
        </InfoRow>
        <AddressText numberOfLines={2}>{address}</AddressText>
      </CardContent>
    </CardContainer>
  );
}

export default memo(RestaurantInfoCard);
