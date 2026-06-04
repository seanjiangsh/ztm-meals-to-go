import { Image, View } from "react-native";
import { Card } from "react-native-paper";
import styled from "styled-components/native";

import { colors } from "@/infra/colors";
import { space } from "@/infra/spacing";
import { Text } from "./typography/text.component";

export const CardContainer = styled(Card)`
  background-color: ${colors.bg.primary};
  border-radius: ${space[3]};
  margin-bottom: ${space[3]};
  overflow: hidden;
`;

export const CardCoverImage = styled(Card.Cover)`
  background-color: ${colors.ui.disabled};
  border-top-left-radius: ${space[3]};
  border-top-right-radius: ${space[3]};
  height: 180px;
`;

export const InfoRow = styled(View)`
  align-items: center;
  flex-direction: row;
`;

export const RatingContainer = styled(View)`
  flex-direction: row;
`;

export const StatusContainer = styled(View)`
  align-items: center;
  flex-direction: row;
  margin-left: auto;
`;

export const CardContent = styled(Card.Content)`
  padding-top: ${space[3]};
  padding-bottom: ${space[3]};
`;

export const NameText = styled(Text)`
  font-size: ${({ theme }) => theme.fontSizes.title};
  font-weight: 700;
`;

export const IconImage = styled(Image)`
  border-radius: 12px;
  height: 20px;
  margin-left: auto;
  width: 20px;
`;

export const AddressText = styled(Text)`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.button};
`;

export const ClosedTemporarilyText = styled(Text).attrs({ variant: "caption" })`
  color: ${({ theme }) => theme.colors.text.error};
  font-family: ${({ theme }) => theme.fonts.heading};
  margin-right: 12px;
`;

export const OpenNowText = styled(Text).attrs({ variant: "caption" })`
  color: ${({ theme }) => theme.colors.text.success};
  font-family: ${({ theme }) => theme.fonts.heading};
  margin-right: 12px;
`;
