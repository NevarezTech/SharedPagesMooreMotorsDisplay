import { FC, ReactNode } from "react";
import { CheckCircle, Circle } from "lucide-react";

interface QuestionCardProps {
  question: string;
  options: string[];
  selectedValue?: string;
  onSelect: (value: string) => void;
  required?: boolean;
  accentColor?: string;
  accentColorLight?: string;
  accentColorBorder?: string;
  customInput?: ReactNode;
}

const QuestionCard: FC<QuestionCardProps> = ({
  question,
  options,
  selectedValue,
  onSelect,
  required = false,
  accentColor = "text-green-500",
  accentColorLight = "bg-green-50",
  accentColorBorder = "border-green-500",
  customInput,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {question}
        {required && <span className="text-red-500 ml-1">*</span>}
      </h2>

      <div className="space-y-4">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className={`
              w-full p-4 text-left rounded-xl border-2 transition-all duration-200
              flex items-center space-x-3
              ${
                selectedValue === option
                  ? `${accentColorBorder} ${accentColorLight}`
                  : `border-gray-200 hover:${accentColorBorder} bg-white hover:${accentColorLight}`
              }
            `}
          >
            {selectedValue === option ? (
              <CheckCircle className={accentColor} size={24} />
            ) : (
              <Circle className="text-gray-400" size={24} />
            )}
            <span className="text-lg font-medium text-gray-800">{option}</span>
          </button>
        ))}

        {customInput}
      </div>
    </div>
  );
};

export default QuestionCard;
