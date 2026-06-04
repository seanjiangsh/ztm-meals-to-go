import { memo } from "react";
import IsOpen from "@/assets/is-open.svg";
import RatingStar from "@/assets/rating-star.svg";

import { Spacer } from "./spacer.component";
import {
  AddressText,
  CardContainer,
  CardContent,
  CardCoverImage,
  ClosedTemporarilyText,
  IconImage,
  InfoRow,
  NameText,
  OpenNowText,
  RatingContainer,
  StatusContainer
} from "./restaurant-info-card.styles";

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
