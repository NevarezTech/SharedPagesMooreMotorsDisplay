import * as React from "react";
import { CheckCircle } from "lucide-react";

interface ResultsSummaryProps {
  answers: Record<string, string>;
  brandName: string;
  hasResults: boolean;
  accentColor?: string;
}

const ResultsSummary: React.FC<ResultsSummaryProps> = ({
  answers,
  brandName,
  hasResults,
  accentColor = "text-green-600",
}) => {
  return (
    <>
      <CheckCircle className={`mx-auto mb-6 ${accentColor}`} size={80} />
      <h2 className="text-4xl font-bold text-gray-800 mb-4">
        {hasResults ? "Perfect Match!" : "No Matches Found"}
      </h2>
      <p className="text-xl text-gray-600 mb-6">
        {hasResults
          ? `Based on your answers, here are the best ${brandName} equipment for your needs.`
          : "No equipment currently matches your criteria. Please check our full inventory or contact us for assistance."}
      </p>

      {/* User Selections Summary */}
      <div className="bg-white rounded-xl p-6 mb-8 shadow-lg max-w-md mx-auto">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Your Selections
        </h3>
        <div className="space-y-2 text-left">
          <div className="flex justify-between">
            <span className="text-gray-600">Usage:</span>
            <span className={`font-medium ${accentColor}`}>
              {answers["service-type"] || "Not specified"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Land Size:</span>
            <span className={`font-medium ${accentColor}`}>
              {answers["land-size"] || "Not specified"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Brand:</span>
            <span className={`font-medium ${accentColor}`}>{brandName}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultsSummary;
