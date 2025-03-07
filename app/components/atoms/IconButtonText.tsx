import { IconButton } from "@chakra-ui/react";
import { ResponsiveValue } from "@chakra-ui/system";

export interface IIconButtonText {
  key?: number;
  onClick?: () => void;
  ariaLabel: string;
  label: string;
  variant: "solid" | "subtle" | "surface" | "outline" | "ghost" | "plain";
  color?: string;
  hover?: string;
  width?: ResponsiveValue<string>;
  paddingLeft?: ResponsiveValue<string>;
  justifyContent?: ResponsiveValue<string>;
}

export const IconButtonText = ({
  key,
  onClick,
  ariaLabel,
  label,
  color,
  hover,
  justifyContent,
  paddingLeft,
  variant,
  width,
}: IIconButtonText) => {
  return (
    <IconButton
      key={key}
      onClick={onClick}
      aria-label={ariaLabel}
      variant={variant}
      color={color}
      _hover={hover ? { bg: hover } : undefined}
      w={width}
      pl={paddingLeft}
      justifyContent={justifyContent}
    >
      {label}
    </IconButton>
  );
};
