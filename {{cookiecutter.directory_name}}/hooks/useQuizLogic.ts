// Shared Quiz Logic Hook
// Extracts common quiz functionality that can be reused across brand displays

import { useState } from "react";
import { fetchQuizRecommendations } from "../api/quizApi";
import type {
  QuizAnswers,
  QuizRecommendation,
  ServiceType,
  Brand,
} from "../types/quiz";

interface UseQuizLogicProps {
  brand: Brand;
}

export const useQuizLogic = ({ brand }: UseQuizLogicProps) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [recommendations, setRecommendations] = useState<QuizRecommendation[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [customLandSize, setCustomLandSize] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [landSizeError, setLandSizeError] = useState("");

  /**
   * Validates land size input to ensure it follows the format: number + "acres"
   */
  const validateLandSize = (value: string): string => {
    const trimmed = value.trim();

    if (!trimmed) {
      return "Please enter a land size";
    }

    // Check if it matches pattern: number + "acres" or "acre"
    const pattern = /^(\d+(\.\d+)?)\s*(acres?|Acres?|ACRES?)$/;
    const match = trimmed.match(pattern);

    if (!match) {
      return "Please enter a valid format (e.g., '5 acres' or '10 acres')";
    }

    const number = parseFloat(match[1]);

    if (number <= 0) {
      return "Land size must be greater than 0";
    }

    if (number > 1000) {
      return "Please enter a realistic land size";
    }

    return ""; // No error
  };

  /**
   * Handles answer selection for questions
   */
  const handleAnswer = (questionId: string, value: string) => {
    if (questionId === "land-size" && value === "Custom") {
      setShowCustomInput(true);
      // Set "Custom" as the selected answer to show the checkmark
      setAnswers((prev) => ({
        ...prev,
        [questionId]: value,
      }));
    } else {
      setShowCustomInput(false);
      setCustomLandSize("");
      setLandSizeError("");
      setAnswers((prev) => ({
        ...prev,
        [questionId]: value,
      }));
    }
  };

  /**
   * Handles custom land size input with validation
   */
  const handleCustomLandSize = (value: string) => {
    setCustomLandSize(value);

    const error = validateLandSize(value);
    setLandSizeError(error);

    // Keep "Custom" as the selected answer for UI checkmark
    // The actual normalized value will be set when proceeding to next question
  };

  /**
   * Handles navigation to next question or completion
   */
  const handleNext = (isLastQuestion: boolean) => {
    // Validate custom land size input if shown
    if (showCustomInput) {
      const error = validateLandSize(customLandSize);
      if (error) {
        setLandSizeError(error);
        return false;
      }

      // Normalize and save the custom land size value
      const trimmed = customLandSize.trim();
      const match = trimmed.match(/^(\d+(\.\d+)?)\s*(acres?|Acres?|ACRES?)$/);
      if (match) {
        const number = match[1];
        const normalized = `${number} acres`;
        setAnswers((prev) => ({
          ...prev,
          "land-size": normalized,
        }));
      }
    }

    if (isLastQuestion) {
      setIsComplete(true);
      loadRecommendations();
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }

    return true;
  };

  /**
   * Handles navigation to previous question
   */
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  /**
   * Loads equipment recommendations from the API
   */
  const loadRecommendations = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Handle custom vs predefined land sizes
      const landSize =
        customLandSize && showCustomInput
          ? customLandSize
          : answers["land-size"];

      // Normalize mower type from user-friendly format to backend format
      const normalizeMowerType = (mowerType: string): string => {
        const mapping: Record<string, string> = {
          "Zero Turn": "zero-turn",
          "Push Mower": "push",
          "Stand On Mower": "stand-on",
          "Self Propelled": "self-propelled",
          "Riding Mower": "riding",
        };
        return mapping[mowerType] || mowerType.toLowerCase();
      };

      const quizAnswers: QuizAnswers = {
        service_type: answers["service-type"] as ServiceType,
        mower_type: answers["mower-type"]
          ? normalizeMowerType(answers["mower-type"])
          : undefined,
        land_size: landSize,
        brand: brand,
      };

      const response = await fetchQuizRecommendations(quizAnswers);
      setRecommendations(response.recommendations);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load recommendations. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Resets the quiz to initial state
   */
  const resetQuiz = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setIsComplete(false);
    setRecommendations([]);
    setIsLoading(false);
    setError(null);
    setCustomLandSize("");
    setShowCustomInput(false);
    setLandSizeError("");
  };

  /**
   * Determines if user can proceed to next question
   */
  const canProceed = (currentQuestion: { id: string; required?: boolean }) => {
    if (!currentQuestion.required) {
      return true;
    }

    // If custom input is shown, require valid custom land size
    if (showCustomInput && currentQuestion.id === "land-size") {
      return customLandSize.trim() !== "" && !landSizeError;
    }

    // Otherwise, just check if there's an answer
    return !!answers[currentQuestion.id];
  };

  return {
    // State
    answers,
    currentQuestionIndex,
    isComplete,
    recommendations,
    isLoading,
    error,
    customLandSize,
    showCustomInput,
    landSizeError,

    // Actions
    handleAnswer,
    handleCustomLandSize,
    handleNext,
    handlePrevious,
    loadRecommendations,
    resetQuiz,
    canProceed,
    validateLandSize,

    // Setters (for advanced use cases)
    setAnswers,
    setCurrentQuestionIndex,
    setIsComplete,
    setRecommendations,
    setError,
  };
};
