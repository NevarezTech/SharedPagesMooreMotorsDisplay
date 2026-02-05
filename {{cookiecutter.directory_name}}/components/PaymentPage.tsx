import { FC, useState, useEffect, FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  X,
  ArrowLeft,
  Loader2,
  CreditCard,
  CheckCircle,
  MapPin,
  Phone,
  AlertCircle,
} from "lucide-react";
import type { QuizRecommendation } from "../types/quiz";
import type { PaymentMethod, PaymentPreviewResponse } from "../types/payment";
import { paymentApi } from "../api/paymentApi";
import PaymentMethodSelector from "./PaymentMethodSelector";

type PaymentStep =
  | "method_selection"
  | "customer_info"
  | "payment_processing"
  | "confirmation";

interface CustomerInfo {
  name: string;
  email: string;
}

interface PaymentPageProps {
  accentColor?: string;
  accentColorLight?: string;
  accentColorDark?: string;
}

const PaymentPage: FC<PaymentPageProps> = ({
  accentColor = "blue",
  accentColorLight = "from-blue-100 to-blue-200",
  accentColorDark = "text-blue-600",
}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [equipment, setEquipment] = useState<QuizRecommendation | null>(null);
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

  // Get equipment data from URL parameters
  useEffect(() => {
    const equipmentData = searchParams.get("equipment");
    if (equipmentData) {
      try {
        const parsed = JSON.parse(decodeURIComponent(equipmentData));
        setEquipment(parsed);
        setQuantity(parseInt(searchParams.get("quantity") || "1"));
        loadPaymentPreview(
          undefined,
          parsed,
          parseInt(searchParams.get("quantity") || "1"),
        );
      } catch (error) {
        console.error("Failed to parse equipment data:", error);
        navigate(-1);
      }
    } else {
      navigate(-1);
    }
  }, [searchParams, navigate]);

  const loadPaymentPreview = async (
    paymentMethod?: string,
    equipmentData?: QuizRecommendation,
    qty?: number,
  ) => {
    const currentEquipment = equipmentData || equipment;
    const currentQuantity = qty || quantity;

    if (!currentEquipment) return;

    setIsLoading(true);
    setError(null);

    try {
      // Get base pricing without processing fees
      const preview = await paymentApi.getPaymentPreview(
        currentEquipment.id,
        currentQuantity,
      );

      // Calculate processing fees client-side based on payment method
      if (paymentMethod === "credit_card") {
        const processingRate = 0.029; // 2.9% processing fee
        const baseAmount = currentEquipment.price * currentQuantity;
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
        navigate(-1);
    }
  };

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

  if (!equipment) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin h-8 w-8 text-white mx-auto mb-4" />
          <p className="text-white">Loading payment information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className={`bg-gradient-to-r ${accentColorLight} shadow-lg`}>
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBack}
                className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {getStepTitle()}
                </h1>
                <p className="text-sm text-gray-600">
                  {equipment.brand} {equipment.model} ({equipment.year})
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="p-6">
            {/* Error Display */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
                <AlertCircle size={20} className="text-red-600 flex-shrink-0" />
                <span className="text-red-800">{error}</span>
              </div>
            )}

            {/* Step Content */}
            {currentStep === "method_selection" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Equipment Summary & Payment Methods */}
                <div className="space-y-6">
                  {/* Equipment Summary */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Equipment Summary
                    </h3>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {equipment.brand} {equipment.model}
                        </h4>
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

                    {/* Quantity Selector */}
                    <div className="border-t pt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quantity
                      </label>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() =>
                            handleQuantityChange(Math.max(1, quantity - 1))
                          }
                          className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-medium"
                          disabled={quantity <= 1}
                        >
                          -
                        </button>
                        <span className="text-xl font-medium w-12 text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(quantity + 1)}
                          className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-medium"
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
                  </div>

                  {/* Payment Methods */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Select Payment Method
                    </h3>
                    <PaymentMethodSelector
                      selectedMethod={selectedMethod}
                      onMethodSelect={handleMethodSelect}
                      accentColor={accentColor}
                      compact={false}
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
                      className={`w-full bg-${accentColor}-600 hover:bg-${accentColor}-700 text-white px-6 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center space-x-2`}
                    >
                      <CreditCard size={20} />
                      <span>Continue with Credit Card</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Customer Info Step */}
            {currentStep === "customer_info" && (
              <div className="max-w-md mx-auto">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Contact Information
                </h3>
                <form onSubmit={handleCustomerInfoSubmit} className="space-y-4">
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                      placeholder="Enter your email address"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={
                      isLoading || !customerInfo.name || !customerInfo.email
                    }
                    className={`w-full bg-${accentColor}-600 hover:bg-${accentColor}-700 disabled:bg-gray-400 text-white px-6 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center space-x-2`}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        <span>Creating Payment Link...</span>
                      </>
                    ) : (
                      <>
                        <CreditCard size={20} />
                        <span>Continue to Payment</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}

            {/* Confirmation Step */}
            {currentStep === "confirmation" && (
              <div className="max-w-2xl mx-auto text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={40} className="text-green-600" />
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-gray-900">
                    Payment Link Created
                  </h3>
                  <p className="text-gray-600 text-lg">
                    A secure payment link has been created. You'll be redirected
                    to complete your purchase.
                  </p>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-green-800 text-sm">
                      <strong>Next Steps:</strong> Complete your payment through
                      our secure processor. You'll receive a confirmation email
                      once the transaction is complete.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                  <button
                    onClick={() => navigate(-1)}
                    className="px-8 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
