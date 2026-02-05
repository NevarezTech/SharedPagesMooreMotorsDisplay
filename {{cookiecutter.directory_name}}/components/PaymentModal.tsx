import { FC, FormEvent } from "react";
import { useState, useEffect } from "react";
import {
  X,
  ArrowLeft,
  Loader2,
  CreditCard,
  MapPin,
  Phone,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import type { QuizRecommendation } from "../types/quiz";
import type { PaymentMethod, PaymentPreviewResponse } from "../types/payment";
import { paymentApi } from "../api/paymentApi";
import PaymentMethodSelector from "./PaymentMethodSelector";

interface PaymentModalProps {
  equipment: QuizRecommendation | null;
  isOpen: boolean;
  onClose: () => void;
  accentColor?: string;
  accentColorLight?: string;
  accentColorDark?: string;
}

type PaymentStep =
  | "method_selection"
  | "customer_info"
  | "payment_processing"
  | "confirmation";

interface CustomerInfo {
  name: string;
  email: string;
}

const PaymentModal: FC<PaymentModalProps> = ({
  equipment,
  isOpen,
  onClose,
  accentColor = "blue",
  accentColorLight = "from-blue-100 to-blue-200",
  accentColorDark = "text-blue-600",
}) => {
  const [currentStep, setCurrentStep] =
    useState<PaymentStep>("method_selection");
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(
    null,
  );
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: "",
    email: "",
  });
  const [paymentPreview, setPaymentPreview] =
    useState<PaymentPreviewResponse | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen && equipment) {
      setCurrentStep("method_selection");
      setSelectedMethod(null);
      setCustomerInfo({ name: "", email: "" });
      setQuantity(1);
      setError(null);
      loadPaymentPreview();
    }
  }, [isOpen, equipment]);

  const loadPaymentPreview = async (paymentMethod?: string) => {
    if (!equipment) return;

    setIsLoading(true);
    setError(null);

    try {
      // Get base pricing without processing fees
      const preview = await paymentApi.getPaymentPreview(
        equipment.id,
        quantity,
      );

      // Calculate processing fees client-side based on payment method
      if (paymentMethod === "credit_card") {
        const processingRate = 0.029; // 2.9% processing fee
        const baseAmount = equipment.price * quantity;
        const processingFee = baseAmount * processingRate;
        const subtotal = baseAmount + processingFee;
        const taxAmount = subtotal * preview.calculation.tax_rate;
        const totalAmount = subtotal + taxAmount;

        // Override calculation with processing fee included
        preview.calculation = {
          ...preview.calculation,
          processing_fee: processingFee,
          subtotal: subtotal,
          tax_amount: taxAmount,
          total_amount: totalAmount,
          processing_rate: processingRate,
        };
      }

      setPaymentPreview(preview);
    } catch (err) {
      setError("Failed to load pricing information. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
    loadPaymentPreview(selectedMethod || undefined);
  };

  const handleMethodSelect = (method: PaymentMethod) => {
    setSelectedMethod(method);

    // Recalculate pricing based on payment method
    loadPaymentPreview(method);

    // For credit card, stay on method_selection to show updated pricing
  };

  const handleCustomerInfoSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedMethod || !equipment || !paymentPreview) return;

    setIsLoading(true);
    setError(null);

    try {
      const paymentLink = await paymentApi.createPaymentLink({
        equipment_id: equipment.id,
        customer_email: customerInfo.email,
        customer_name: customerInfo.name,
        quantity,
        success_url: window.location.origin + "/payment-success",
        cancel_url: window.location.origin + "/payment-cancelled",
      });

      if (paymentLink.payment_url) {
        window.location.href = paymentLink.payment_url;
      }
    } catch (err) {
      setError("Failed to create payment link. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    switch (currentStep) {
      case "customer_info":
        setCurrentStep("method_selection");
        break;
      case "confirmation":
        setCurrentStep("method_selection");
        break;
      default:
        setCurrentStep("method_selection");
    }
  };

  const handleClose = () => {
    setCurrentStep("method_selection");
    setSelectedMethod(null);
    setCustomerInfo({ name: "", email: "" });
    setError(null);
    onClose();
  };

  if (!isOpen || !equipment) return null;

  const getStepTitle = () => {
    switch (currentStep) {
      case "method_selection":
        return "Choose Payment Method";
      case "customer_info":
        return "Your Information";
      case "payment_processing":
        return "Processing Payment";
      case "confirmation":
        return "Payment Link Created";
      default:
        return "Purchase Equipment";
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black bg-opacity-50 backdrop-blur-sm overflow-hidden">
      <div className="h-full flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
          {/* Compact Header */}
          <div
            className={`bg-gradient-to-r ${accentColorLight} px-4 py-3 flex items-center justify-between border-b`}
          >
            <div className="flex items-center space-x-3">
              {currentStep !== "method_selection" && (
                <button
                  onClick={handleBack}
                  className="p-1 rounded-full hover:bg-white hover:bg-opacity-30 transition-colors"
                >
                  <ArrowLeft size={18} />
                </button>
              )}
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {getStepTitle()}
                </h2>
                <p className="text-xs text-gray-600">
                  {equipment.brand} {equipment.model} ({equipment.year})
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-1 rounded-full hover:bg-white hover:bg-opacity-30 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-4">
              {/* Error Display */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
                  <AlertCircle
                    size={16}
                    className="text-red-600 flex-shrink-0"
                  />
                  <span className="text-red-800 text-sm">{error}</span>
                </div>
              )}

              {/* Step Content */}
              {currentStep === "method_selection" && (
                <div className="space-y-4">
                  {/* Equipment Summary */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {equipment.brand} {equipment.model}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Year: {equipment.year}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">
                          ${equipment.price.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600">Base Price</p>
                      </div>
                    </div>
                  </div>

                  {/* Quantity Selector */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity
                    </label>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() =>
                          handleQuantityChange(Math.max(1, quantity - 1))
                        }
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                        disabled={quantity <= 1}
                      >
                        -
                      </button>
                      <span className="text-lg font-medium w-8 text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(quantity + 1)}
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                        disabled={quantity >= (equipment.quantity || 1)}
                      >
                        +
                      </button>
                      {equipment.show_public_quantity && (
                        <span className="text-sm text-gray-500 ml-2">
                          ({equipment.quantity} available)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div>
                    <PaymentMethodSelector
                      selectedMethod={selectedMethod}
                      onMethodSelect={handleMethodSelect}
                      accentColor={accentColor}
                      compact={true}
                    />
                  </div>

                  {/* Payment Breakdown */}
                  {selectedMethod === "credit_card" && paymentPreview && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-4">
                      <h4 className="font-medium text-gray-900 mb-4">
                        Payment Breakdown
                      </h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Equipment Price:
                          </span>
                          <span className="font-medium">
                            ${paymentPreview.calculation.subtotal.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tax (7.0%):</span>
                          <span className="font-medium">
                            ${paymentPreview.calculation.tax_amount.toFixed(2)}
                          </span>
                        </div>
                        <div className="border-t border-blue-200 pt-3 mt-3">
                          <div className="flex justify-between font-semibold">
                            <span className="text-gray-900">Total:</span>
                            <span className="text-lg text-gray-900">
                              $
                              {paymentPreview.calculation.total_amount.toFixed(
                                2,
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Continue Button for Credit Card */}
                  {selectedMethod === "credit_card" && (
                    <button
                      onClick={() => setCurrentStep("customer_info")}
                      className={`w-full bg-${accentColor}-600 hover:bg-${accentColor}-700 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 mt-4`}
                    >
                      <span>Continue with Credit Card</span>
                    </button>
                  )}
                </div>
              )}

              {/* Customer Info Step */}
              {currentStep === "customer_info" && (
                <form onSubmit={handleCustomerInfoSubmit} className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">
                      Contact Information
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={customerInfo.name}
                          onChange={(e) =>
                            setCustomerInfo({
                              ...customerInfo,
                              name: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={customerInfo.email}
                          onChange={(e) =>
                            setCustomerInfo({
                              ...customerInfo,
                              email: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                          placeholder="Enter your email address"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={
                      isLoading || !customerInfo.name || !customerInfo.email
                    }
                    className={`w-full bg-${accentColor}-600 hover:bg-${accentColor}-700 disabled:bg-gray-400 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2`}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>Creating Payment Link...</span>
                      </>
                    ) : (
                      <>
                        <CreditCard size={18} />
                        <span>Continue to Payment</span>
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Confirmation Step */}
              {currentStep === "confirmation" && (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle size={32} className="text-green-600" />
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Payment Link Created
                      </h3>
                      <p className="text-gray-600">
                        A secure payment link has been opened in a new tab.
                        Complete your purchase there.
                      </p>
                      <div className="bg-green-50 rounded-lg p-4">
                        <p className="text-sm text-green-800">
                          ✓ Payment link sent to {customerInfo.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleClose}
                    className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
