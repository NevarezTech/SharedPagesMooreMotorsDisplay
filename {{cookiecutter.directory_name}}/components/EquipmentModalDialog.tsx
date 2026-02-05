import { FC } from "react";
import { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import type { QuizRecommendation } from "../types/quiz";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog-custom";

type TabType = "overview" | "specifications" | "features" | "pricing";

interface EquipmentModalProps {
  equipment: QuizRecommendation | null;
  isOpen: boolean;
  onClose: () => void;
  accentColor?: string;
  accentColorLight?: string;
}

const EquipmentModal: FC<EquipmentModalProps> = ({
  equipment,
  isOpen,
  onClose,
  accentColor = "green",
  accentColorLight = "from-green-100 to-green-200",
}) => {
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  const getConditionColor = (condition: string) => {
    const lowerCondition = condition.toLowerCase();
    if (lowerCondition === "new") return "bg-green-100 text-green-800";
    if (lowerCondition === "used" || lowerCondition === "good")
      return "bg-blue-100 text-blue-800";
    if (lowerCondition === "fair") return "bg-yellow-100 text-yellow-800";
    return "bg-gray-100 text-gray-800";
  };

  const tabs: { id: TabType; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "specifications", label: "Specifications" },
    { id: "features", label: "Features" },
    { id: "pricing", label: "Pricing & Availability" },
  ];

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      {equipment && (
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold">
              {equipment.brand} {equipment.model}
            </DialogTitle>
            {equipment.year > 0 && (
              <p className="text-gray-600 text-lg">Year: {equipment.year}</p>
            )}
          </DialogHeader>

          {/* Tabs */}
          <div className="border-b border-gray-200 -mx-6 px-6">
            <div className="flex space-x-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3 px-4 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? `border-${accentColor}-600 text-${accentColor}-600`
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <>
                {/* Image */}
                <div
                  className={`w-full h-64 bg-gradient-to-br ${accentColorLight} rounded-lg flex items-center justify-center overflow-hidden`}
                >
                  {equipment.image_url ? (
                    <img
                      src={equipment.image_url}
                      alt={equipment.model}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-8xl">🚜</div>
                  )}
                </div>

                {/* Status and Condition */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {equipment.is_available ? (
                      <>
                        <CheckCircle
                          className={`text-${accentColor}-500`}
                          size={24}
                        />
                        <span
                          className={`text-${accentColor}-600 font-semibold`}
                        >
                          Available
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircle className="text-red-500" size={24} />
                        <span className="text-red-600 font-semibold">
                          Not Available
                        </span>
                      </>
                    )}
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getConditionColor(
                      equipment.condition,
                    )}`}
                  >
                    {equipment.condition}
                  </span>
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
              </>
            )}

            {/* Specifications Tab */}
            {activeTab === "specifications" && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Technical Specifications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="text-sm text-gray-500 mb-2">Brand</div>
                    <div className="text-lg font-semibold text-gray-800">
                      {equipment.brand}
                    </div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="text-sm text-gray-500 mb-2">Model</div>
                    <div className="text-lg font-semibold text-gray-800">
                      {equipment.model}
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
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="text-sm text-gray-500 mb-2">Condition</div>
                    <div className="text-lg font-semibold text-gray-800 capitalize">
                      {equipment.condition}
                    </div>
                  </div>
                  {equipment.type && (
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="text-sm text-gray-500 mb-2">Type</div>
                      <div className="text-lg font-semibold text-gray-800 capitalize">
                        {equipment.type.replace("-", " ")}
                      </div>
                    </div>
                  )}
                  {equipment.fuel_type && (
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="text-sm text-gray-500 mb-2">
                        Fuel Type
                      </div>
                      <div className="text-lg font-semibold text-gray-800 capitalize">
                        {equipment.fuel_type}
                      </div>
                    </div>
                  )}
                  {equipment.cutting_width && (
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="text-sm text-gray-500 mb-2">
                        Cutting Width
                      </div>
                      <div className="text-lg font-semibold text-gray-800">
                        {equipment.cutting_width}
                      </div>
                    </div>
                  )}
                  {equipment.engine_size && (
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="text-sm text-gray-500 mb-2">
                        Engine Size
                      </div>
                      <div className="text-lg font-semibold text-gray-800">
                        {equipment.engine_size}
                      </div>
                    </div>
                  )}
                  {equipment.weight && (
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="text-sm text-gray-500 mb-2">Weight</div>
                      <div className="text-lg font-semibold text-gray-800">
                        {equipment.weight}
                      </div>
                    </div>
                  )}
                  {equipment.deck_material && (
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="text-sm text-gray-500 mb-2">
                        Deck Material
                      </div>
                      <div className="text-lg font-semibold text-gray-800">
                        {equipment.deck_material}
                      </div>
                    </div>
                  )}
                  {equipment.transmission && (
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="text-sm text-gray-500 mb-2">
                        Transmission
                      </div>
                      <div className="text-lg font-semibold text-gray-800">
                        {equipment.transmission}
                      </div>
                    </div>
                  )}
                  {equipment.turning_radius && (
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="text-sm text-gray-500 mb-2">
                        Turning Radius
                      </div>
                      <div className="text-lg font-semibold text-gray-800">
                        {equipment.turning_radius}
                      </div>
                    </div>
                  )}
                  {equipment.hours_per_acre && (
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="text-sm text-gray-500 mb-2">
                        Estimated Time
                      </div>
                      <div className="text-lg font-semibold text-gray-800">
                        {equipment.hours_per_acre} hrs/acre
                      </div>
                    </div>
                  )}
                  {equipment.warranty && (
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="text-sm text-gray-500 mb-2">Warranty</div>
                      <div className="text-lg font-semibold text-gray-800">
                        {equipment.warranty}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Features Tab */}
            {activeTab === "features" && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Features & Highlights
                </h3>

                {equipment.features ? (
                  <div className="space-y-3">
                    {(() => {
                      try {
                        const featuresList = JSON.parse(equipment.features);
                        return Array.isArray(featuresList) &&
                          featuresList.length > 0 ? (
                          featuresList.map((feature: string, index: number) => (
                            <div
                              key={index}
                              className="flex items-start space-x-3 bg-white border border-gray-200 rounded-lg p-4"
                            >
                              <CheckCircle
                                className={`text-${accentColor}-600 flex-shrink-0 mt-0.5`}
                                size={20}
                              />
                              <span className="text-gray-800">{feature}</span>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-700 leading-relaxed">
                            {equipment.description ||
                              "Contact us for detailed features and specifications."}
                          </p>
                        );
                      } catch {
                        return (
                          <p className="text-gray-700 leading-relaxed">
                            {equipment.features ||
                              equipment.description ||
                              "Contact us for detailed features and specifications."}
                          </p>
                        );
                      }
                    })()}
                  </div>
                ) : (
                  <p className="text-gray-700 leading-relaxed">
                    {equipment.description ||
                      "Contact us for detailed features and specifications."}
                  </p>
                )}

                <div
                  className={`bg-${accentColor}-50 border border-${accentColor}-200 rounded-lg p-4 mt-6`}
                >
                  <h4 className={`text-${accentColor}-800 font-semibold mb-2`}>
                    Need More Information?
                  </h4>
                  <p className={`text-${accentColor}-700 text-sm`}>
                    Contact our sales team for a complete list of features,
                    specifications, and available options.
                  </p>
                </div>
              </div>
            )}

            {/* Pricing Tab */}
            {activeTab === "pricing" && (
              <>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Pricing & Availability
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-lg">Price:</span>
                      <span
                        className={`text-3xl font-bold text-${accentColor}-600`}
                      >
                        ${equipment.price.toFixed(2)}
                      </span>
                    </div>
                    {equipment.is_available &&
                      equipment.show_public_quantity && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 text-lg">
                            In Stock:
                          </span>
                          <span className="text-xl font-semibold text-gray-800">
                            {equipment.quantity}{" "}
                            {equipment.quantity === 1 ? "unit" : "units"}
                          </span>
                        </div>
                      )}
                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                      <span className="text-gray-600 text-lg">Status:</span>
                      <div className="flex items-center gap-2">
                        {equipment.is_available ? (
                          <>
                            <CheckCircle
                              className={`text-${accentColor}-500`}
                              size={20}
                            />
                            <span
                              className={`text-${accentColor}-600 font-semibold`}
                            >
                              Available Now
                            </span>
                          </>
                        ) : (
                          <>
                            <XCircle className="text-red-500" size={20} />
                            <span className="text-red-600 font-semibold">
                              Currently Unavailable
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Call to Action */}
                <div
                  className={`bg-${accentColor}-50 border border-${accentColor}-200 rounded-lg p-6`}
                >
                  <h4
                    className={`text-${accentColor}-800 font-semibold mb-2 text-lg`}
                  >
                    Interested in this equipment?
                  </h4>
                  <p className={`text-${accentColor}-700 mb-4`}>
                    Contact our sales team for more information or to schedule a
                    test drive.
                  </p>
                  <div className="flex gap-3">
                    <button
                      className={`bg-${accentColor}-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-${accentColor}-700 transition-colors`}
                    >
                      Contact Sales
                    </button>
                    <button
                      className={`bg-white text-${accentColor}-600 border-2 border-${accentColor}-600 px-6 py-3 rounded-lg font-semibold hover:bg-${accentColor}-50 transition-colors`}
                    >
                      Request Quote
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default EquipmentModal;
