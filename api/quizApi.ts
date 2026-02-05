// Quiz API Client - Shared across all brand displays

import type { QuizAnswers, QuizResponse, QuizError } from "../types/quiz";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

/**
 * Fetches quiz recommendations from the backend API
 * @param answers - The user's quiz answers
 * @returns Promise with quiz recommendations
 */
export const fetchQuizRecommendations = async (
  answers: QuizAnswers
): Promise<QuizResponse> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/quiz/${answers.brand}/recommendations`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(answers),
      }
    );

    if (!response.ok) {
      const error: QuizError = await response.json();
      throw new Error(error.message || "Failed to fetch recommendations");
    }

    const data: QuizResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unexpected error occurred while fetching recommendations");
  }
};

/**
 * Validates quiz answers before submission
 * @param answers - The quiz answers to validate
 * @returns boolean indicating if answers are valid
 */
export const validateQuizAnswers = (answers: Partial<QuizAnswers>): boolean => {
  return !!(
    answers.service_type &&
    answers.land_size &&
    answers.brand
  );
};
