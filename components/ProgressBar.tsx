import * as React from "react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  accentColor?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
  accentColor = "bg-green-500",
}) => {
  const percentage = Math.round(((currentStep + 1) / totalSteps) * 100);

  return (
    <div className="mb-8">
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>
          Question {currentStep + 1} of {totalSteps}
        </span>
        <span>{percentage}% Complete</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className={`${accentColor} h-3 rounded-full transition-all duration-300`}
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
