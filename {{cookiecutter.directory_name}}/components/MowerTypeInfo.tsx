import * as React from "react";
import { Info, X } from "lucide-react";

interface MowerTypeDetails {
  name: string;
  description: string;
  bestFor: string[];
  features: string[];
  icon: string;
}

const mowerTypeDetails: Record<string, MowerTypeDetails> = {
  "zero-turn": {
    name: "Zero-Turn Mower",
    description:
      "High-performance mowers with exceptional maneuverability, allowing you to turn on a dime with zero-degree turning radius.",
    bestFor: [
      "Large residential properties (1+ acres)",
      "Properties with many obstacles (trees, flower beds)",
      "Users who want fast, efficient mowing",
      "Commercial landscaping operations",
    ],
    features: [
      "Zero-degree turning radius for tight spaces",
      "Fast mowing speeds (up to 10+ mph)",
      "Professional-grade cutting quality",
      "Comfortable seating for long sessions",
      'Wide cutting decks (42"-72")',
    ],
    icon: "🔄",
  },
  push: {
    name: "Push Mower",
    description:
      "Traditional manual mowers that you push by hand, offering simplicity and affordability for small lawns.",
    bestFor: [
      "Small yards (under 0.5 acres)",
      "Flat terrain",
      "Budget-conscious buyers",
      "Light, occasional use",
    ],
    features: [
      "Lightweight and easy to store",
      "Low maintenance requirements",
      "Affordable price point",
      "Good exercise while mowing",
      "Simple operation",
    ],
    icon: "🚶",
  },
  "stand-on": {
    name: "Stand-On Mower",
    description:
      "Commercial-grade mowers where the operator stands on a platform, providing excellent visibility and quick on-off access.",
    bestFor: [
      "Professional landscapers",
      "Commercial properties",
      "Users who frequently get on/off the mower",
      "Properties requiring high productivity",
    ],
    features: [
      "Superior operator visibility",
      "Easy and quick to mount/dismount",
      "Compact footprint for transport",
      "Commercial-grade durability",
      "Excellent maneuverability",
    ],
    icon: "🧍",
  },
  "self-propelled": {
    name: "Self-Propelled Mower",
    description:
      "Walk-behind mowers with powered wheels that do the pushing for you, making mowing easier on slopes and larger areas.",
    bestFor: [
      "Small to medium yards (0.25-1 acre)",
      "Hilly or sloped terrain",
      "Users who want easier pushing",
      "Tight spaces where riding mowers don't fit",
    ],
    features: [
      "Powered drive system reduces effort",
      "Variable speed control",
      "Better control on slopes",
      "More power than push mowers",
      "Fits through narrow gates",
    ],
    icon: "⚡",
  },
  riding: {
    name: "Riding Mower",
    description:
      "Traditional riding lawn mowers with a front-mounted engine and steering wheel, offering comfort and efficiency for medium to large properties.",
    bestFor: [
      "Medium to large yards (0.5-2+ acres)",
      "Users who prefer traditional steering",
      "Comfortable, longer mowing sessions",
      "Relatively flat terrain",
    ],
    features: [
      "Comfortable seated operation",
      "Traditional steering wheel control",
      "Variety of attachments available",
      "Good for extended mowing sessions",
      'Cutting decks from 30"-54"',
    ],
    icon: "🚜",
  },
};

interface MowerTypeInfoProps {
  mowerType: string;
  accentColor?: string;
  accentColorLight?: string;
}

const MowerTypeInfoButton: React.FC<MowerTypeInfoProps> = ({
  mowerType,
  accentColor = "text-green-500",
  accentColorLight = "bg-green-50",
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const details = mowerTypeDetails[mowerType];

  if (!details) return null;

  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
        className={`ml-2 p-1 rounded-full ${accentColorLight} ${accentColor} hover:opacity-80 transition-opacity`}
        title="Learn more"
      >
        <Info size={18} />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`${accentColorLight} p-6 relative`}>
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <X size={24} />
              </button>
              <div className="flex items-center space-x-4">
                <span className="text-5xl">{details.icon}</span>
                <h2 className="text-3xl font-bold text-gray-800">
                  {details.name}
                </h2>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {details.description}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Best For:
                </h3>
                <ul className="space-y-2">
                  {details.bestFor.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className={`${accentColor} mr-2 mt-1`}>✓</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Key Features:
                </h3>
                <ul className="space-y-2">
                  {details.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className={`${accentColor} mr-2 mt-1`}>•</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 ${accentColor.replace(
                    "text",
                    "bg",
                  )} text-white hover:opacity-90`}
                >
                  Got it!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MowerTypeInfoButton;
