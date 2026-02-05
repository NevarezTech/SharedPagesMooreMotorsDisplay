import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuizLogic } from "@shared/hooks/useQuizLogic";
import {
  ProgressBar,
  QuestionCard,
  CustomLandSizeInput,
  EquipmentCard,
  LoadingState,
  ResultsSummary,
} from "@shared";
import type { QuizRecommendation } from "@shared/types/quiz";
import EquipmentModal from "@shared/components/EquipmentModal";

interface Question {
  id: string;
  text: string;
  options: string[];
  required: boolean;
}

const questions: Question[] = [
  {
    id: "service-type",
    text: "Are you buying for residential or commercial needs?",
    options: ["Residential", "Commercial"],
    required: true,
  },
  {
    id: "land-size",
    text: "How big is the land that you'll be servicing?",
    options: ["Under an acre", "1 acre", "2 acres", "Custom"],
    required: true,
  },
];

const QuestionnairePage = () => {
  const navigate = useNavigate();
  const {
    answers,
    currentQuestionIndex,
    isComplete,
    recommendations,
    isLoading,
    error,
    customLandSize,
    showCustomInput,
    landSizeError,
    handleAnswer,
    handleCustomLandSize,
    handleNext: handleNextLogic,
    handlePrevious,
    loadRecommendations,
    canProceed: canProceedCheck,
  } = useQuizLogic({ brand: "exmark" });

  const [selectedEquipment, setSelectedEquipment] =
    useState<QuizRecommendation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const canProceed = canProceedCheck(currentQuestion);

  const handleNext = () => {
    handleNextLogic(isLastQuestion);
  };

  // Results view
  if (isComplete) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-gray-100 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center mb-8">
              <button
                onClick={() => navigate("/")}
                className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors duration-200"
              >
                <ArrowLeft size={24} />
                <span className="text-lg font-medium">Back to Home</span>
              </button>
            </div>

            <div className="text-center mb-12">
              <LoadingState
                isLoading={isLoading}
                error={error}
                onRetry={loadRecommendations}
                loadingTitle="Finding Your Perfect Match..."
                loadingMessage="Please wait while we search our inventory for you."
                accentColor="text-red-500"
                buttonColor="bg-red-600"
                buttonHoverColor="hover:bg-red-700"
              />

              {!isLoading && !error && (
                <>
                  <ResultsSummary
                    answers={answers}
                    brandName="Exmark"
                    hasResults={recommendations.length > 0}
                    accentColor="text-red-600"
                  />

                  {/* Equipment Cards */}
                  {recommendations.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {recommendations.map((equipment: QuizRecommendation) => (
                        <EquipmentCard
                          key={equipment.id}
                          equipment={equipment}
                          onClick={() => {
                            setSelectedEquipment(equipment);
                            setIsModalOpen(true);
                          }}
                          accentColor="text-red-600"
                          accentColorLight="from-red-100 to-red-200"
                          accentColorDark="text-red-600"
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>

            {!isLoading && !error && (
              <div className="text-center mt-12">
                <div className="space-y-4">
                  <p className="text-lg text-gray-600 mb-6">
                    Ready to make a purchase or need more information?
                  </p>
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={() => navigate("/")}
                      className="bg-red-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-red-700 transition-colors duration-200"
                    >
                      Speak with Sales Team
                    </button>
                    <button
                      onClick={() => navigate("/")}
                      className="bg-gray-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-600 transition-colors duration-200"
                    >
                      Return to Home
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {selectedEquipment && (
          <EquipmentModal
            equipment={selectedEquipment}
            isOpen={isModalOpen}
            onClose={() => {
              console.log("Modal closing...");
              setIsModalOpen(false);
              setSelectedEquipment(null);
            }}
            accentColor="red"
          />
        )}
      </>
    );
  }

  // Quiz view
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-gray-100 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors duration-200"
          >
            <ArrowLeft size={24} />
            <span className="text-lg font-medium">Back to Home</span>
          </button>
        </div>

        <ProgressBar
          currentStep={currentQuestionIndex}
          totalSteps={questions.length}
          accentColor="bg-red-500"
        />

        <QuestionCard
          question={currentQuestion.text}
          options={currentQuestion.options}
          selectedValue={answers[currentQuestion.id]}
          onSelect={(value: string) => handleAnswer(currentQuestion.id, value)}
          required={currentQuestion.required}
          accentColor="text-red-500"
          accentColorLight="bg-red-50"
          accentColorBorder="border-red-500"
          customInput={
            currentQuestion.id === "land-size" && showCustomInput ? (
              <CustomLandSizeInput
                value={customLandSize}
                onChange={handleCustomLandSize}
                error={landSizeError}
              />
            ) : undefined
          }
        />

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className={`
              px-6 py-3 rounded-xl text-lg font-medium transition-all duration-200
              ${
                currentQuestionIndex === 0
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-red-600 hover:text-red-700 hover:bg-red-50"
              }
            `}
          >
            Previous
          </button>

          <button
            onClick={handleNext}
            disabled={!canProceed}
            className={`
              px-8 py-3 rounded-xl text-lg font-semibold transition-all duration-200
              ${
                !canProceed
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-red-600 text-white hover:bg-red-700 shadow-lg hover:shadow-xl"
              }
            `}
          >
            {isLastQuestion ? "Show Recommendations" : "Next"}
          </button>
        </div>

        {currentQuestion.required && (
          <p className="text-center text-gray-500 mt-4">
            * This question is required to continue
          </p>
        )}
      </div>
    </div>
  );
};

export default QuestionnairePage;
