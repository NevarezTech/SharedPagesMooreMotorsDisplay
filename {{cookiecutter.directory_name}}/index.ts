// Shared exports for inventory display kiosks
// This allows other projects to import from '@inventory-displays/shared'

// Types
export type {
  ServiceType,
  LandSize,
  Brand,
  QuizAnswers,
  QuizRecommendation,
  QuizResponse,
  QuizError,
  BrandConfig,
} from "./types/quiz";

export type {
  WarrantyInfo,
  SearchType,
  WarrantyLookupPageProps,
  WarrantyBrandConfig,
} from "./types/warranty";

export type { KioskBrandConfig } from "./types/kiosk";

// API
export { fetchQuizRecommendations, validateQuizAnswers } from "./api/quizApi";

// Hooks
export { useQuizLogic } from "./hooks/useQuizLogic";

// Components
export { default as EquipmentModal } from "./components/EquipmentModal";
export { default as EquipmentModalDialog } from "./components/EquipmentModalDialog";
export { default as ProgressBar } from "./components/ProgressBar";
export { default as QuestionCard } from "./components/QuestionCard";
export { default as CustomLandSizeInput } from "./components/CustomLandSizeInput";
export { default as EquipmentCard } from "./components/EquipmentCard";
export { default as LoadingState } from "./components/LoadingState";
export { default as ResultsSummary } from "./components/ResultsSummary";
export { default as WarrantyLookupPage } from "./components/WarrantyLookupPage";
export { default as KioskHome } from "./components/KioskHome";
export { default as PaymentModal } from "./components/PaymentModal";
export { default as PaymentPage } from "./components/PaymentPage";
export { default as PaymentMethodSelector } from "./components/PaymentMethodSelector";
export { default as PaymentSummary } from "./components/PaymentSummary";

// Payment API
export { paymentApi } from "./api/paymentApi";

// Payment Types
export type {
  PaymentCalculation,
  PaymentLinkRequest,
  PaymentLinkResponse,
  PaymentPreviewResponse,
  PaymentMethod,
  PaymentMethodSelection,
} from "./types/payment";
