import * as React from "react";
import { CreditCard, CheckCircle } from "lucide-react";
import type { PaymentMethod } from "../types/payment";
import { PAYMENT_METHODS } from "../types/payment";

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethod | null;
  onMethodSelect: (method: PaymentMethod) => void;
  accentColor?: string;
  accentColorLight?: string;
  compact?: boolean;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  selectedMethod,
  onMethodSelect,
  accentColor = "blue",
  accentColorLight = "from-blue-100 to-blue-200",
}) => {
  // Auto-select credit card since it's the only option
  React.useEffect(() => {
    if (!selectedMethod && PAYMENT_METHODS.length === 1) {
      onMethodSelect(PAYMENT_METHODS[0].method);
    }
  }, [selectedMethod, onMethodSelect]);

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Payment Method</h3>

      <div
        className={`p-4 rounded-xl bg-gradient-to-br ${accentColorLight} border-${accentColor}-300 text-${accentColor}-800 border-2`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-2 rounded-lg bg-white shadow-sm">
              <CreditCard size={24} className={`text-${accentColor}-600`} />
            </div>

            <div className="flex-1">
              <h4 className="font-semibold text-gray-800">
                Credit Card Payment
              </h4>
              <p className="text-sm mt-1 text-gray-600">
                Pay securely online with your credit or debit card
              </p>
            </div>
          </div>

          <CheckCircle size={20} className={`text-${accentColor}-600 ml-4`} />
        </div>
      </div>

      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
        <div className="flex items-center space-x-2">
          <CheckCircle size={16} className="text-green-600" />
          <div className="text-sm text-green-800">
            <p className="font-medium">Secure Online Payment</p>
            <p className="mt-1">
              A processing fee will be added to your total. You'll be redirected
              to our secure payment processor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodSelector;
