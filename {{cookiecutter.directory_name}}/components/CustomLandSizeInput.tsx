import * as React from "react";

interface CustomLandSizeInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const CustomLandSizeInput: React.FC<CustomLandSizeInputProps> = ({
  value,
  onChange,
  error,
}) => {
  return (
    <div className="mt-4 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-gray-300 shadow-sm">
      <label className="block text-base font-semibold text-gray-800 mb-3">
        Please specify the acreage:
      </label>
      <input
        type="text"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        placeholder="Enter acreage (e.g., 5 acres)"
        className={`w-full px-4 py-3 border-2 rounded-lg text-lg bg-white focus:outline-none transition-all ${
          error
            ? "border-red-400 focus:border-red-500"
            : "border-gray-300 focus:border-gray-400"
        }`}
        autoFocus
      />
      {error ? (
        <p className="mt-3 text-sm text-red-600 font-medium">{error}</p>
      ) : (
        <p className="mt-3 text-sm text-gray-600">
          Enter a number followed by "acres" (e.g., 5 acres)
        </p>
      )}
    </div>
  );
};

export default CustomLandSizeInput;
