import { memo } from "react";
import { StyleSheet, View, Text } from "react-native";

interface RestaurantInfoProps {
  name: string;
  icon: string;
  photos: Array<string>;
  address: string;
  isOpenNow: boolean;
  rating: number;
  isClosedTemporarily: boolean;
}

function RestaurantInfo(props: RestaurantInfoProps) {
  const {
    name = "Unknown Restaurant",
    icon,
    photos = [
      "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg"
    ],
    address = "100 some random street",
    isOpenNow = true,
    rating = 4,
    isClosedTemporarily = false
  } = props;

  return (
    <View>
      <Text>Restaurant Info</Text>
    </View>
  );
}

export default memo(RestaurantInfo);
