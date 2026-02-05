// Kiosk Types - Shared across all brand displays

export interface KioskBrandConfig {
  name: string;
  logoPath?: string;
  title: string;
  websiteUrl: string;
  primaryColor: string; // e.g., "blue", "orange", "red"
  primaryColorShade: string; // e.g., "600", "700"
  accentColor: string; // e.g., "indigo", "blue"
  gradientFrom: string; // e.g., "blue-50"
  gradientTo: string; // e.g., "indigo-100"
}
