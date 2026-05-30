import "styled-components/native";
import { theme } from "@/infra";

type AppTheme = typeof theme;

declare module "styled-components/native" {
  export interface DefaultTheme extends AppTheme {}
}
