import { createSystem, defaultConfig } from "@chakra-ui/react";
import { defineStyle } from "@chakra-ui/system";

export const system = createSystem(defaultConfig, {
  globalCss: {
    body: {
      bg: "gray.900",
      color: "white",
      margin: 0,
      padding: 0,
    },
  },

  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#e6f2ff" },
          100: { value: "#bfdeff" },
          200: { value: "#99caff" },
          300: { value: "#66b7ff" },
          400: { value: "#33a3ff" },
          500: { value: "#FF6B00" },
          600: { value: "#cc5500" },
          700: { value: "#993f00" },
          800: { value: "#662a00" },
          900: { value: "#331500" },
          950: { value: "#1a0a00" },
        },
        gray: {
          50: { value: "#fafafa" },
          100: { value: "#f4f4f5" },
          200: { value: "#e4e4e7" },
          300: { value: "#d4d4d8" },
          400: { value: "#a1a1aa" },
          500: { value: "#71717a" },
          600: { value: "#52525b" },
          700: { value: "#3f3f46" },
          800: { value: "#27272a" },
          900: { value: "#18181b" },
          950: { value: "#09090b" },
        },
      },
      fonts: {
        heading: { value: "'Poppins', sans-serif" },
        body: { value: "'Poppins', sans-serif" },
      },
    },
    semanticTokens: {
      colors: {
        brand: {
          solid: { value: "{colors.brand.500}" },
          contrast: { value: "{colors.brand.100}" },
          fg: { value: "{colors.brand.700}" },
          muted: { value: "{colors.brand.200}" },
          subtle: { value: "{colors.brand.300}" },
          emphasized: { value: "{colors.brand.400}" },
          focusRing: { value: "{colors.brand.500}" },
        },
      },
    },
    recipes: {
      button: {
        base: defineStyle({
          borderRadius: "md",
          _hover: { bg: "brand.600" },
          colorPalette: "brand",
          px: "4",
          py: "2",
          fontWeight: "semibold",
        }),
      },
    },
  },
});
