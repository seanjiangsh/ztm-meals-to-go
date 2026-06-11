import { Text, View } from "react-native";

import { SafeArea } from "@/components/safe-area.component";

export default function MapScreen() {
  return (
    <SafeArea>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Map</Text>
      </View>
    </SafeArea>
  );
}
