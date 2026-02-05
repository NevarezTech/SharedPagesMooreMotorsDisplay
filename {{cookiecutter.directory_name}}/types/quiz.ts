// Quiz API Types - Shared across all brand displays

export type ServiceType = "Residential" | "Commercial";
export type LandSize = string; // Allow any custom land size value
export type Brand = "exmark" | "wright" | "bobcat";

export interface QuizAnswers {
  service_type: ServiceType;
  land_size: LandSize;
  brand: Brand;
}

export interface QuizRecommendation {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  quantity: number;
  show_public_quantity: boolean;
  condition: string;
  description: string;
  image_url: string;
  is_available: boolean;
  hours_per_acre?: number;
  type?: string;
  usage?: string;
  land_size?: string;
  fuel_type?: string;
  cutting_width?: string;
  engine_size?: string;
  features?: string;
  weight?: string;
  deck_material?: string;
  transmission?: string;
  turning_radius?: string;
  warranty?: string;
}

export interface QuizResponse {
  success: boolean;
  message: string;
  answers: QuizAnswers;
  recommendations: QuizRecommendation[];
  total_matches: number;
}

export interface QuizError {
  success: false;
  error: string;
  message: string;
}

// Brand configuration for theming
// Uses CSS custom properties for dynamic styling
export interface BrandConfig {
  name: string;
  brand: Brand;
  // CSS color values (hex, rgb, etc.)
  primaryColor: string; // e.g., "#22c55e" for green-500
  primaryColorDark: string; // e.g., "#16a34a" for green-600
  primaryColorLight: string; // e.g., "#f0fdf4" for green-50
  accentColor: string; // e.g., "#86efac" for green-300
}
