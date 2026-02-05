import { X, CheckCircle, XCircle, ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { QuizRecommendation } from "../types/quiz";

interface EquipmentModalProps {
  equipment: QuizRecommendation;
  isOpen: boolean;
  onClose: () => void;
  accentColor?: string;
  accentColorLight?: string;
  accentColorDark?: string;
}

type TabType = "overview" | "specifications" | "features" | "pricing";

const EquipmentModal = ({
  equipment,
  isOpen,
  onClose,
  accentColor = "green",
  accentColorLight = "from-green-100 to-green-200",
  accentColorDark = "text-green-600",
}: EquipmentModalProps) => {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const navigate = useNavigate();

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const getConditionColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "new":
        return "bg-green-100 text-green-800";
      case "used - excellent":
        return "bg-blue-100 text-blue-800";
      case "used - good":
        return "bg-yellow-100 text-yellow-800";
      case "used - fair":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const tabs: { id: TabType; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "specifications", label: "Specifications" },
    { id: "features", label: "Features" },
    { id: "pricing", label: "Pricing & Availability" },
  ];

  const handleBuyNow = () => {
    const equipmentData = encodeURIComponent(JSON.stringify(equipment));
    navigate(`/payment?equipment=${equipmentData}&quantity=1`);
  };

  const getButtonClasses = () => {
    const baseClasses =
      "flex-1 text-white px-8 py-3 rounded-xl font-semibold text-lg transition-colors duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2";
    const colorClasses =
      accentColor === "green"
        ? "bg-green-600 hover:bg-green-700"
        : "bg-blue-600 hover:bg-blue-700";
    return `${baseClasses} ${colorClasses}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm overflow-hidden">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden flex flex-col relative">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 flex justify-between items-start">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-2">
              {equipment.brand} {equipment.model}
            </h2>
            {equipment.year > 0 && (
              <p className="text-green-100 text-lg">Year: {equipment.year}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors duration-200"
            aria-label="Close modal"
          >
            <X size={28} />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 bg-gray-50">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-6 py-4 text-sm font-semibold whitespace-nowrap transition-colors duration-200
                  ${
                    activeTab === tab.id
                      ? "text-green-600 border-b-2 border-green-600 bg-white"
                      : "text-gray-600 hover:text-green-600 hover:bg-gray-100"
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Image */}
              <div className="h-64 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center overflow-hidden">
                {equipment.image_url ? (
                  <img
                    src={equipment.image_url}
                    alt={equipment.model}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="text-8xl text-green-600">🚜</div>
                )}
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-gray-500 text-sm mb-1">Status</div>
                  <div className="flex items-center justify-center space-x-2">
                    {equipment.is_available ? (
                      <>
                        <CheckCircle className="text-green-500" size={20} />
                        <span className="text-green-600 font-semibold">
                          Available
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircle className="text-red-500" size={20} />
                        <span className="text-red-600 font-semibold">
                          Out of Stock
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-gray-500 text-sm mb-1">Condition</div>
                  <div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${getConditionColor(equipment.condition)}`}
                    >
                      {equipment.condition}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-gray-500 text-sm mb-1">Price</div>
                  <div className="text-2xl font-bold text-green-600">
                    ${equipment.price.toLocaleString()}
                  </div>
                </div>

                {equipment.show_public_quantity && (
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-gray-500 text-sm mb-1">In Stock</div>
                    <div className="text-2xl font-bold text-gray-800">
                      {equipment.quantity}
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Description
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {equipment.description ||
                    "Contact us for more details about this equipment."}
                </p>
              </div>
            </div>
          )}

          {activeTab === "specifications" && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Technical Specifications
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-500 mb-1">Brand</div>
                  <div className="text-lg font-semibold text-gray-800 capitalize">
                    {equipment.brand}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-500 mb-1">Model</div>
                  <div className="text-lg font-semibold text-gray-800">
                    {equipment.model}
                  </div>
                </div>

                {equipment.year > 0 && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-500 mb-1">Year</div>
                    <div className="text-lg font-semibold text-gray-800">
                      {equipment.year}
                    </div>
                  </div>
                )}

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-500 mb-1">Condition</div>
                  <div className="text-lg font-semibold text-gray-800 capitalize">
                    {equipment.condition}
                  </div>
                </div>
              </div>

              {/* Additional specs could be added here if available in the data */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                <p className="text-blue-800 text-sm">
                  <strong>Note:</strong> For detailed technical specifications
                  including engine size, cutting width, fuel type, and other
                  features, please contact our sales team.
                </p>
              </div>
            </div>
          )}

          {activeTab === "features" && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Features & Highlights
              </h3>

              <p className="text-gray-600">
                {equipment.description ||
                  "Contact us for detailed features and specifications."}
              </p>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
                <h4 className="text-green-800 font-semibold mb-2">
                  Want to Know More?
                </h4>
                <p className="text-green-700 text-sm">
                  Our knowledgeable sales team can provide detailed information
                  about all features, accessories, and customization options
                  available for this equipment.
                </p>
              </div>
            </div>
          )}

          {activeTab === "pricing" && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Pricing & Availability
              </h3>

              {/* Price Card */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-2 border-green-300">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <div className="text-gray-600 text-sm mb-1">Price</div>
                    <div className="text-4xl font-bold text-green-600">
                      ${equipment.price.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right">
                    {equipment.is_available ? (
                      <div className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold">
                        ✓ Available
                      </div>
                    ) : (
                      <div className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold">
                        Out of Stock
                      </div>
                    )}
                    {equipment.show_public_quantity &&
                      equipment.is_available && (
                        <div className="text-sm text-gray-600 mt-2">
                          {equipment.quantity} unit
                          {equipment.quantity !== 1 ? "s" : ""} available
                        </div>
                      )}
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="text-sm text-gray-500 mb-2">
                    Equipment Type
                  </div>
                  <div className="text-lg font-semibold text-gray-800 capitalize">
                    {equipment.brand} Equipment
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="text-sm text-gray-500 mb-2">Year</div>
                  <div className="text-lg font-semibold text-gray-800">
                    {equipment.year > 0
                      ? equipment.year
                      : "Contact for details"}
                  </div>
                </div>
              </div>

              {/* Warranty Info */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-5">
                <h4 className="text-green-900 font-semibold mb-2 text-lg">
                  🛡️ Warranty & Service
                </h4>
                <p className="text-green-800 text-sm">
                  All equipment comes with manufacturer warranty and our
                  dedicated service team is here to support you.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 bg-gray-50 p-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="text-center sm:text-left">
            <p className="text-gray-600 text-sm">
              Questions about this equipment?
            </p>
            <p className="text-gray-800 font-semibold">
              Contact our sales team for assistance
            </p>
          </div>
          <div className="flex space-x-4">
            <button onClick={handleBuyNow} className={getButtonClasses()}>
              <ShoppingCart size={20} />
              <span>Buy Now</span>
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-700 hover:bg-gray-800 text-white px-8 py-3 rounded-xl font-semibold text-lg transition-colors duration-200 shadow-lg hover:shadow-xl border border-gray-600"
            >
              Contact Sales Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentModal;
