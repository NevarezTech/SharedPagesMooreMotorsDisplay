// Warranty API Service - for Wright and Exmark displays

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

export interface WarrantyLookupResponse {
  success: boolean;
  data: {
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
  };
}

export interface WarrantyErrorResponse {
  error: string;
}

/**
 * Look up warranty information by transaction ID
 * Public endpoint - no authentication required
 */
export const lookupWarrantyByTransaction = async (
  transactionId: string
): Promise<WarrantyLookupResponse> => {
  const response = await fetch(
    `${API_BASE_URL}/v1/warranty/transaction/${transactionId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorData: WarrantyErrorResponse = await response.json();
    throw new Error(errorData.error || "Failed to lookup warranty");
  }

  return response.json();
};

/**
 * Look up warranty information by serial number
 * Public endpoint - no authentication required
 */
export const lookupWarrantyBySerialNumber = async (
  serialNumber: string
): Promise<{ success: boolean; warranty: any }> => {
  const response = await fetch(
    `${API_BASE_URL}/v1/warranty/lookup?serial_number=${encodeURIComponent(
      serialNumber
    )}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorData: WarrantyErrorResponse = await response.json();
    throw new Error(errorData.error || "Failed to lookup warranty");
  }

  return response.json();
};
