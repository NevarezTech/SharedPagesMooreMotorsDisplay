// Payment-related types for equipment purchases

export interface PaymentCalculation {
  base_amount: number;
  processing_fee: number;
  subtotal: number;
  tax_amount: number;
  total_amount: number;
  tax_rate: number;
  processing_rate: number;
}

export interface PaymentLinkRequest {
  equipment_id: number;
  customer_email?: string;
  customer_name?: string;
  quantity: number;
  success_url?: string;
  cancel_url?: string;
}

export interface PaymentLinkResponse {
  success: boolean;
  payment_url: string;
  payment_id: string;
  expires_at?: number;
  calculation: PaymentCalculation;
  equipment: {
    id: number;
    brand: string;
    model: string;
    year: number;
  };
  error?: string;
}

export interface PaymentPreviewResponse {
  success: boolean;
  calculation: PaymentCalculation;
  equipment: {
    id: number;
    brand: string;
    model: string;
    year: number;
    price: number;
  };
  quantity: number;
  error?: string;
}

export type PaymentMethod = "credit_card";

export interface PaymentMethodSelection {
  method: PaymentMethod;
  label: string;
  description: string;
  icon: string;
  available: boolean;
}

export const PAYMENT_METHODS: PaymentMethodSelection[] = [
  {
    method: "credit_card",
    label: "Credit Card",
    description: "Pay securely online with your credit or debit card",
    icon: "CreditCard",
    available: true,
  },
];
