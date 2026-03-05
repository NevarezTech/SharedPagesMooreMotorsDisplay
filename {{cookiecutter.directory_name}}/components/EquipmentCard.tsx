import * as React from "react";

import type { QuizRecommendation } from "../types/quiz";

interface EquipmentCardProps {
  equipment: QuizRecommendation;
  onClick: () => void;
  accentColor?: string;
  accentColorLight?: string;
  accentColorDark?: string;
}

const EquipmentCard: React.FC<EquipmentCardProps> = ({
  equipment,
  onClick,
  accentColor = "text-green-600",
  accentColorLight = "from-green-100 to-green-200",
  accentColorDark = "text-green-600",
}) => {
  const getConditionColor = (condition: string) => {
    const lowerCondition = condition.toLowerCase();
    if (lowerCondition === "new") return "bg-green-100 text-green-800";
    if (lowerCondition === "used" || lowerCondition === "good")
      return "bg-blue-100 text-blue-800";
    if (lowerCondition === "fair") return "bg-yellow-100 text-yellow-800";
    return "bg-gray-100 text-gray-800";
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
      onClick={onClick}
    >
      {/* Image */}
      <div
        className={`h-48 bg-gradient-to-br ${accentColorLight} flex items-center justify-center overflow-hidden`}
      >
        {equipment.image_url ? (
          <img
            src={equipment.image_url}
            alt={equipment.model}
            className="w-full h-full object-contain"
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              const target = e.currentTarget;
              target.style.display = "none";
              if (target.parentElement) {
                target.parentElement.innerHTML = `<div class="text-6xl ${accentColorDark}">🚜</div>`;
              }
            }}
          />
        ) : (
          <div className={`text-6xl ${accentColorDark}`}>🚜</div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h4 className="text-xl font-bold text-gray-800 mb-1">
              {equipment.brand} {equipment.model}
              {equipment.series && (
                <span className="text-base font-normal text-gray-600 ml-2">
                  ({equipment.series})
                </span>
              )}
            </h4>
            {equipment.year > 0 && (
              <p className="text-gray-600 text-sm">Year: {equipment.year}</p>
            )}
          </div>
          <div className="flex items-center">
            {!equipment.is_available ? (
              <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full font-medium">
                Unavailable
              </span>
            ) : equipment.quantity === 0 ? (
              <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full font-medium">
                Out of Stock
              </span>
            ) : (
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                In Stock
              </span>
            )}
          </div>
        </div>

        {/* Condition Badge */}
        <div className="mb-4">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getConditionColor(
              equipment.condition,
            )}`}
          >
            {equipment.condition}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {equipment.description ||
            "Contact us for more details about this equipment."}
        </p>

        {/* Price and Stock */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <div>
            <div className={`text-2xl font-bold ${accentColor}`}>
              ${equipment.price.toFixed(2)}
            </div>
          </div>
          {equipment.is_available && equipment.show_public_quantity && (
            <div className="text-xs text-gray-600 font-medium">
              {equipment.quantity === 0 ? (
                <span className="text-orange-600">Out of Stock</span>
              ) : (
                <span>
                  {equipment.quantity}{" "}
                  {equipment.quantity === 1 ? "unit" : "units"} available
                </span>
              )}
            </div>
          )}
          {!equipment.is_available && (
            <div className="text-xs text-red-600 font-medium">
              Currently Unavailable
            </div>
          )}
        </div>
      </div>

      {/* Click prompt */}
      <div className="text-center text-sm text-gray-500 italic pb-4">
        Click to view details
      </div>
    </div>
  );
};

export default EquipmentCard;
