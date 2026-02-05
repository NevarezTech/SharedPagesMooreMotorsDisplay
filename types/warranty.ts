// Warranty Types - Shared across all brand displays

export interface WarrantyInfo {
  transaction_id: number;
  purchase_date: string;
  equipment_brand: string;
  equipment_model: string;
  equipment_year: number;
  serial_number: string;
  warranty_start_date?: string;
  warranty_end_date?: string;
  warranty_coverage?: string;
  warranty_period_months?: number;
  is_warranty_active: boolean;
  days_remaining?: number;
  customer_name: string;
}

export type SearchType = "transaction" | "serial";

export interface WarrantyLookupPageProps {
  onBack: () => void;
  brandConfig: WarrantyBrandConfig;
}

// Brand configuration for warranty page theming
export interface WarrantyBrandConfig {
  name: string;
  // Primary colors for main elements
  primaryColor: string; // e.g., "blue" for Wright, "red" for Exmark
  primaryColorShade: string; // e.g., "600" for intensity
  // Accent colors for highlights
  accentColor?: string; // e.g., "silver" or "gray" for Exmark
  // Gradient colors for background
  gradientFrom: string; // e.g., "blue-50"
  gradientTo: string; // e.g., "indigo-100"
}
