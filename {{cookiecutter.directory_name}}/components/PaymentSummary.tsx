import { FC, useState } from "react";
import { Calculator, Info } from "lucide-react";
import type { PaymentCalculation } from "../types/payment";
import { paymentApi } from "../api/paymentApi";

interface PaymentSummaryProps {
  preview: {
    calculation: PaymentCalculation;
    equipment: {
      id: number;
      brand: string;
      model: string;
      year: number;
      price?: number;
    };
  };
  equipment: {
    id: number;
    brand: string;
    model: string;
    year: number;
    price: number;
  };
  compact?: boolean;
  accentColor?: string;
  accentColorLight?: string;
  showDetails?: boolean;
}

const PaymentSummary: FC<PaymentSummaryProps> = ({
  preview,
  equipment,
  compact = false,
  accentColor = "blue",
  accentColorLight = "from-blue-100 to-blue-200",
  showDetails = true,
}) => {
  const [showBreakdown, setShowBreakdown] = useState(false);

  const formatCurrency = (amount: number) => paymentApi.formatCurrency(amount);
  const formatPercentage = (rate: number) => paymentApi.formatPercentage(rate);

  if (compact) {
    return (
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Equipment Price:</span>
          <span className="font-medium">
            {formatCurrency(preview.calculation.subtotal)}
          </span>
        </div>
        {preview.calculation.tax_amount > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">
              Tax ({formatPercentage(preview.calculation.tax_rate)}):
            </span>
            <span className="font-medium">
              {formatCurrency(preview.calculation.tax_amount)}
            </span>
          </div>
        )}
        <div className="border-t pt-2">
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-900">Total:</span>
            <span className="text-lg font-bold text-gray-900">
              {formatCurrency(preview.calculation.total_amount)}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 shadow-lg overflow-hidden">
      {/* Header */}
      <div className={`bg-gradient-to-r ${accentColorLight} px-6 py-4`}>
        <div className="flex items-center space-x-3">
          <Calculator className={`text-${accentColor}-600`} size={24} />
          <div>
            <h3 className="font-bold text-gray-800 text-lg">Payment Summary</h3>
            <p className="text-sm text-gray-600">
              {equipment.brand} {equipment.model} ({equipment.year})
            </p>
          </div>
        </div>
      </div>

      {/* Summary Content */}
      <div className="p-6">
        {/* Equipment Price (Base + Processing Fee) */}
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <div className="flex items-center space-x-1">
            <span className="text-gray-600">Equipment Price:</span>
            {preview.calculation.processing_fee > 0 && (
              <button
                onClick={() => setShowBreakdown(!showBreakdown)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                title="Show price breakdown"
              >
                <Info size={14} />
              </button>
            )}
          </div>
          <span className="font-medium text-gray-800">
            {formatCurrency(preview.calculation.subtotal)}
          </span>
        </div>

        {/* Breakdown details */}
        {showBreakdown &&
          showDetails &&
          preview.calculation.processing_fee > 0 && (
            <div className="bg-gray-50 rounded-lg p-3 my-2 text-sm">
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-500">Base Price:</span>
                <span className="text-gray-700">
                  {formatCurrency(preview.calculation.base_amount)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Processing Fee:</span>
                <span className="text-gray-700">
                  {formatCurrency(preview.calculation.processing_fee)}
                </span>
              </div>
            </div>
          )}

        {/* Tax */}
        {preview.calculation.tax_amount > 0 && (
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600">
              Tax ({formatPercentage(preview.calculation.tax_rate)}):
            </span>
            <span className="font-medium text-gray-800">
              {formatCurrency(preview.calculation.tax_amount)}
            </span>
          </div>
        )}

        {/* Total */}
        <div
          className={`flex justify-between items-center py-4 bg-gradient-to-r ${accentColorLight} rounded-lg px-4 mt-4`}
        >
          <span className="text-lg font-bold text-gray-800">Total Amount:</span>
          <span className={`text-2xl font-bold text-${accentColor}-700`}>
            {formatCurrency(preview.calculation.total_amount)}
          </span>
        </div>

        {/* Additional Info */}
        {showDetails && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start space-x-2">
              <Info className="text-blue-600 mt-0.5" size={16} />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Payment Information:</p>
                <ul className="space-y-1 text-blue-700">
                  <li>• All prices include applicable taxes</li>
                  <li>• Processing fees cover secure payment handling</li>
                  <li>• Prices are valid for 24 hours</li>
                  <li>• Equipment subject to availability</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSummary;
