import type {
  PaymentLinkRequest,
  PaymentLinkResponse,
  PaymentPreviewResponse,
} from "../types/payment";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export const paymentApi = {
  /**
   * Create a payment link for equipment purchase
   */
  async createPaymentLink(
    request: PaymentLinkRequest,
  ): Promise<PaymentLinkResponse> {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/equipment/payment/create-link`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error || `HTTP error! status: ${response.status}`,
      );
    }

    return await response.json();
  },

  /**
   * Get payment preview/calculation for equipment without creating a payment link
   */
  async getPaymentPreview(
    equipmentId: number,
    quantity: number = 1,
    paymentMethod?: string,
  ): Promise<PaymentPreviewResponse> {
    const queryParams = new URLSearchParams({ quantity: quantity.toString() });
    if (paymentMethod) {
      queryParams.append("payment_method", paymentMethod);
    }

    const response = await fetch(
      `${API_BASE_URL}/api/v1/equipment/item/${equipmentId}/payment-preview?${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error || `HTTP error! status: ${response.status}`,
      );
    }

    return await response.json();
  },

  /**
   * Format currency amount for display
   */
  formatCurrency(amount: number, currency: string = "USD"): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
    }).format(amount);
  },

  /**
   * Format percentage for display
   */
  formatPercentage(rate: number): string {
    return new Intl.NumberFormat("en-US", {
      style: "percent",
      minimumFractionDigits: 1,
      maximumFractionDigits: 2,
    }).format(rate);
  },
};
