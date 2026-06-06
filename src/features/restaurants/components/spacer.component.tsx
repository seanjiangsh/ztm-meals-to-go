import { ReactNode } from "react";
import styled from "styled-components/native";
import { DefaultTheme } from "styled-components/native";

type SpacerSize = "small" | "medium" | "large";
type SpacerPosition = "top" | "left" | "right" | "bottom";

interface SpacerProps {
  position?: SpacerPosition;
  size?: SpacerSize;
  theme?: DefaultTheme;
  children?: ReactNode;
}

const sizeVariant: Record<SpacerSize, number> = {
  small: 1,
  medium: 2,
  large: 3
};

const positionVariant: Record<SpacerPosition, string> = {
  top: "marginTop",
  left: "marginLeft",
  right: "marginRight",
  bottom: "marginBottom"
};

const getVariant = (position: SpacerPosition, size: SpacerSize, theme: DefaultTheme) => {
  const sizeIndex = sizeVariant[size];
  const property = positionVariant[position];
  const value = theme.space[sizeIndex];

  return `${property}:${value}`;
};

const SpacerView = styled.View<SpacerProps>`
  ${({ position = "top", size = "small", theme }) => getVariant(position, size, theme!)}
`;

export const Spacer = ({ position = "top", size = "small", children }: SpacerProps) => {
  return (
    <SpacerView position={position} size={size}>
      {children}
    </SpacerView>
  );
};

Spacer.defaultProps = {
  position: "top",
  size: "small"
};
