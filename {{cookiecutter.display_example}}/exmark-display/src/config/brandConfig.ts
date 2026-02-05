import type { BrandConfig } from "@shared/types/quiz";

export const exmarkBrandConfig: BrandConfig = {
  name: "Exmark",
  brand: "exmark",
  primaryColor: "#16a34a", // green-600
  primaryColorDark: "#15803d", // green-700
  primaryColorLight: "#f0fdf4", // green-50
  accentColor: "#22c55e", // green-500
};

// Tailwind class mappings for Exmark brand
export const exmarkClasses = {
  text: {
    primary: "text-green-600",
    primaryHover: "hover:text-green-700",
    accent: "text-green-500",
  },
  bg: {
    primary: "bg-green-600",
    primaryHover: "hover:bg-green-700",
    light: "bg-green-50",
    lightHover: "hover:bg-green-50",
  },
  border: {
    primary: "border-green-500",
    accent: "border-green-300",
    hover: "hover:border-green-300",
    focus: "focus:border-green-500",
  },
  gradient: "from-green-50 to-blue-50",
};
