import { ReactNode } from "react";

type PeepPartKeys = "accessories" | "faces" | "heads" | "facialHair";

export type PeepParts = {
  [K in PeepPartKeys]?: string[];
};

export type Peep = {
  [K in PeepPartKeys]?: string;
};

export type Colors = {
  background?: string;
  skinColor?: string;
  hairColor?: string;
};

export type Enables = {
  enableAccessories: boolean;
  enableFacialHair: boolean;
  enableColors: boolean;
  enableBackground: boolean;
};

export type CarouselProps = {
  label: string;
  items: string[];
  onChange: (value: string | undefined) => void;
};

export type EnablesProps = {
  values: Enables;
  colors: Colors;
  onChange: (name: string, checked: boolean) => void;
  onColorChange: (name: string, value: string | undefined) => void;
};

export type ButtonProps = {
  onClick?: () => void;
  children?: ReactNode;
  styles?: string;
};
