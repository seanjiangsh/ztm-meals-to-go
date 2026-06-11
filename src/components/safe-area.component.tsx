import type { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

import { colors } from "@/infra/colors";

const SafeAreaContainer = styled(SafeAreaView).attrs({ edges: ["top"] })`
  flex: 1;
  background-color: ${colors.bg.primary};
`;

export function SafeArea({ children }: { children: ReactNode }) {
  return <SafeAreaContainer>{children}</SafeAreaContainer>;
}
