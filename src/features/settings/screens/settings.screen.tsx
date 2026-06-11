import { Text, View } from "react-native";

import { SafeArea } from "@/components/safe-area.component";

export default function SettingsScreen() {
  return (
    <SafeArea>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Settings</Text>
      </View>
    </SafeArea>
  );
}
