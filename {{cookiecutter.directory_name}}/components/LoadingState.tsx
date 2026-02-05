import { FC } from "react";
import { Loader2, XCircle } from "lucide-react";

interface LoadingStateProps {
  isLoading: boolean;
  error: string | null;
  onRetry?: () => void;
  loadingTitle?: string;
  loadingMessage?: string;
  errorTitle?: string;
  accentColor?: string;
  buttonColor?: string;
  buttonHoverColor?: string;
}

const LoadingState: FC<LoadingStateProps> = ({
  isLoading,
  error,
  onRetry,
  loadingTitle = "Loading...",
  loadingMessage = "Please wait while we process your request.",
  errorTitle = "Oops! Something Went Wrong",
  accentColor = "text-green-500",
  buttonColor = "bg-green-600",
  buttonHoverColor = "hover:bg-green-700",
}) => {
  if (isLoading) {
    return (
      <>
        <Loader2
          className={`mx-auto mb-6 ${accentColor} animate-spin`}
          size={80}
        />
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          {loadingTitle}
        </h2>
        <p className="text-xl text-gray-600">{loadingMessage}</p>
      </>
    );
  }

  if (error) {
    return (
      <>
        <XCircle className="mx-auto mb-6 text-red-500" size={80} />
        <h2 className="text-4xl font-bold text-gray-800 mb-4">{errorTitle}</h2>
        <p className="text-xl text-gray-600 mb-6">{error}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className={`${buttonColor} text-white px-8 py-3 rounded-xl text-lg font-semibold ${buttonHoverColor} transition-colors duration-200`}
          >
            Try Again
          </button>
        )}
      </>
    );
  }

  return null;
};

export default LoadingState;
